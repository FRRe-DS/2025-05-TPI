// src/interfaces/product.interface.ts
// src/interfaces/product.interface.ts
import type { IDimension, IWarehouseLocation } from ".";
import type { ICategory } from "./category.interface";

export interface IProduct {
    id: number;
    name: string;
    description?: string;
    price: number;
    availableStock: number;
    weightKg?: number;
    categories: ICategory[];

    // Componentes incrustados
    dimension?: IDimension;
    location?: IWarehouseLocation;

    // Relaciones (Array de objetos completos)
    imagenes: IImageProduct[];
    categorias: ICategory[] | null; 
}

/**
 * Interfas para el ingreso de un producto.
*/

export interface IProductInput {
    name: string;
    price: number;
    availableStock: number; 
    description?: string;
    weightKg?: number;

    // Componentes incrustados (opcionales)
    dimension?: IDimension;
    location?: IWarehouseLocation;

    // Relaciones (Array de IDs o de objetos sin ID)
    imagenes?: Omit<IImageProduct, 'id'>[]; 
    categoryIds?: number[];
}

/**
 * Tipo para actualizar un producto
*/
export type IProductUpdate = Partial<IProductInput>;

/**
 * Respuesta cuando se crea un producto.
*/
export interface ICreatedProduct {
    id: number;
    mensaje: string;
}

/**
 * Imagen de producto.
*/
export interface IImageProduct {
    id?: number; 
    productId: number;
    url: string;
    esPrincipal: boolean;
}

/**
 * Productos de una reserva.
*/
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