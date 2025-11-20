/**
 * Utilidades compartidas para el manejo de reservas
 */

/**
 * Formatea una fecha al formato local español
 */
export const formatDate = (dateString: string, includeTime = false): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: includeTime ? 'long' : 'short',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  return new Date(dateString).toLocaleString('es-AR', options);
};

/**
 * Retorna las clases CSS para el badge de estado
 */
export const getStatusColor = (estado: string): string => {
  const statusMap: Record<string, string> = {
    'CONFIRMADO': 'bg-green-100 text-green-800 border-green-200',
    'PENDIENTE': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'CANCELADO': 'bg-red-100 text-red-800 border-red-200',
    'EXPIRADO': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  
  return statusMap[estado] || 'bg-blue-100 text-blue-800 border-blue-200';
};

/**
 * Calcula el total de una reserva sumando todos los items
 */
export const calculateReservationTotal = (items: Array<{ precioUnitario: string; cantidad: number }>): number => {
  return items.reduce((total, item) => total + (parseFloat(item.precioUnitario) * item.cantidad), 0);
};

/**
 * Calcula el total de items/productos en una reserva
 */
export const getTotalItems = (items: Array<{ cantidad: number }>): number => {
  return items.reduce((total, item) => total + item.cantidad, 0);
};
