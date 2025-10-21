// src/services/productServices.ts

import { ProductRepository } from "../repository/productsRepository";
import { CategoryRepository } from "../repository/categoryRepository";
import { Product } from "../models/entities/Product.entity";
import { Category } from "../models/entities/Category.entity";

// Asumo que estos embeddables están en esta ruta
import { Dimension } from "../models/embeddable/dimension";
import { WarehouseLocation } from "../models/embeddable/warehouseLocation";

/**
 * Define la estructura de datos para crear un producto.
 * (Alineado con Product.entity.ts)
 */
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

  /**
   * Inyección de Dependencias:
   * El servicio recibe los repositorios que necesita para trabajar.
   * Ya no importa 'AppDataSource'.
   */
  constructor(productRepo: ProductRepository, categoryRepo: CategoryRepository) {
    this.productRepository = productRepo;
    this.categoryRepository = categoryRepo;
  }

  /**
   * Llama al repositorio para buscar todos los productos.
   */
  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.findAllProducts();
  }

  /**   
   * Llama al repositorio para buscar un producto por ID.
  */
  async findProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

     


  /**
   * Orquesta la lógica de negocio para crear un nuevo producto.
   * @param productData Los datos para crear el nuevo producto.
   */
  async createProduct(productData: CreateProductDTO): Promise<Product> {
    
    // 1. Lógica de Negocio: Validar Categorías
    let categories: Category[] = [];
    if (productData.categoryIds && productData.categoryIds.length > 0) {
      // El servicio usa el CategoryRepository para buscar las categorías
      categories = await this.categoryRepository.findByIds(productData.categoryIds);
      
      // Lógica de negocio: asegurarse de que todas las categorías solicitadas existan
      if (categories.length !== productData.categoryIds.length) {
          throw new Error("Una o más categorías no fueron encontradas.");
      }
    }

    // 2. Llama al ProductRepository para preparar la entidad
    const newProduct = this.productRepository.create({
      name: productData.name,
      description: productData.description,
      unitPrice: productData.unitPrice,
      availableStock: productData.availableStock || 0,
      weightKg: productData.weightKg || 0,
      dimensions: productData.dimensions,
      location: productData.location
    });

    // 3. Asigna las relaciones validadas
    newProduct.categories = categories;

    // 4. Llama al ProductRepository para guardar la entidad final
    await this.productRepository.save(newProduct);
    
    return newProduct;
  }
}