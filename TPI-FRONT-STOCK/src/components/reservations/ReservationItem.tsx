import { memo, useMemo } from "react";
import type { IReservationItem } from "../../types/reservation.interface";

interface ReservationItemProps {
  item: IReservationItem;
}

export const ReservationItem = memo(function ReservationItem({ item }: ReservationItemProps) {
  const subtotal = useMemo(
    () => parseFloat(item.precioUnitario) * item.cantidad,
    [item.precioUnitario, item.cantidad]
  );

  return (
    <li className="text-sm bg-gray-50 p-3 rounded">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="font-medium text-base">{item.nombre}</p>
          
          {item.producto?.descripcion && (
            <p className="text-xs text-gray-600 mt-1">
              {item.producto.descripcion}
            </p>
          )}
          
          {item.producto && (
            <p className="text-xs text-gray-500 mt-1">
              Stock disponible: {item.producto.stockDisponible} | Peso: {item.producto.pesoKg} kg
            </p>
          )}
          
          {item.producto?.ubicacion && (
            <p className="text-xs text-gray-500 mt-1">
              📍 {item.producto.ubicacion.calle}, {item.producto.ubicacion.ciudad}, {item.producto.ubicacion.provincia}
            </p>
          )}
        </div>
        
        <div className="text-right ml-3">
          <p className="font-semibold text-base">
            {item.cantidad}x ${parseFloat(item.precioUnitario).toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
        </div>
      </div>
    </li>
  );
});
