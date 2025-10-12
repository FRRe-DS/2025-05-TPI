// src/interfaces/category.interface.ts
// src/interfaces/category.interface.ts
import type { IProduct } from "./product.interface";

export interface ICategory {
    id: number;
    name: string;
    products?: IProduct[];
}

export interface ICreateCategory {
    name: string;
}

export interface IUpdateCategory {
    name?: string;
}