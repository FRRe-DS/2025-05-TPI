import { memo, useMemo } from "react";
import { formatDate, getStatusColor, getTotalItems, calculateReservationTotal } from "../utils/reservation.utils";
import { ReservationItem } from "./ReservationItem";
import type { IReservation } from "../types/reservation.interface";

interface ReservationCardProps {
  reservation: IReservation;
}

export const ReservationCard = memo(function ReservationCard({ reservation }: ReservationCardProps) {
  const totalItems = useMemo(() => getTotalItems(reservation.items), [reservation.items]);
  const total = useMemo(() => calculateReservationTotal(reservation.items), [reservation.items]);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">Reserva #{reservation.idReserva}</h3>
          <p className="text-sm text-gray-600">ID Compra: {reservation.idCompra}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.estado)}`}>
          {reservation.estado}
        </span>
      </div>

      {/* Información general */}
      <div className="space-y-2 mb-3 text-sm">
        <p>
          <span className="font-medium">Usuario ID:</span> {reservation.usuarioId}
        </p>
        <p>
          <span className="font-medium">Fecha de reserva:</span> {formatDate(reservation.fechaCreacion, true)}
        </p>
        <p>
          <span className="font-medium">Última actualización:</span> {formatDate(reservation.fechaActualizacion, true)}
        </p>
        <p>
          <span className="font-medium">Expira:</span> {formatDate(reservation.expiraEn, true)}
        </p>
        <p>
          <span className="font-medium">Total productos:</span> {totalItems} unidades
        </p>
      </div>

      {/* Lista de productos */}
      {reservation.items && reservation.items.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-sm mb-2">Productos reservados:</h4>
          <ul className="space-y-2">
            {reservation.items.map((item) => (
              <ReservationItem key={item.id} item={item} />
            ))}
          </ul>
          
          {/* Total */}
          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-base">Total de la reserva:</span>
              <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});