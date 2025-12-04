import React, { useState, useMemo, useCallback } from "react";
import { ProductFilterContext } from "./productFilterContext";
import { useProduct } from "../../hooks/products.hook";

// Si tu contexto lo importa, definí bien el tipo:
type FilterCategoryId = number | null;

interface ProductFilterProviderProps {
  children: React.ReactNode;
}

const ITEMS_PER_PAGE = 8;

export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({ children }) => {
  // Filtros de estado
  const [filterId, setFilterId] = useState<number | null>(null);
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>("");
  const [filterCategoryId, setFilterCategoryId] = useState<FilterCategoryId>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Datos traídos con React Query
  const { data: products = [], isLoading, isError } = useProduct();

  // --- Lógica de filtrado y paginación con los productos del hook ---
  const { totalItems, totalPages, displayData } = useMemo(() => {
    let currentData = [...products];
    const lowerCaseSearchTerm = filterSearchTerm.toLowerCase().trim();

    // Filtrar por ID exacto (prioridad máxima)
    if (filterId !== null) {
      currentData = currentData.filter(product => product.id === filterId);
    } else {
      // Filtrar por término de búsqueda (nombre y descripción)
      if (lowerCaseSearchTerm) {
        currentData = currentData.filter(product =>
          (product.nombre?.toLowerCase()?.includes(lowerCaseSearchTerm) ||
           product.descripcion?.toLowerCase()?.includes(lowerCaseSearchTerm))
        );
      }
      // Filtrar por categoría
      if (filterCategoryId !== null) {
        currentData = currentData.filter(product =>
          (product.categorias ?? product.categories ?? []).some(cat => cat.id === filterCategoryId)
        );
      }
    }
    // Ordenar por id
    currentData.sort((a, b) => a.id - b.id);

    // Paginación
    const itemsCount = currentData.length;
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE);
    const safeCurrentPage = Math.min(currentPage, pageCount === 0 ? 1 : pageCount);

    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    const finalDisplayData = currentData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Auto-ajusta la página si cambia la cantidad total
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }

    return {
      totalItems: itemsCount,
      totalPages: pageCount,
      displayData: finalDisplayData,
    };
  }, [products, filterId, filterSearchTerm, filterCategoryId, currentPage]);

  // --- Setters/helpers de filtros ---
  const createFilterSetter = useCallback(
    <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (value: T) => {
      setCurrentPage(1);
      setter(value);
    }, []
  );

  const handleSetFilterId = createFilterSetter(setFilterId);
  const handleSetFilterSearchTerm = createFilterSetter(setFilterSearchTerm);
  const handleSetFilterCategoryId = createFilterSetter(setFilterCategoryId);

  const goToPage = useCallback((page: number) => { setCurrentPage(page); }, []);
  const reset = useCallback(() => {
    setCurrentPage(1);
    setFilterId(null);
    setFilterSearchTerm("");
    setFilterCategoryId(null);
  }, []);

  // Valor del contexto
  const contextValue = {
    filterId,
    filterSearchTerm,
    filterCategoryId,
    displayData,
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
    totalPages,
    isLoading,
    setFilterId: handleSetFilterId,
    setFilterSearchTerm: handleSetFilterSearchTerm,
    setFilterCategoryId: handleSetFilterCategoryId,
    goToPage,
    reset,
  };

  return (
    <ProductFilterContext.Provider value={contextValue}>
      {isError && <span style={{color:"red"}}>Error al cargar productos</span>}
      {children}
    </ProductFilterContext.Provider>
  );
};