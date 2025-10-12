// src/interfaces/product.interface.ts
// src/interfaces/product.interface.ts
import type { ICategory } from "./category.interface";
import type { IReservationItem } from "./reservation-item.interface";

export interface IProduct {
    id: number;
    name: string;
    description?: string;
    price: number;
    availableStock: number;
    createdAt: Date;
    categories: ICategory[];
    reservationItems?: IReservationItem[];
}

export interface ICreateProduct {
    name: string;
    description?: string;
    price: number;
    availableStock?: number;
    categoryIds: number[];
}

export interface IUpdateProduct {
    name?: string;
    description?: string;
    price?: number;
    availableStock?: number;
    categoryIds?: number[];
}