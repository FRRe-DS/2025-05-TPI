import { useState, useMemo } from "react";
import { useReservations, useReservationById, useReservationsByStatus } from "./reservation.hook";
import type { IReservation } from "../types/reservation.interface";

/**
 * Estado de búsqueda
 */
type SearchMode = "ALL" | "ID" | "STATUS";
type FilterStatus = "ALL" | "PENDING" | "CONFIRMED" | "CANCELED";


interface UseReservationFiltersResult {
  filterId: string;
  filterStatus: FilterStatus;
  displayData: IReservation[];
  isLoading: boolean;
  error: Error | null;
  
  setFilterId: (id: string) => void;
  handleSearchById: () => void;
  handleSearchByStatus: (status: FilterStatus) => void;
  handleReset: () => void;
}


export const useReservationFilters = (): UseReservationFiltersResult => {
  const [filterId, setFilterId] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [searchMode, setSearchMode] = useState<SearchMode>("ALL");

  const allReservationsQuery = useReservations();
  
  const parsedId = useMemo(() => {
    const num = parseInt(filterId);
    return isNaN(num) ? 0 : num;
  }, [filterId]);
  
  const byIdQuery = useReservationById(
    parsedId,
    searchMode === "ID" && parsedId > 0
  );
  
  const byStatusQuery = useReservationsByStatus(
    filterStatus as "PENDING" | "CONFIRMED" | "CANCELED",
    searchMode === "STATUS" && filterStatus !== "ALL"
  );

  const displayData = useMemo((): IReservation[] => {
    if (searchMode === "ID" && filterId && byIdQuery.data) {
      return [byIdQuery.data];
    }
    if (searchMode === "STATUS" && filterStatus !== "ALL" && byStatusQuery.data) {
      return byStatusQuery.data;
    }
    return allReservationsQuery.data || [];
  }, [searchMode, filterId, filterStatus, byIdQuery.data, byStatusQuery.data, allReservationsQuery.data]);

  const isLoading =
    (searchMode === "ALL" && allReservationsQuery.isLoading) ||
    (searchMode === "ID" && byIdQuery.isLoading) ||
    (searchMode === "STATUS" && byStatusQuery.isLoading);

  const error =
    (searchMode === "ALL" && allReservationsQuery.error) ||
    (searchMode === "ID" && byIdQuery.error) ||
    (searchMode === "STATUS" && byStatusQuery.error) ||
    null;

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
