import type { IDimension, IWarehouseLocation } from "./embeddables.interface";
import type { ICategory } from "./category.interface";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    availableStock: number;
    weightKg: number;
    dimensions: IDimension;
    location: IWarehouseLocation;
    categories: ICategory[];
    images: IImageProduct[];
}

export interface IProductInput {
    name: string;
    unitPrice: number;
    availableStock: number; 
    description?: string;
    weightKg?: number;
    dimensions?: IDimension;
    location?: IWarehouseLocation;
    images?: Omit<IImageProduct, 'id'>[]; 
    categoryIds?: number[];
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