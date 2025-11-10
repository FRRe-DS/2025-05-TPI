export enum EstadoReserva {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
  EXPIRADO = 'EXPIRADO',
}

export interface ItemReserva {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Reserva {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: EstadoReserva;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  expiraEn: Date;
  items: ItemReserva[]; 
}

export interface ReservaInput {
  idCompra: string;
  usuarioId: number;
  productos: Array<{
    idProducto: number;
    cantidad: number;
  }>;
}

export interface ActualizarReservaInput {
  usuarioId: number;
  estado: EstadoReserva;
}

export interface CancelacionReservaInput {
  motivo: string;
}

export interface LiberacionReservaInput {
  idReserva: number;
  usuarioId: number;
  motivo: string;
}

export interface LiberacionReservaOutput {
  mensaje: string;
  idReserva: number;
  estado: 'LIBERADO';
}