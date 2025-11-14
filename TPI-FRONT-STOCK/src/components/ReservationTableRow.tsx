import { memo, useMemo } from "react";
import { formatDate, getStatusColor, getTotalItems } from "../utils/reservation.utils";
import type { IReservation } from "../types/reservation.interface";

interface ReservationTableRowProps {
  reservation: IReservation;
  onViewDetails: (reservation: IReservation) => void;
}

export const ReservationTableRow = memo(function ReservationTableRow({ 
  reservation, 
  onViewDetails 
}: ReservationTableRowProps) {
  const totalItems = useMemo(() => getTotalItems(reservation.items), [reservation.items]);
  const productLabel = totalItems === 1 ? 'producto' : 'productos';

  return (
    <tr className="hover:bg-blue-50 transition-colors duration-150">
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
            {totalItems}
          </span>
          <span className="text-xs text-gray-500">
            {productLabel}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={() => onViewDetails(reservation)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md cursor-pointer"
        >
          Ver detalles
        </button>
      </td>
    </tr>
  );
});
