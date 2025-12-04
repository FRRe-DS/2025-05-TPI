import type { IDimension, IWarehouseLocation } from "./embeddables.interface";
import type { ICategory } from "./category.interface";

export interface IProduct {
    id: number;
    nombre: string;      
    descripcion: string; 
    precio: number;      
    stockDisponible?: number; // Como está en la clase Entity
    stock_disponible?: number; // Como está en la columna DB
    stock?: number; // Fallback antiguo
    pesoKg?: number;
    dimensiones?: IDimension;
    ubicacion?: IWarehouseLocation;
    categorias?: ICategory[];
    categories?: ICategory[];
    imagenes?: IImageProduct[];
}

export interface IProductInput {
  nombre: string;
  precio: number;
  stock: number; 
  descripcion?: string;
  pesoKg?: number;
  dimensiones?: IDimension;
  ubicacion?: IWarehouseLocation;
  imagenes?: Omit<IImageProduct, 'id'>[]; 
  categorias?: number[];
}

export type IProductUpdate = Partial<IProductInput>;

export interface ICreatedProduct {
    id: number;
    mensaje: string;
}

export interface ICreateProduct {
  nombre: string;
  descripcion: string;
  precio: number;
  stockDisponible: number;
  pesoKg: number;
  dimensiones: {
    largoCm: number;
    anchoCm: number;
    altoCm: number;
  };
  ubicacion: {
    calle: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
    pais: string;
  };
  categorias?: number[];
}

export interface IImageProduct {
    id?: number; 
    productId: number;
    url: string;
    isMain: boolean;
}

export interface IReservationProduct {
  idProducto: number;
  name: string;
  quantity: number;
  price: number;
}

export interface IReservationProductInput {
  idProduct: number;
  quantity: number;
}