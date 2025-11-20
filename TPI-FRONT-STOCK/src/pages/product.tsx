import { useMemo, useState, useCallback } from 'react';
import { ProductTableRow } from "../components/products/ProductTableRow"; 
import { useProduct } from "../hooks/products.hook"; // Tu hook real
import { ProductSearchFilters } from "../components/products/ProductSearchFilters";
import { useIdFilter, useSelectFilter } from "../hooks/filters";
import { useUrlFilter } from "../hooks/filters/generics/useUrlFilter";
import { ProductModal } from "../components/products/ProductModal";
import type { IProduct } from "../types/product.interface";

export default function ProductList() {
    // 1. Estado para el filtro (sincronizado con URL)
    const { 
        selected: selectedCategory, 
        setSelected: setSelectedCategory, 
        reset: resetCategory 
    } = useSelectFilter<string>("category", "all", "all");

    // Hooks de filtros genéricos (sincronizados con URL)
    const { id: filterId, setId: setFilterId, parsedId, reset: resetId } = useIdFilter("productId");
    const [filterName, setFilterName, resetName] = useUrlFilter("productName");

    // Estado para el Modal
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback((product: IProduct) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }, []);

    // Función de reset combinada
    const resetFilters = () => {
        resetId();
        resetName();
        resetCategory();
    };

    // 2. Usamos tu hook real (useProduct)
    const { data: products, isLoading, isError } = useProduct();

    // 3. Lógica de filtrado simple en el cliente
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        
        let result = products;

        // Filtro por ID
        if (parsedId) {
            result = result.filter(p => p.id === parsedId);
        }

        // Filtro por Nombre
        if (filterName) {
            const lowerName = filterName.toLowerCase();
            result = result.filter(p => p.nombre.toLowerCase().includes(lowerName));
        }

        // Filtro por Categoría
        if (selectedCategory !== 'all') {
            result = result.filter(p => 
                p.categorias?.some(cat => cat.nombre.toLowerCase() === selectedCategory)
            );
        }
        
        return result;
    }, [products, selectedCategory, parsedId, filterName]);

    // Extraemos las categorías únicas
    const categories = useMemo(() => {
        if (!products) return [];
        const cats = new Set<string>();
        
        products.forEach(p => {
            // Recorremos el array de categorías de cada producto
            p.categorias?.forEach(cat => {
                if (cat.nombre) cats.add(cat.nombre.toLowerCase());
            });
        });
        
        return Array.from(cats);
    }, [products]);
    
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Catálogo de Productos
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Gestiona el inventario y precios
                    </p>
                </div>

                {/* Filtros Genéricos (ID, Nombre y Categoría) */}
                <ProductSearchFilters 
                    filterId={filterId}
                    setFilterId={setFilterId}
                    filterName={filterName}
                    setFilterName={setFilterName}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    reset={resetFilters}
                />

                {/* Estados de Carga y Error */}
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

                {/* Tabla de Productos */}
                {!isLoading && !isError && filteredProducts && filteredProducts.length > 0 && (
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
                                {filteredProducts.map((product) => (
                                    <ProductTableRow
                                        key={product.id}
                                        product={product}
                                        onViewDetails={handleOpenModal}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Estado Vacío */}
                {!isLoading && !isError && filteredProducts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                        <p className="text-gray-500 text-lg">No se encontraron productos.</p>
                    </div>
                )}

                {/* Modal de Detalles */}
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );
}