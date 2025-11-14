import { useReservationFilters } from "../hooks/useReservationFilters";
import { useState } from "react";
import { ReservationModal } from "../components/ReservationModal";
import { SearchFilters } from "../components/SearchFilters";
import type { IReservation } from "../types/reservation.interface";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Cargando reservas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-xl text-red-600 font-semibold mb-2">Error al cargar las reservas</p>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'CONFIRMADO':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELADO':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'EXPIRADO':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTotalItems = (reservation: IReservation) => {
    return reservation.items.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2"> Gestión de Reservas</h1>
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
        
        {!displayData || displayData.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border-2 border-gray-200">
            <div className="text-6xl mb-4"></div>
            <p className="text-gray-600 text-xl">No se encontraron reservas</p>
            <p className="text-gray-500 text-sm mt-2">
              {filterId || filterStatus !== "ALL" 
                ? "Intenta ajustar los filtros de búsqueda"
                : "Las reservas aparecerán aquí una vez sean creadas"
              }
            </p>
          </div>
        ) : (
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
                          {getTotalItems(reservation)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getTotalItems(reservation) === 1 ? 'producto' : 'productos'}
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