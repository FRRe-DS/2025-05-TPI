import { useReservationFilters } from "../hooks/useReservationFilters";
import { useState } from "react";
import { ReservationModal } from "../components/ReservationModal";
import { SearchFilters } from "../components/SearchFilters";
import { LoadingState, ErrorState, EmptyState } from "../components/ReservationStates";
import type { IReservation } from "../types/reservation.interface";
import { formatDate, getStatusColor, getTotalItems } from "../utils/reservation.utils";

export default function ReservationsPage() {
  const {
    filterId,
    filterStatus,
    displayData,
    isLoading,
    error,
    setFilterId,
    setFilterStatus,
    reset
  } = useReservationFilters();

  const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (reservation: IReservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏪 Gestión de Reservas</h1>
          <p className="text-gray-600 text-lg">
            Control de stock reservado para ventas del ecommerce
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Total de reservas:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
              {displayData?.length || 0}
            </span>
          </div>
        </div>

        {/* Filtros de Búsqueda */}
        <SearchFilters
          filterId={filterId}
          filterStatus={filterStatus}
          onFilterIdChange={setFilterId}
          onFilterStatusChange={setFilterStatus}
          onReset={reset}
        />

        {/* Estados */}
        {isLoading && <LoadingState />}
        
        {error && <ErrorState message={error.message} />}
        
        {!isLoading && !error && (!displayData || displayData.length === 0) && (
          <EmptyState />
        )}

        {/* Tabla de Reservas */}
        {!isLoading && !error && displayData && displayData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ID Reserva
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Fecha Creación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Productos
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayData.map((reservation) => (
                  <tr 
                    key={reservation.idReserva} 
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            #{reservation.idReserva}
                          </div>
                          <div className="text-xs text-gray-500">
                            Compra: #{reservation.idCompra}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {formatDate(reservation.fechaCreacion)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusColor(reservation.estado)}`}>
                        {reservation.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {getTotalItems(reservation.items)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getTotalItems(reservation.items) === 1 ? 'producto' : 'productos'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleOpenModal(reservation)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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