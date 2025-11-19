import { useState, useMemo, useCallback, useEffect } from "react";

/**
 * Hooks genéricos para filtros y paginación
 * Simplificados - Solo incluye: Paginación, ID filter y Select/Dropdown filter
 */

export interface UsePaginationOptions {
  itemsPerPage?: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginationActions {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  resetPage: () => void;
}

/**
 * Hook para paginación genérica
 * Maneja la lógica de páginas de manera reutilizable
 */
export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {}
): {
  paginatedData: T[];
  pagination: PaginationState & PaginationActions;
} {
  const { itemsPerPage = 10 } = options;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [data.length, currentPage, totalPages]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    paginatedData,
    pagination: {
      currentPage,
      totalPages,
      totalItems: data.length,
      itemsPerPage,
      goToNextPage,
      goToPrevPage,
      goToPage,
      resetPage,
    },
  };
}

/**
 * Hook para filtros de ID numérico
 * Parsea y valida automáticamente el ID ingresado
 */
export function useIdFilter(initialValue = "") {
  const [id, setId] = useState(initialValue);

  const parsedId = useMemo(() => {
    const trimmed = id.trim();
    if (!trimmed) return null;
    const num = parseInt(trimmed);
    return !isNaN(num) && num > 0 ? num : null;
  }, [id]);

  const reset = useCallback(() => {
    setId("");
  }, []);

  return {
    id,
    setId,
    parsedId,
    reset,
  };
}

/**
 * Hook para filtros de select/dropdown
 * Útil para filtros de estado (PENDIENTE, CONFIRMADO, CANCELADO, etc.)
 */
export function useSelectFilter<T extends string>(
  initialValue: T,
  allValue: T
) {
  const [selected, setSelected] = useState<T>(initialValue);

  const isAll = selected === allValue;

  const reset = useCallback(() => {
    setSelected(allValue);
  }, [allValue]);

  return {
    selected,
    setSelected,
    isAll,
    reset,
  };
}

export function useFilterReset(...resetFunctions: (() => void)[]) {
  // Utilizamos useCallback para garantizar que la función de reseteo sea estable
  // y para ejecutar todas las funciones pasadas secuencialmente.
  const resetAll = useCallback(() => {
    // Itera y llama a cada función de reseteo proporcionada.
    // Como las funciones individuales usan la actualización funcional de setSearchParams,
    // se garantiza que todas las eliminaciones de parámetros se procesen correctamente.
    resetFunctions.forEach(resetFn => {
      resetFn(); 
    });
  }, [resetFunctions]);

  return resetAll;
}