// src/services/productServices.ts

import { ProductRepository } from "../repository/products.repository";
import { CategoryRepository } from "../repository/category.repository";
import { Product, Category, Dimension, WarehouseLocation } from "../models";
import { ProductInput, ProductUpdate } from "../types";
import { DeleteResult } from "typeorm";


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

  async createProduct(productData: ProductInput): Promise<Product> {
    
    let categories: Category[] = [];
    if (productData.categories && productData.categories.length > 0) {
      const categoriesIds: number[] = productData.categories.map(cat => cat.id);
      categories = await this.categoryRepository.findByIds(categoriesIds);
      
      if (categories.length !== productData.categories.length) {
        throw new Error("Una o más categorías no fueron encontradas.");
      }
    }

    const newProduct = this.productRepository.create(productData);
    return newProduct;
  }


  async updateProduct(id: number, updateData: ProductUpdate): Promise<Product> {

    const categoriesIds : number[] = updateData.categories.map(cat => cat.id);

    if (categoriesIds && Array.isArray(categoriesIds) && categoriesIds.length > 0) {
      
      const categoriesToAssign = await this.categoryRepository.findByIds(categoriesIds);
      
      if (categoriesToAssign.length !== categoriesIds.length) {
        throw new Error("One or more categories sent were not found.");
      }
    }
    
    return this.productRepository.updateProduct(id, updateData);
  }

  async deleteProduct(id: number): Promise<void> {
    const result: DeleteResult = await this.productRepository.deleteProduct(id);

    if (result.affected === 0) {
      throw new Error(`Product with ID ${id} not found.`);
    }
  }
}