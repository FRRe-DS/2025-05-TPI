import { useMemo, useState, useCallback } from 'react';
import { ProductTableRow } from "../../components/products/ProductTableRow"; 
import { useProduct } from "../../hooks/products.hook"; 
import { ProductSearchFilters } from "../../components/products/ProductSearchFilters";
import { useIdFilter, useSelectFilter } from "../../hooks/filters";
import { useUrlFilter } from "../../hooks/filters/generics/useUrlFilter";
import { ProductModal } from "../../components/products/ProductModal";
import type { IProduct, IProductInput } from "../../types/product.interface";
import { CreateProductModal } from "../../components/products/CreateProductModal";
import { EditProductModal } from "../../components/products/EditProductModal";
import { useNotification } from "../../context/notifications/notificactions"; 
import { useUrlPagination } from "../../hooks/pagination.hook";
import Pagination from "../../components/common/ui/pagination";

export default function ProductList() {
    
    const { showNotification } = useNotification();

    // --- HOOKS DE DATOS ---
    const { 
        data: products, 
        isLoading, 
        isError,
        createProduct, 
        isCreating,
        updateProduct
    } = useProduct();

    // --- HOOKS DE FILTROS ---
    const { 
        selected: selectedCategory, 
        setSelected: setSelectedCategory, 
        reset: resetCategory 
    } = useSelectFilter<string>("category", "all", "all");

    const { id: filterId, setId: setFilterId, parsedId, reset: resetId } = useIdFilter("productId");
    const [filterName, setFilterName, resetName] = useUrlFilter("productName");

    // --- ESTADOS DE LOS MODALES ---
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // --- LÓGICA DE FILTRADO (PRIMERO) ---
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        
        let result = products;

        if (parsedId) {
            result = result.filter(p => p.id === parsedId);
        }

        if (filterName) {
            const lowerName = filterName.toLowerCase();
            result = result.filter(p => p.nombre.toLowerCase().includes(lowerName));
        }

        if (selectedCategory !== 'all') {
            result = result.filter(p => 
                p.categorias?.some(cat => cat.nombre?.toLowerCase() === selectedCategory)
            );
        }
        
        return result.sort((a, b) => a.id - b.id);
    }, [products, selectedCategory, parsedId, filterName]);

    // --- PAGINACIÓN (DESPUÉS DEL FILTRADO) ---
    const { 
        paginatedData, 
        pagination: { 
            currentPage, 
            totalPages, 
            totalItems, 
            itemsPerPage, 
            goToPage 
        } 
    } = useUrlPagination(filteredProducts, { itemsPerPage: 10 });

    // --- CATEGORÍAS PARA EL FILTRO ---
    const categories = useMemo(() => {
        if (!products) return [];
        const uniqueCategories = new Map<number, { id: number; nombre: string }>();
        products.forEach(p => {
            p.categorias?.forEach(cat => {
                if (!uniqueCategories.has(cat.id)) {
                    uniqueCategories.set(cat.id, { id: cat.id, nombre: cat.nombre });
                }
            });
        });
        return Array.from(uniqueCategories.values());
    }, [products]);

    const categoryNamesForFilter = useMemo(() => categories.map(c => c.nombre.toLowerCase()), [categories]);

    // --- HANDLERS ---
    const handleOpenDetailModal = useCallback((product: IProduct) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    }, []);

    const handleCloseDetailModal = useCallback(() => {
        setIsDetailModalOpen(false);
        setSelectedProduct(null);
    }, []);

    const handleCreateProduct = async (newProductData: IProductInput) => {
        try {
            await createProduct(newProductData); 
            showNotification("Producto creado correctamente", "success");
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error(error);
            showNotification("Error al crear el producto", "error");
        }
    };

    const handleOpenEditModal = useCallback((product: IProduct) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    }, []);

    const handleUpdateProduct = async (id: number, data: IProductInput) => {
        try {
            await updateProduct({ id, data: data });
            showNotification("Producto actualizado con éxito", "success");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
            showNotification("No se pudo actualizar el producto", "error");
        }
    };

    const resetFilters = () => {
        resetId();
        resetName();
        resetCategory();
    };
    
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Catálogo de Productos
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Gestiona el inventario y precios
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Total de productos:</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
                            {totalItems || 0}
                        </span>
                    </div>
                </div>

                <ProductSearchFilters 
                    filterId={filterId}
                    setFilterId={setFilterId}
                    filterName={filterName}
                    setFilterName={setFilterName}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categoryNamesForFilter}
                    reset={resetFilters}
                />

                <div className="flex justify-start my-4">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        disabled={isCreating} 
                        className={`bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm cursor-pointer ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isCreating ? (
                           <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                           </svg>
                        )}
                        {isCreating ? "GUARDANDO..." : "AGREGAR PRODUCTO"}
                    </button>
                </div>

                {isLoading && (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                        <p className="text-gray-600 font-medium">Cargando productos...</p>
                    </div>
                )}
                
                {isError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
                        Error al cargar los datos. Verifica la conexión con el backend.
                    </div>
                )}

                {!isLoading && paginatedData && paginatedData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedData.map((product) => (
                                    <ProductTableRow
                                        key={product.id}
                                        product={product}
                                        onViewDetails={handleOpenDetailModal}
                                        onEdit={handleOpenEditModal}
                                    />
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={goToPage}
                        />
                    </div>
                )}

                {!isLoading && !isError && filteredProducts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                        <p className="text-gray-500 text-lg">No se encontraron productos.</p>
                    </div>
                )}

                <ProductModal
                    product={selectedProduct}
                    isOpen={isDetailModalOpen}
                    onClose={handleCloseDetailModal}
                />

                <CreateProductModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateProduct}
                    availableCategories={categories}
                />

                <EditProductModal 
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    productToEdit={productToEdit}
                    onUpdate={handleUpdateProduct}
                    availableCategories={categories}
                />
            </div>
        </div>
    );
}