export enum ReservationState {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED'
}


export interface ProductoReserva {
  idProducto: number;
  cantidad: number;
}

export interface ReservaInput {
  idCompra: string;
  usuarioId: number;
  productos: ProductoReserva[];
}

export interface ReservaOutput {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
  expiresAt: Date;
  fechaCreacion: Date;
}

export interface ReservaCompleta {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
  expiresAt: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  productos: ProductoReservaDetalle[];
}

export interface ProductoReservaDetalle {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface ActualizarReservaInput {
  usuarioId: number;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
}

export interface CancelacionReservaInput {
  motivo: string;
}

export interface GetReservationsFilters {
  usuarioId: number;
  estado?: 'confirmado' | 'pendiente' | 'cancelado';
  page?: number;
  limit?: number;
}