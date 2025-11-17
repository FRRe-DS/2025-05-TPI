import { ReservationItem } from "../models";

export enum ReservationState {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface ReservationItemInterface {
  productId: number;
  name: string;
  quantity: number;
  unitPriceAtReservation: number;
}

export interface ReservationInterface {
  id: number;
  purchaseId: string;
  userId: number;
  state: ReservationState;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  items: ReservationItem[]; 
}

export interface ReservationInput {
  purchaseId: number;
  userId: number;
  items:ReservationItemInterface[];
}

export interface UpdateReservation {
  userId: number;
  state: ReservationState;
}

export interface CancelReservation {
  reservationId?: number;
  state: 'CANCELLED';
  reason: string;
}

export interface ReleaseReservationInput {
  reservationId: number;
  userId: number;
  reason: string;
}

export interface ReleaseReservationOutput {
  mensaje: string;
  idReserva: number;
  estado: 'RELEASED';
}