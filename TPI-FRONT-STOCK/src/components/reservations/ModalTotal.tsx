import { memo, useMemo } from "react";
import { calculateReservationTotal, getTotalItems } from "../../utils/reservation.utils";
import type { IReservationItem } from "../../types/reservation.interface";

interface ModalTotalProps {
  items: IReservationItem[];
}

export const ModalTotal = memo(function ModalTotal({ items }: ModalTotalProps) {
  const total = useMemo(() => calculateReservationTotal(items), [items]);
  const totalUnits = useMemo(() => getTotalItems(items), [items]);

  return (
    <div className="border-t-2 border-gray-200 pt-4">
      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">
            Total de la Reserva
          </span>
          <span className="text-2xl font-bold text-blue-600">
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {items.length} {items.length === 1 ? 'producto' : 'productos'} • {totalUnits} unidades totales
        </p>
      </div>
    </div>
  );
});
