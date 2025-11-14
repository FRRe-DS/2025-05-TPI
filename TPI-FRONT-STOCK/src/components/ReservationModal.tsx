import { formatDate, getStatusColor, calculateReservationTotal, getTotalItems } from "../utils/reservation.utils";
import type { IReservation } from "../types/reservation.interface";

interface ReservationModalProps {
  reservation: IReservation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ reservation, isOpen, onClose }: ReservationModalProps) {
  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity"></div>
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
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
                className="text-white hover:bg-blue-500 rounded-lg p-2 transition-colors"
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
            </div>

            {/* Productos Reservados */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                Productos Reservados
              </h3>
              
              <div className="space-y-3">
                {reservation.items.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
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
                          ${(parseFloat(item.precioUnitario) * item.cantidad).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-4">
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Total de la Reserva
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${calculateReservationTotal(reservation.items).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {reservation.items.length} {reservation.items.length === 1 ? 'producto' : 'productos'} • {' '}
                  {getTotalItems(reservation.items)} unidades totales
                </p>
              </div>
            </div>
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