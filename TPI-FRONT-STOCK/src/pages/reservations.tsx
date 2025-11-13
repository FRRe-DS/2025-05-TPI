import { useReservations } from "../hooks/reservation.hook";
import { ReservationCard } from "../components/ReservationCard";

export default function ReservationsPage() {
  const { data: reservations, isLoading, error } = useReservations();

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestión de Reservas</h1>
          <p className="text-gray-600 text-lg">
            Total de reservas: <span className="font-semibold">{reservations?.length || 0}</span>
          </p>
        </div>
        
        {!reservations || reservations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-xl">No hay reservas disponibles</p>
            <p className="text-gray-500 text-sm mt-2">Las reservas aparecerán aquí una vez sean creadas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.idReserva} reservation={reservation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}