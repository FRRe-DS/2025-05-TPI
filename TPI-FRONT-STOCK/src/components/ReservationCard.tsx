import type { IReservation } from "../types/reservation.interface";

interface ReservationCardProps {
  reservation: IReservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'CONFIRMADO':
        return 'bg-green-100 text-green-800';
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELADO':
        return 'bg-red-100 text-red-800';
      case 'EXPIRADO':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const calculateTotal = () => {
    return reservation.items.reduce((total, item) => {
      return total + (parseFloat(item.precioUnitario) * item.cantidad);
    }, 0);
  };

  const getTotalItems = () => {
    return reservation.items.reduce((total, item) => total + item.cantidad, 0);
  };

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
          <span className="font-medium">Fecha de reserva:</span> {formatDate(reservation.fechaCreacion)}
        </p>
        <p>
          <span className="font-medium">Última actualización:</span> {formatDate(reservation.fechaActualizacion)}
        </p>
        <p>
          <span className="font-medium">Expira:</span> {formatDate(reservation.expiraEn)}
        </p>
        <p>
          <span className="font-medium">Total productos:</span> {getTotalItems()} unidades
        </p>
      </div>

      {/* Lista de productos */}
      {reservation.items && reservation.items.length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-sm mb-2">Productos reservados:</h4>
          <ul className="space-y-2">
            {reservation.items.map((item) => (
              <li key={item.id} className="text-sm bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-base">{item.nombre}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.producto.descripcion}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Stock disponible: {item.producto.stockDisponible} | Peso: {item.producto.pesoKg} kg
                    </p>
                    {item.producto.ubicacion && (
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
                      Subtotal: ${(parseFloat(item.precioUnitario) * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Total */}
          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-base">Total de la reserva:</span>
              <span className="text-xl font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}