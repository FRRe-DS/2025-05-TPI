import type {
  IReservationProduct,
  IReservationProductDetail,
} from "./reservation-item.interface";

export type ReservationStatus = "confirmado" | "pendiente" | "cancelado";

export interface IReservationRequest {
  idCompra: string;
  usuarioId: number;
  productos: IReservationProduct[];
}

export interface IReservationResponse {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: ReservationStatus;
  expiresAt?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface IReservationDetail extends IReservationResponse {
  productos: IReservationProductDetail[];
}
