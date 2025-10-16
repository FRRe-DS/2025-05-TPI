import type { ICategory } from "./category.interface";

export interface IProduct {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stockDisponible: number;
  pesoKg?: number;
  categorias?: ICategory[];
}

export interface ICreateProduct {
  nombre: string;
  descripcion?: string;
  precio: number;
  stockInicial: number;
  categoriasIds: number[];
}

export interface IUpdateProduct {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stockDisponible?: number;
  categoriasIds?: number[];
}
