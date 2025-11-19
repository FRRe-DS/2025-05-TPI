import type { IReservation } from "./reservation.interface";
import type { IProduct } from "./product.interface";

export interface IReservationItem {
    id: number;
    productId: number;
    name: string;
    quantity: number;
    unitPriceAtReservation: number;
    reservationId: number;
    reservation?: IReservation;
    product?: IProduct;
}