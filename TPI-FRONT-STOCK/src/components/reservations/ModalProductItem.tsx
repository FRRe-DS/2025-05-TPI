import { memo, useMemo } from "react";
import type { IReservationItem } from "../../types/reservation.interface";

interface ModalProductItemProps {
  item: IReservationItem;
}

export const ModalProductItem = memo(function ModalProductItem({ item }: ModalProductItemProps) {
  const subtotal = useMemo(
    () => parseFloat(item.precioUnitario) * item.cantidad,
    [item.precioUnitario, item.cantidad]
  );

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">
            {item.nombre}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            SKU: {item.productoId}
          </p>
          
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-gray-500">Cantidad:</span>
              <span className="ml-1 font-semibold text-gray-900">
                {item.cantidad} unidades
              </span>
            </div>
            <div>
              <span className="text-gray-500">Precio unitario:</span>
              <span className="ml-1 font-semibold text-gray-900">
                ${parseFloat(item.precioUnitario).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
          <p className="text-lg font-bold text-blue-600">
            ${subtotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
});
