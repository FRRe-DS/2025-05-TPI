import { createContext, useContext } from "react";
import type { IReservation } from "../../types";

export type FilterStatus = "ALL" | "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

interface ReservationFilterContextType {
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

export const ReservationFilterContext = createContext<ReservationFilterContextType | undefined>(undefined)

// Hook personalizado para usar el context
export const useReservationFilter = () => {
  const context = useContext(ReservationFilterContext);
  if (!context) {
    throw new Error("useReservationFilters must be used within ReservationFilterProvider");
  }
  return context;
}