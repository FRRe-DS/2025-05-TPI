import { createContext, useContext, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { useReservations, useReservationById } from "../hooks/reservation.hook";
import type { IReservation } from "../types/reservation.interface";
import {
  useIdFilter,
  useSelectFilter,
  usePagination,
  useFilterReset,
} from "./generic";

export type FilterStatus = "ALL" | "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

interface ReservationFilterContextValue {
  filterId: string;
  filterUserId: string;
  filterStatus: FilterStatus;
  displayData: IReservation[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  
  setFilterId: (id: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
  setFilterUserId: (userId: string) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  reset: () => void;
}

const ReservationFilterContext = createContext<ReservationFilterContextValue | undefined>(undefined);

export function ReservationFilterProvider({ children }: { children: ReactNode }) {
  // Hooks genéricos para filtros
  const { 
    id: filterId, 
    setId: setFilterId, 
    parsedId, 
    reset: resetId 
  } = useIdFilter();
  
  const { 
    id: filterUserId, 
    setId: setFilterUserId, 
    parsedId: parsedUserId, 
    reset: resetUserId 
  } = useIdFilter();
  
  const { 
    selected: filterStatus, 
    setSelected: setFilterStatus, 
    reset: resetStatus 
  } = useSelectFilter<FilterStatus>("ALL", "ALL");

  // Queries
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
      // verifique el estado 
      if (filterStatus !== "ALL" && reservation.estado !== filterStatus) {
        return []; 
      }
      // verifique el usuario ID
      if (parsedUserId && reservation.usuarioId !== parsedUserId) {
        return [];
      }
      return [reservation];
    }
    
    // Todas las reservas
    let allData = allQuery.data || [];
    
    // Filtrar por estado
    if (filterStatus !== "ALL") {
      allData = allData.filter(r => r.estado === filterStatus);
    }
    
    // Filtrar por usuario ID
    if (parsedUserId) {
      allData = allData.filter(r => r.usuarioId === parsedUserId);
    }
    
    return allData;
  }, [parsedId, byIdQuery.data, byIdQuery.error, filterStatus, parsedUserId, allQuery.data]);

  // Paginación con hook genérico
  const { paginatedData, pagination } = usePagination<IReservation>(filtered, {
    itemsPerPage: 8,
  });

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    pagination.resetPage();
  }, [filterId, filterStatus, filterUserId, pagination]);

  // Reset combinado
  const reset = useFilterReset(resetId, resetUserId, resetStatus, pagination.resetPage);

  return (
    <ReservationFilterContext.Provider value={{
      filterId,
      filterStatus,
      filterUserId,
      displayData: paginatedData,
      totalItems: filtered.length,
      itemsPerPage: pagination.itemsPerPage,
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      isLoading: activeQuery.isLoading,
      setFilterId,
      setFilterStatus,
      setFilterUserId,
      goToNextPage: pagination.goToNextPage,
      goToPrevPage: pagination.goToPrevPage,
      goToPage: pagination.goToPage,
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