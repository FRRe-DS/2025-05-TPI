import { useState, useMemo } from 'react';
import { ProductTableRow } from "../components/products/ProductTableRow"; 
import { useProduct } from "../hooks/products.hook"; // Tu hook real
import type { IProduct } from "../types/product.interface"; 

export default function ProductList() {
    // 1. Estado para el filtro (lo hacemos en cliente ya que traemos todos los productos)
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // 2. Usamos tu hook real (useProduct)
    const { data: products, isLoading, isError } = useProduct();

    // 3. Lógica de filtrado simple en el cliente
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        if (selectedCategory === 'all') return products;
        
        return products.filter(p => {
            // Verificamos si el producto tiene categorías y si ALGUNA (.some) coincide con la seleccionada
            return p.categories?.some(cat => cat.name.toLowerCase() === selectedCategory);
        });
    }, [products, selectedCategory]);

    // Extraemos las categorías únicas
    const categories = useMemo(() => {
        if (!products) return [];
        const cats = new Set<string>();
        
        products.forEach(p => {
            // Recorremos el array de categorías de cada producto
            p.categories?.forEach(cat => {
                if (cat.name) cats.add(cat.name.toLowerCase());
            });
        });
        
        return Array.from(cats);
    }, [products]);
    
    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Encabezado y Filtros */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Catálogo de Productos
                        </h1>
                        <p className="text-gray-500 mt-1">Gestiona el inventario y precios</p>
                    </div>
                    
                    {/* Selector de Categoría Dinámico */}
                    <div className="w-full md:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full md:w-64 p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={isLoading || !products}
                        >
                            <option value="all">Todas las categorías</option>
                            {categories.map(c => (
                                <option key={c} value={c}>{c.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                </div>

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
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <ProductTableRow
                                        key={product.id}
                                        product={product}
                                        onViewDetails={(p) => console.log("Ver detalles ID:", p.id)}
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
            </div>
        </div>
    );
}