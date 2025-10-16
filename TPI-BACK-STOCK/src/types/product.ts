import { Category } from "../models/Category.entity";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  initialStock: number;
  availableStock: number;
  unitOfMeasurement?: string;
  categories?: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  initialStock: number;
  availableStock: number;
  unitOfMeasurement?: string;
  categoryIds?: number[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
}