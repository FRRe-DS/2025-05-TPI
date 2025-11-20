// src/services/productServices.ts

import { ProductRepository } from "../repository/products.repository";
import { CategoryRepository } from "../repository/category.repository";
import { Product, Category } from "../models";
import { ProductoInput, ProductoUpdate } from "../types";
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

  async createProduct(productData: ProductoInput): Promise<Product> {
    let categories: Category[] = [];
    
    // Ahora usa categoriaIds en lugar de categories
    if (productData.categoriaIds && productData.categoriaIds.length > 0) {
      categories = await this.categoryRepository.findByIds(productData.categoriaIds);
      
      if (categories.length !== productData.categoriaIds.length) {
        throw new Error("Una o más categorías no fueron encontradas.");
      }
    }

    const newProduct = await this.productRepository.create(productData);
    return newProduct;
  }

  async updateProduct(id: number, updateData: ProductoUpdate): Promise<Product> {
    let categories: Category[] = [];
    
    // Manejar categoriaIds si están presentes
    if (updateData.categoriaIds && updateData.categoriaIds.length > 0) {
      categories = await this.categoryRepository.findByIds(updateData.categoriaIds);
      
      if (categories.length !== updateData.categoriaIds.length) {
        throw new Error("Una o más categorías no fueron encontradas.");
      }
    }
    
    return this.productRepository.updateProduct(id, updateData);
  }

  async deleteProduct(id: number): Promise<void> {
    const result: DeleteResult = await this.productRepository.deleteProduct(id);

    if (result.affected === 0) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
  }
}