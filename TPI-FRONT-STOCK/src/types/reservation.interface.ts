// src/interfaces/reservation.interface.ts

import type { IReservationProduct, IReservationProductInput } from ".";

enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

export interface IReservation {
  id: number;
  idPurchase: string;
  userId: number;
  status: ReservationStatus;
  reservationDate: Date;
  expiredAt: Date;
  updatedAt: Date;
  totalQuantity: number;
  products: IReservationProduct[];
}

export interface IReservationInput {
  idPurchase: string; 
  userId: number; 
  products: IReservationProductInput[]; 
}

export interface IReservaOutput {
  id: number;
  idPurchase: string;
  userId: number;
  status: ReservationStatus;
  expiredAt: Date; 
  reservationDate: Date;
}

export interface IReservationUpdate {
    userId: number; 
    status: ReservationStatus;
}

export interface IReservationCanceled {
  reason: string; 
}

export interface IReleaseInput {
  idReservation: number; 
  userId: number;
  reason: string; 
}

export interface IReleaseOutput {
  message: string;
  idReservation: number;
  status: 'liberado';
}