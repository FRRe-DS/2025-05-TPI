import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { useReservations, useReservationById } from "../hooks/reservation.hook";
import type { IReservation } from "../types/reservation.interface";

export type FilterStatus = "ALL" | "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

interface ReservationFilterContextValue {
  filterId: string;
  filterStatus: FilterStatus;
  displayData: IReservation[];
  isLoading: boolean;
  error: Error | null;
  
  setFilterId: (id: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
  reset: () => void;
}

const ReservationFilterContext = createContext<ReservationFilterContextValue | undefined>(undefined);

export function ReservationFilterProvider({ children }: { children: ReactNode }) {
  const [filterId, setFilterId] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

    const parsedId = useMemo(() => {
      const trimmed = filterId.trim();
      if (!trimmed) return null;
      const num = parseInt(trimmed);
      return !isNaN(num) && num > 0 ? num : null;
    }, [filterId]);

    const allQuery = useReservations();
    const byIdQuery = useReservationById(parsedId || 0, parsedId !== null && parsedId > 0);
    const activeQuery = parsedId ? byIdQuery : allQuery;

  const displayData = useMemo((): IReservation[] => {
    // Filtro por id 
    if (parsedId && byIdQuery.data) {
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
  }, [parsedId, byIdQuery.data, filterStatus, allQuery.data]);

  const reset = () => {
    setFilterId("");
    setFilterStatus("ALL");
  };

  return (
    <ReservationFilterContext.Provider value={{
      filterId,
      filterStatus,
      displayData,
      isLoading: activeQuery.isLoading,
      error: activeQuery.error,
      setFilterId,
      setFilterStatus,
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
