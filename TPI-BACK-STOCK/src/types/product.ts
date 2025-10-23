import { Dimension } from "../models";
import { Category, ProductImage } from "../models/entities";

export interface DimensionesInput {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

export interface UbicacionAlmacenInput {
  warehouseId: number;
  aisle: string;
  shelf: string;
  level: number;
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  unitPrice: number; 
  availableStock: number;
  weightKg: number;
  dimensions: DimensionesInput;
  location: UbicacionAlmacenInput;
  images: ProductImage[]; 
  categories: Category[]; 
}

export interface ProductInput {
  name: string;
  description: string;
  unitPrice: number; 
  availableStock: number;
  weightKg: number;
  dimensions: DimensionesInput;
  location: UbicacionAlmacenInput;    
  images: ProductImage[];
  categories: Category[]; 
}

export interface ProductUpdate {
  name: string;
  description: string;
  unitPrice: number; 
  availableStock: number;
  weightKg: number;
  dimensions: DimensionesInput;
  location: UbicacionAlmacenInput;
  images: ProductImage[];
  categories: Category[]; 
}

