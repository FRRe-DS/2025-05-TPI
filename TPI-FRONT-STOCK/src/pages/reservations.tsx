import { useState, useCallback } from "react";
// Importamos el Provider y el Hook Consumidor
import { ReservationFilterProvider } from "../context/reservation/reservationFilterProvider";
import { useReservationFilter } from "../context/reservation/reservationFilterContext";
import Pagination from "../components/common/ui/pagination";

import {
 ReservationModal,
 SearchFilters,
 ReservationTableRow,
 LoadingState,
 EmptyState,
} from "../components/reservations";
import type { IReservation } from "../types/reservation.interface";

function ReservationsContent() {
 // Desestructuramos las props del Contexto
 const { 
  displayData, 
  isLoading, 
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  goToPage 
} = useReservationFilter(); 

 const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

 const handleOpenModal = useCallback((reservation: IReservation) => {
  setSelectedReservation(reservation);
  setIsModalOpen(true);
 }, []);

 const handleCloseModal = useCallback(() => {
  setIsModalOpen(false);
  setSelectedReservation(null);
 }, []);


 return (
  <div className="min-h-screen bg-gray-50 py-8">
   <div className="container mx-auto px-4 max-w-7xl">
    {/* Header */}
    <div className="mb-8">
     <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestión de Reservas</h1>
     <p className="text-gray-600 text-lg">
      Control de stock reservado para ventas del ecommerce
     </p>
     <div className="mt-4 flex items-center gap-2">
      <span className="text-sm text-gray-500">Total de reservas:</span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
       {totalItems || 0}
      </span>
     </div>
    </div>

    {/* Filtros de Búsqueda */}
    <SearchFilters />

    {/* Estados */}
    {isLoading && <LoadingState />}
    
    {!isLoading && (!displayData || displayData.length === 0) && (
     <EmptyState />
    )}

    {/* Tabla de Reservas */}
    {!isLoading && displayData && displayData.length > 0 && (
     <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
        <tr>
         {/* ... Thead content ... */}
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {displayData.map((reservation) => (
         <ReservationTableRow
          key={reservation.idReserva}
          reservation={reservation}
          onViewDetails={handleOpenModal}
         />
        ))}
       </tbody>
      </table>
      {/* Paginación */}
      {displayData && displayData.length > 0 && (
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={goToPage} 
       />
      )}
     </div>
    )}
    {/* Modal */}
    <ReservationModal
     reservation={selectedReservation}
     isOpen={isModalOpen}
     onClose={handleCloseModal}
    />
   </div>
  </div>
 );
}

export default function ReservationsPage() {
 return (
  <ReservationFilterProvider>
   <ReservationsContent />
  </ReservationFilterProvider>
 );
}