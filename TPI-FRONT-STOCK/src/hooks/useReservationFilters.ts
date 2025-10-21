import { useState, useMemo } from "react";
import { useReservations, useReservationById, useReservationsByStatus } from "./reservation.hook";
import type { IReservation } from "../types/reservation.interface";

/**
 * Estado de búsqueda
 */
type SearchMode = "ALL" | "ID" | "STATUS";
type FilterStatus = "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED";

/**
 * Resultado del hook de filtros
 */
interface UseReservationFiltersResult {
  // Estado
  filterId: string;
  filterStatus: FilterStatus;
  displayData: IReservation[];
  isLoading: boolean;
  error: Error | null;
  
  // Acciones
  setFilterId: (id: string) => void;
  handleSearchById: () => void;
  handleSearchByStatus: (status: FilterStatus) => void;
  handleReset: () => void;
}

/**
 * Hook personalizado que gestiona la lógica de filtros de reservas
 * Encapsula toda la lógica de búsqueda y filtrado
 */
export const useReservationFilters = (): UseReservationFiltersResult => {
  const [filterId, setFilterId] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [searchMode, setSearchMode] = useState<SearchMode>("ALL");

  // Queries condicionales
  const allReservationsQuery = useReservations();
  
  // Parsear ID con validación
  const parsedId = useMemo(() => {
    const num = parseInt(filterId);
    return isNaN(num) ? 0 : num;
  }, [filterId]);
  
  const byIdQuery = useReservationById(
    parsedId,
    searchMode === "ID" && parsedId > 0
  );
  
  const byStatusQuery = useReservationsByStatus(
    filterStatus as "PENDING" | "CONFIRMED" | "CANCELLED",
    searchMode === "STATUS" && filterStatus !== "ALL"
  );

  // Determinar qué datos mostrar según el modo de búsqueda
  const displayData = useMemo((): IReservation[] => {
    if (searchMode === "ID" && filterId && byIdQuery.data) {
      return [byIdQuery.data];
    }
    if (searchMode === "STATUS" && filterStatus !== "ALL" && byStatusQuery.data) {
      return byStatusQuery.data;
    }
    return allReservationsQuery.data || [];
  }, [searchMode, filterId, filterStatus, byIdQuery.data, byStatusQuery.data, allReservationsQuery.data]);

  // Determinar estado de carga (sin useMemo - es una comparación simple)
  const isLoading =
    (searchMode === "ALL" && allReservationsQuery.isLoading) ||
    (searchMode === "ID" && byIdQuery.isLoading) ||
    (searchMode === "STATUS" && byStatusQuery.isLoading);

  // Determinar si hay error (sin useMemo - es una comparación simple)
  const error =
    (searchMode === "ALL" && allReservationsQuery.error) ||
    (searchMode === "ID" && byIdQuery.error) ||
    (searchMode === "STATUS" && byStatusQuery.error) ||
    null;

  // Manejadores de acciones
  const handleSearchById = () => {
    setSearchMode(filterId.trim() === "" ? "ALL" : "ID");
  };

  const handleSearchByStatus = (status: FilterStatus) => {
    setFilterStatus(status);
    setSearchMode(status === "ALL" ? "ALL" : "STATUS");
  };

  const handleReset = () => {
    setFilterId("");
    setFilterStatus("ALL");
    setSearchMode("ALL");
  };

  return {
    filterId,
    filterStatus,
    displayData,
    isLoading,
    error,
    setFilterId,
    handleSearchById,
    handleSearchByStatus,
    handleReset,
  };
};
