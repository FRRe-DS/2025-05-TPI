import { useState, useMemo } from "react";
import { useReservations, useReservationById, useReservationsByStatus } from "./reservation.hook";
import type { IReservation } from "../types/reservation.interface";

export type FilterStatus = "ALL" | "PENDING" | "CONFIRMED" | "CANCELED";

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
  const byStatusQuery = useReservationsByStatus(
    filterStatus as Exclude<FilterStatus, "ALL">,
    filterStatus !== "ALL"
  );

  // Selección unificada de la query activa
  const activeQuery = parsedId
    ? byIdQuery
    : filterStatus !== "ALL"
      ? byStatusQuery
      : allQuery;

  // Determinar qué datos mostrar
  const displayData = useMemo((): IReservation[] => {
    if (parsedId && byIdQuery.data) return [byIdQuery.data];
    if (filterStatus !== "ALL" && byStatusQuery.data) return byStatusQuery.data;
    return allQuery.data || [];
  }, [parsedId, byIdQuery.data, filterStatus, byStatusQuery.data, allQuery.data]);

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
