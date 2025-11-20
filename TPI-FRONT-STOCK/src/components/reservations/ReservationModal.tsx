import { useCallback } from "react";
import { formatDate, getStatusColor } from "../../utils/reservation.utils";
import { ModalProductItem } from "./ModalProductItem";
import { ModalTotal } from "./ModalTotal";
import type { IReservation } from "../../types/reservation.interface";

interface ReservationModalProps {
  reservation: IReservation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ reservation, isOpen, onClose }: ReservationModalProps) {
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity"></div>
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Reserva #{reservation.idReserva}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Compra #{reservation.idCompra}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-blue-500 rounded-lg p-2 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Info General */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Fecha de Creación</p>
                <p className="text-sm font-bold text-gray-900">{formatDate(reservation.fechaCreacion, true)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Estado</p>
                <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full border ${getStatusColor(reservation.estado)}`}>
                  {reservation.estado}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Usuario</p>
                <p className="text-sm font-bold text-gray-900">ID: {reservation.usuarioId}</p>
              </div>
            </div>

            {/* Productos Reservados */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                Productos Reservados
              </h3>
              
              <div className="space-y-3">
                {reservation.items.map((item) => (
                  <ModalProductItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Total */}
            <ModalTotal items={reservation.items} />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}