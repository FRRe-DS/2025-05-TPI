// src/services/productServices.ts

import { ProductRepository } from "../repository/productsRepository";
import { CategoryRepository } from "../repository/categoryRepository";
import { Product, Category, Dimension, WarehouseLocation } from "../models";

export type CreateProductDTO = {
  name: string;
  description: string;
  unitPrice: number;
  availableStock: number;
  weightKg: number;
  dimensions: Dimension;
  location: WarehouseLocation;
  categoryIds?: number[];
};

export class ProductService {
  
  private productRepository: ProductRepository;
  private categoryRepository: CategoryRepository;

  constructor(productRepo: ProductRepository, categoryRepo: CategoryRepository) {
    this.productRepository = productRepo;
    this.categoryRepository = categoryRepo;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.findAllProducts();
  }

  async findProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(productData: CreateProductDTO): Promise<Product> {
    
    let categories: Category[] = [];
    if (productData.categoryIds && productData.categoryIds.length > 0) {
      categories = await this.categoryRepository.findByIds(productData.categoryIds);
      
      if (categories.length !== productData.categoryIds.length) {
        throw new Error("Una o más categorías no fueron encontradas.");
      }
    }

    const newProduct = this.productRepository.create({
      name: productData.name,
      description: productData.description,
      unitPrice: productData.unitPrice,
      availableStock: productData.availableStock || 0,
      weightKg: productData.weightKg || 0,
      dimensions: productData.dimensions,
      location: productData.location,
      categories: categories
    });
    
    return newProduct;
  }
}