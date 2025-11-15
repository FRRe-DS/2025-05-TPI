import { useState, useMemo } from "react";
import { useReservations, useReservationById } from "./reservation.hook";
import type { IReservation } from "../types/reservation.interface";

export type FilterStatus = "ALL" | "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

interface UseReservationFiltersResult {
  filterId: string;
  filterStatus: FilterStatus;
  displayData: IReservation[];
  isLoading: boolean;
  error: Error | null;
  
  setFilterId: (id: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
  reset: () => void;
}

export const useReservationFilters = (): UseReservationFiltersResult => {
  const [filterId, setFilterId] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

  // Parse ID (el input ya valida que sea > 0)
  const parsedId = filterId ? parseInt(filterId) : null;

  // Queries condicionales
  const allQuery = useReservations();
  const byIdQuery = useReservationById(parsedId || 0, !!parsedId);

  // Determinar query activa (solo usar byId si hay ID, sino allQuery)
  const activeQuery = parsedId ? byIdQuery : allQuery;

  const displayData = useMemo((): IReservation[] => {
    // filtrado por id
    if (parsedId && byIdQuery.data) {
      return [byIdQuery.data];
    }

    // muestra todo 
    const allData = allQuery.data || [];
    
    // filtra por estado 
    if (filterStatus !== "ALL") {
      return allData.filter(reservation => reservation.estado === filterStatus);
    }

    return allData;
  }, [parsedId, byIdQuery.data, filterStatus, allQuery.data]);

  const reset = () => {
    setFilterId("");
    setFilterStatus("ALL");
  };

  return {
    filterId,
    filterStatus,
    displayData,
    isLoading: activeQuery.isLoading,
    error: activeQuery.error,
    setFilterId,
    setFilterStatus,
    reset,
  };
};
