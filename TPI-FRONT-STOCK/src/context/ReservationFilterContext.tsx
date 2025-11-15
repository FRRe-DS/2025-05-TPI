import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from "react";
import { useReservations, useReservationById } from "../hooks/reservation.hook";
import type { IReservation } from "../types/reservation.interface";

export type FilterStatus = "ALL" | "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

interface ReservationFilterContextValue {
  filterId: string;
  filterStatus: FilterStatus;
  displayData: IReservation[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  
  setFilterId: (id: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  reset: () => void;
}

const ReservationFilterContext = createContext<ReservationFilterContextValue | undefined>(undefined);

export function ReservationFilterProvider({ children }: { children: ReactNode }) {
  const [filterId, setFilterId] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 8;

  const parsedId = useMemo(() => {
    const trimmed = filterId.trim();
    if (!trimmed) return null;
    const num = parseInt(trimmed);
    return !isNaN(num) && num > 0 ? num : null;
  }, [filterId]);

  const allQuery = useReservations();
  const byIdQuery = useReservationById(parsedId || 0, parsedId !== null && parsedId > 0);
  const activeQuery = parsedId ? byIdQuery : allQuery;

  // Datos filtrados (sin paginar)
  const filtered = useMemo((): IReservation[] => {
    // Filtro por id 
    if (parsedId) {
      // Si hay error al buscar por ID (no existe), retornar array vacío
      if (byIdQuery.error || !byIdQuery.data) {
        return [];
      }
      const reservation = byIdQuery.data;
      // verifique ademas el estado 
      if (filterStatus !== "ALL" && reservation.estado !== filterStatus) {
        return []; 
      }
      return [reservation];
    }
    
    // Todas las reservas
    const allData = allQuery.data || [];
    if (filterStatus !== "ALL") {
      return allData.filter(r => r.estado === filterStatus);
    }
    return allData;
  }, [parsedId, byIdQuery.data, byIdQuery.error, filterStatus, allQuery.data]);

  // Cálculos de paginación
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  
  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Resetear a página 1 cuando cambian los filtros
  useMemo(() => {
    setCurrentPage(1);
  }, [filterId, filterStatus]);

  const reset = useCallback(() => {
    setFilterId("");
    setFilterStatus("ALL");
    setCurrentPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  return (
    <ReservationFilterContext.Provider value={{
      filterId,
      filterStatus,
      displayData: paginatedData,
      totalItems: filtered.length,
      currentPage,
      totalPages,
      isLoading: activeQuery.isLoading,
      setFilterId,
      setFilterStatus,
      goToNextPage,
      goToPrevPage,
      goToPage,
      reset,
    }}>
      {children}
    </ReservationFilterContext.Provider>
  );
}

// Hook personalizado para usar el context
export function useReservationFilters() {
  const context = useContext(ReservationFilterContext);
  if (!context) {
    throw new Error("useReservationFilters must be used within ReservationFilterProvider");
  }
  return context;
}