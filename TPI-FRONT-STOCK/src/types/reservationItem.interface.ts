// src/interfaces/reservation-item.interface.ts
// src/interfaces/reservation-item.interface.ts
import type { IReservation } from "./reservation.interface";
import type { IProduct } from "./product.interface";

export interface IReservationItem {
    id: number;
    reservationId: number;
    productId: number;
    reservedQuantity: number;
    reservation?: IReservation;
    product?: IProduct;
}

export interface ICreateReservationItem {
    productId: number;
    reservedQuantity: number;
}