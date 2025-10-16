import type { IProduct } from "./product.interface";

export interface ICategory {
  id: number;
  nombre: string;
  descripcion?: string;
  productos?: IProduct[];
}

export interface ICreateCategory {
  nombre: string;
  descripcion?: string;
}

export interface IUpdateCategory {
  nombre?: string;
  descripcion?: string;
}
