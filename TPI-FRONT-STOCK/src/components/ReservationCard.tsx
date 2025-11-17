import type { IReservation } from "../types/reservation.interface";
import { DeleteReservationButton } from "./DeleteReservationButton";

// Función helper fuera del componente para evitar recreación
const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("es-ES", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Constantes de estilos fuera del componente para evitar recreación
const STATUS_CLASSES = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
  DEFAULT: "bg-gray-100 text-gray-800 border-gray-300",
} as const;

/**
 * Props para el componente StatusBadge
 */
interface StatusBadgeProps {
  status: string;
}

/**
 * Badge que muestra el estado de una reserva con colores semánticos
 */
export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClass = STATUS_CLASSES[status as keyof typeof STATUS_CLASSES] || STATUS_CLASSES.DEFAULT;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}>
      {status}
    </span>
  );
};

/**
 * Props para DetailRow
 */
interface DetailRowProps {
  label: string;
  value: string | number;
}

/**
 * Fila de detalle que muestra un label y su valor
 */
export const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex flex-col sm:flex-row gap-1">
    <span className="font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

/**
 * Props para ReservationCard
 */
interface ReservationCardProps {
  reservation: IReservation;
}

/**
 * Tarjeta que muestra la información de una reserva individual
 */
export const ReservationCard = ({ reservation }: ReservationCardProps) => {
  return (
    <article className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <header className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Reserva #{reservation.id}</h3>
            <StatusBadge status={reservation.status} />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <DetailRow label="ID de Compra" value={reservation.idPurchase} />
            <DetailRow label="Usuario" value={reservation.userId} />
            <DetailRow label="Fecha de Reserva" value={formatDate(reservation.reservationDate)} />
            <DetailRow label="Expira" value={formatDate(reservation.expiredAt)} />
            <DetailRow label="Cantidad Total" value={`${reservation.totalQuantity} items`} />
            <DetailRow label="Productos" value={reservation.products?.length || 0} />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Ver Detalles
          </button>
          <DeleteReservationButton reservationId={reservation.id} />
        </div>
      </div>
    </article>
  );
};
