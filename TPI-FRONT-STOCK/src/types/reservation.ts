// Detalle de un producto dentro de una solicitud de reserva
export interface IProductoReservaInput {
  idProducto: number;
  cantidad: number;
}

// Input: Estructura para crear una Reserva (POST /reservas)
export interface IReservaInput {
  idCompra: string; // Requerido
  usuarioId: number; // Requerido
  productos: IProductoReservaInput[]; // Requerido
}

// Output: Respuesta simple de una Reserva (ReservaOutput)
export interface IReservaOutput {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: 'confirmado' | 'pendiente' | 'cancelado' | string; // Enum definido
  expiresAt: string; // date-time
  fechaCreacion: string; // date-time
}

// Detalle de un producto dentro de la respuesta completa de reserva
export interface IProductoReservaCompleta {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

// Output: Estructura completa de una Reserva (ReservaCompleta)
export interface IReservaCompleta {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: 'confirmado' | 'pendiente' | 'cancelado' | string; // Enum definido
  expiresAt: string; // date-time
  fechaCreacion: string; // date-time
  fechaActualizacion: string; // date-time
  productos: IProductoReservaCompleta[];
}

// Input: Estructura para actualizar el estado de una Reserva (PATCH /reservas/{id})
export interface IActualizarReservaInput {
    usuarioId: number; // Requerido
    estado: 'confirmado' | 'pendiente' | 'cancelado'; // Requerido
}

// Input: Estructura para cancelación (DELETE /reservas/{id})
export interface ICancelacionReservaInput {
  motivo: string; // Requerido
}

// Input: Estructura para liberación de stock (POST /reservas/liberar)
export interface ILiberacionInput {
    idReserva: number; // Requerido
    usuarioId: number; // Requerido
    motivo: string; // Requerido
}

// Output: Respuesta tras la liberación de stock
export interface ILiberacionOutput {
    mensaje: string;
    idReserva: number;
    estado: 'liberado' | string; // Enum definido
}