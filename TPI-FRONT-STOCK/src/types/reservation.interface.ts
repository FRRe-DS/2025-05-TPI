// src/interfaces/reservation.interface.ts
import type { IReservationItem } from "./reservation-item.interface";

enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

export interface IReservation {
    id: number;
    userId: number;
    status: ReservationStatus;
    reservationDate: Date;
    totalQuantity: number;
    items: IReservationItem[];
}

export interface ICreateReservation {
    userId: number;
    items: ICreateReservationItem[];
}

export interface IUpdateReservation {
    status?: ReservationStatus;
}