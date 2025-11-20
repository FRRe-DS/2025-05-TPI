import { useMemo } from "react";
import type { ReactNode } from "react";
import { ReservationFilterContext } from "./reservationFilterContext"; 
import { useReservations, useReservationById } from "../../hooks/reservation.hook";
import type { IReservation } from "../../types/reservation.interface";
// Importamos los hooks genéricos basados en URL
import { useIdFilter, useSelectFilter } from "../../hooks/filters";
import { useFilterReset } from "../generic";
import { useUrlPagination } from "../../hooks/pagination.hook"; 
interface ChildrenProps{
 children: ReactNode
}

// Nota: Este tipo también está definido en el archivo de Contexto
export type FilterStatus = "ALL" | "PENDIENTE" | "CONFIRMADO" | "CANCELADO";

export function ReservationFilterProvider({ children }: ChildrenProps) {
 // 🛑 Hooks de Filtros que leen y escriben en la URL 🛑
 
 // 1. Filtro por ID de Reserva (usa URL param 'id')
 const { 
  id: filterId, 
  setId: setFilterId, 
  parsedId, 
  reset: resetId 
 } = useIdFilter("id"); // Usamos "id" explícitamente, aunque es el default
 
 // 2. Filtro por ID de Usuario (usa URL param 'userId')
 const { 
  id: filterUserId, 
  setId: setFilterUserId, 
  parsedId: parsedUserId, 
  reset: resetUserId 
 } = useIdFilter("userId"); // Usa el parámetro 'userId'
 
 // 3. Filtro de Estado (usa URL param 'status')
 const { 
  selected: filterStatus, 
  setSelected: setFilterStatus, 
  reset: resetStatus 
 // Primer argumento es el nombre del parámetro URL ('status')
 } = useSelectFilter<FilterStatus>("status", "ALL", "ALL");

 // Queries (igual que antes)
 const allQuery = useReservations();
 const byIdQuery = useReservationById(parsedId || 0, parsedId !== null && parsedId > 0);
 const activeQuery = parsedId ? byIdQuery : allQuery;

 // Datos filtrados (sin paginar) - La lógica de filtrado es inmutable
 const filtered = useMemo((): IReservation[] => {
  
  if (parsedId) {
   // Filtro cuando se busca por un ID de reserva específico
   if (byIdQuery.error || !byIdQuery.data) {
    return [];
   }
   const reservation = byIdQuery.data;
   
   // Aplica filtros secundarios (estado, usuario ID) a la única reserva encontrada
   if (filterStatus !== "ALL" && reservation.estado !== filterStatus) {
    return []; 
   }
   if (parsedUserId && reservation.usuarioId !== parsedUserId) {
    return [];
   }
   return [reservation];
  }
  
  // Filtros aplicados a todas las reservas
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

 // 🎯 Paginación ahora usa useUrlPagination (lee/escribe el 'page' en la URL)
 const { paginatedData, pagination } = useUrlPagination<IReservation>(filtered, {
  itemsPerPage: 8,
 });

 // 🛑 Eliminamos el useEffect que reseteaba la página, ya que useUrlPagination
  // garantiza que la página sea válida para el nuevo conjunto de datos 'filtered'.
  
 // Reset combinado
 // Incluimos resetPage para limpiar el parámetro 'page' de la URL.
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
   goToPage: pagination.goToPage,
   reset,
  }}>
   {children}
  </ReservationFilterContext.Provider>
 );
}