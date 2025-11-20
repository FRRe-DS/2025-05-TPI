import React, { useState, useEffect, useCallback, useMemo, type JSX } from 'react';

// --- 1. INTERFACES DE TIPADO ---

/** Interfaz para la estructura de un producto. */
interface IProduct {
    id: number;
    name: string;
    categorySlug: string;
    price: number;
}

/** Interfaz para el objeto de retorno del hook useQuery (simulado). */
interface UseQueryResult<TData, TError> {
    data: TData | null;
    isLoading: boolean;
    isError: boolean;
    error?: TError;
}

// --- 2. SIMULACIÓN DEL ENTORNO (Mocks para hacer el archivo ejecutable) ---

// Datos de producto simulados (Mock Data)
const MOCK_PRODUCTS: IProduct[] = [
    { id: 1, name: 'Laptop Pro X', categorySlug: 'electronics', price: 1200 },
    { id: 2, name: 'El Gran Gatsby', categorySlug: 'books', price: 25 },
    { id: 3, name: 'Sudadera Algodón', categorySlug: 'apparel', price: 50 },
    { id: 4, name: 'Mouse Inalámbrico', categorySlug: 'electronics', price: 30 },
    { id: 5, name: 'Vestido de Verano', categorySlug: 'apparel', price: 75 },
    { id: 6, name: 'TV 55"', categorySlug: 'electronics', price: 800 },
];

/** Simula la llamada a la API de productos filtrando por slug. */
const fetchProductsBySlug = async (categorySlug: string): Promise<IProduct[]> => {
    // Simula un retardo de red
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    if (categorySlug === 'all') {
        return MOCK_PRODUCTS;
    }

    return MOCK_PRODUCTS.filter(p => p.categorySlug === categorySlug);
};


// 3. Simulación de useQuery de React Query (Mínimo necesario con tipado)
/** Simulación del hook useQuery de TanStack Query */
const useQuery = <TData, TError>(
    options: {
        queryKey: (string | object)[];
        queryFn: () => Promise<TData>;
    }
): UseQueryResult<TData, TError> => {
    const { queryKey, queryFn } = options;
    const [data, setData] = useState<TData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    
    // Convertir la clave en string para el array de dependencias
    const keyString = useMemo(() => JSON.stringify(queryKey), [queryKey]);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setData(null);

        const fetchData = async () => {
            try {
                const result = await queryFn();
                setData(result);
            } catch (error) {
                console.log(error)
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyString]); // Dependencia del string de la clave para refetch

    return { data, isLoading, isError };
};

// 4. Simulación de useCategoryFilter
interface ICategoryFilterHook {
    selectedCategorySlug: string;
    CategorySelector: JSX.Element;
}

/** Simulación de tu hook que lee el filtro de la URL. */
const useCategoryFilter = (): ICategoryFilterHook => {
    const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
    
    const handleSetCategory = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategorySlug(e.target.value);
    }, []);
    
    // Controles de demostración para cambiar el slug
    const Categories: string[] = ['all', 'electronics', 'books', 'apparel'];
    const CategorySelector = (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700">
                Simulador de Filtro (URL):
            </label>
            <select
                value={selectedCategorySlug}
                onChange={handleSetCategory}
                className="w-full p-2 border border-yellow-300 rounded-md bg-white mt-1"
            >
                {Categories.map(c => (
                    <option key={c} value={c}>
                        {c === 'all' ? 'Todas las categorías' : c.toUpperCase()}
                    </option>
                ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
                Slug actual en la URL (simulado): <span className="font-mono font-bold text-yellow-700">{selectedCategorySlug}</span>
            </p>
        </div>
    );

    return { 
        selectedCategorySlug,
        CategorySelector,
    };
};

// --- 5. HOOK DE PRODUCTOS (El consumidor de React Query) ---


export const useFilteredProducts = (categorySlug: string): UseQueryResult<IProduct[], Error> => 
    useQuery<IProduct[], Error>({
        // La clave incluye el slug para forzar el refetch cuando cambia
        queryKey: ["products", { category: categorySlug }], 
        
        // La función de consulta que usa el slug para llamar a la API
        queryFn: () => fetchProductsBySlug(categorySlug),
    });


// --- 6. COMPONENTE DE LISTA DE PRODUCTOS ---

export default function ProductList(): JSX.Element {
    // 1. Obtener el slug de categoría desde el hook de filtrado (simulado)
    const { selectedCategorySlug, CategorySelector } = useCategoryFilter();

    // 2. Usar el hook de productos tipado
    const { 
        data: products, 
        isLoading, 
        isError,
    } = useFilteredProducts(selectedCategorySlug);

    // Configurar fondo de la página
    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            root.className = 'min-h-screen bg-gray-50';
        }
    }, []);

    return (
        <div className="w-full max-w-xl mx-auto p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-indigo-800 mb-6 border-b pb-2">
                Catálogo Tipado
            </h1>
            
            {/* Control de filtro (Simulado) */}
            {CategorySelector}

            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Resultados ({products ? products.length : '...'})
                </h2>

                {/* Mostrar estados de carga y error */}
                {isLoading && (
                    <div className="p-8 text-center text-indigo-600 font-medium animate-pulse">
                        Cargando productos para la categoría "{selectedCategorySlug}"...
                    </div>
                )}
                
                {isError && (
                    <p className="p-4 bg-red-100 text-red-700 rounded-lg font-medium">
                        ¡Error! No se pudieron cargar los productos.
                    </p>
                )}

                {/* Mostrar la lista de productos */}
                {!isLoading && !isError && products && products.length > 0 && (
                    <ul className="space-y-3">
                        {products.map((product: IProduct) => (
                            <li 
                                key={product.id} 
                                className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-indigo-50 transition duration-150 rounded-md"
                            >
                                <div>
                                    <p className="text-base font-medium text-gray-900">{product.name}</p>
                                    <p className="text-xs text-indigo-500 uppercase font-bold">{product.categorySlug}</p>
                                </div>
                                <p className="text-lg font-extrabold text-green-700">${product.price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                )}

                {!isLoading && products && products.length === 0 && (
                    <p className="p-4 text-center text-gray-500 bg-yellow-50 rounded-lg">
                        No hay productos para esta selección.
                    </p>
                )}
            </div>
        </div>
    );
}