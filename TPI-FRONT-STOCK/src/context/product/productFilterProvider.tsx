import { useState } from "react";

interface ProductFilterProviderProps {
  children: React.ReactNode;
}

const ITEMS_PER_PAGE = 8;


export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({ children }) => {
    
  // --- Estado de Filtros y Paginación ---
  const [filterId, setFilterId] = useState<number | null>(null);
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>("");
  const [filterCategoryId, setFilterCategoryId] = useState<FilterCategoryId>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  // --- Lógica de Filtrado y Paginación ---
  const { totalItems, totalPages, displayData } = useMemo(() => {
    setIsLoading(true);

    let currentData = MOCK_PRODUCTS;
    const lowerCaseSearchTerm = filterSearchTerm.toLowerCase().trim();

    // 1. Filtrar por ID Exacto (prioridad máxima)
    if (filterId !== null) {
      currentData = currentData.filter(product => product.id === filterId);
    } else {
      // 2. Filtrar por Término de Búsqueda (Nombre y Descripción)
      if (lowerCaseSearchTerm) {
        currentData = currentData.filter(product => 
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      // 3. Filtrar por Categoría
      if (filterCategoryId !== null) {
        currentData = currentData.filter(product => 
          product.categories.some(cat => cat.id === filterCategoryId)
        );
      }
    }
    
    // Ordenar (opcional, por ID para consistencia)
    currentData.sort((a, b) => a.id - b.id);

    // 4. Lógica de Paginación
    const itemsCount = currentData.length;
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE);

    // Asegurar que la página actual sea válida después del filtrado
    const safeCurrentPage = Math.min(currentPage, pageCount === 0 ? 1 : pageCount);

    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    const finalDisplayData = currentData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Actualizar el estado de la página si fue ajustada
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }

    setIsLoading(false);

    return {
      totalItems: itemsCount,
      totalPages: pageCount,
      displayData: finalDisplayData,
    };
  }, [filterId, filterSearchTerm, filterCategoryId, currentPage]);


  // --- Funciones de Control (Callback) ---
  
  // Función de ayuda para envolver los setters y resetear la página
  const createFilterSetter = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (value: T) => {
    setCurrentPage(1); // Siempre vuelve a la página 1 al cambiar un filtro
    setter(value);
  }, []);

  const handleSetFilterId = createFilterSetter(setFilterId);
  const handleSetFilterSearchTerm = createFilterSetter(setFilterSearchTerm);
  const handleSetFilterCategoryId = createFilterSetter(setFilterCategoryId);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(1);
    setFilterId(null);
    setFilterSearchTerm("");
    setFilterCategoryId(null);
  }, []);

  // --- Objeto de Valor del Contexto ---
  const contextValue = {
    // Filtros
    filterId,
    filterSearchTerm,
    filterCategoryId,
    
    // Datos y Paginación
    displayData,
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
    totalPages,
    isLoading,
    
    // Setters
    setFilterId: handleSetFilterId,
    setFilterSearchTerm: handleSetFilterSearchTerm,
    setFilterCategoryId: handleSetFilterCategoryId,
    goToPage,
    reset,
  };

  return (
    <ProductFilterContext.Provider value={contextValue}>
      {children}
    </ProductFilterContext.Provider>
  );
}