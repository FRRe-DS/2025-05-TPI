import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE = 1;

/**
 * Hook para gestionar la paginación basándose en la URL.
 * Lee y escribe el parámetro 'page' en la URL.
 * * @template T El tipo de los elementos en el array de datos.
 * @param {T[]} data Los datos ya filtrados y listos para paginar.
 * @param {{ itemsPerPage: number }} config Configuración de la paginación.
 */
export function useUrlPagination<T>(data: T[], config: { itemsPerPage: number }) {
  // Obtiene las funciones de React Router para manejar los parámetros de búsqueda de la URL
  const [searchParams, setSearchParams] = useSearchParams();
  const { itemsPerPage } = config;

  // 1. Obtener la página actual desde la URL
  const currentPageFromUrl = useMemo(() => {
    const pageStr = searchParams.get('page');
    // Intenta parsear el número, si falla o es menor a 1, usa la página por defecto (1)
    const pageNum = parseInt(pageStr || '', 10);
    return !isNaN(pageNum) && pageNum >= 1 ? pageNum : DEFAULT_PAGE;
  }, [searchParams]);

  // 2. Calcular límites y totales
  const totalItems = data.length;
  // Calcula el total de páginas, asegurando que sea al menos 1 si hay datos
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  // Ajusta la página actual: evita que se muestre una página que ya no existe (ej. si se aplican filtros)
  const currentPage = Math.min(currentPageFromUrl, totalPages);

  // 3. Segmentación de datos (la paginación real)
  const paginatedData = useMemo((): T[] => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage]); // Importante: Recalcula si el 'data' (filtrado) o la 'currentPage' cambian

  // 4. Funciones de navegación (actualizan la URL)
  
  const goToPage = useCallback((page: number) => {
    // Asegura que la página destino esté siempre dentro de los límites válidos
    const targetPage = Math.max(1, Math.min(page, totalPages));

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      
      if (targetPage === DEFAULT_PAGE) {
        // Limpia la URL eliminando el parámetro 'page' si volvemos a la página 1
        newParams.delete('page');
      } else {
        newParams.set('page', targetPage.toString());
      }
      
      return newParams;
    }, { replace: true }); // Usa 'replace' para evitar llenar el historial del navegador
  }, [setSearchParams, totalPages]);

  const resetPage = useCallback(() => {
    goToPage(DEFAULT_PAGE);
  }, [goToPage]);

  // Devolvemos la interfaz para el ReservationFilterProvider
  return {
    paginatedData,
    pagination: {
      itemsPerPage,
      currentPage,
      totalItems,
      totalPages,
      goToPage,
      resetPage,
      // Funciones auxiliares (no se exponen en el Contexto final, pero son útiles aquí)
      goToNextPage: () => goToPage(currentPage + 1), 
      goToPrevPage: () => goToPage(currentPage - 1),
    },
  };
}