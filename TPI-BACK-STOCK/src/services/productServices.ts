import { In, Repository } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Product } from "../models/Product.entity";
import { Category } from "../models/Category.entity";

export type CreateProductDTO = {
  name: string;
  price: number;
  description?: string;
  availableStock?: number;
  categoryIds?: number[]; 
};

export class ProductService {
  
  private productRepository: Repository<Product>;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  /**
   * Busca y devuelve todos los productos, incluyendo sus categorías asociadas.
   */
  async findAllProducts(): Promise<Product[]> {
    // Usamos la opción 'relations' para que TypeORM traiga también las categorías.
    return this.productRepository.find({
      relations: ['categories']
    });
  }

  /**
   * Busca un producto por su ID, incluyendo sus categorías.
   * @param id El ID del producto a buscar.
   */
  async findProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id: id },
      relations: ['categories']
    });
  }

  /**
   * Crea un nuevo producto y lo asocia con las categorías especificadas.
   * @param productData Los datos para crear el nuevo producto.
   */
  async createProduct(productData: CreateProductDTO): Promise<Product> {
    
    // 1. Crear la instancia del producto con los datos básicos
    const newProduct = this.productRepository.create({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      availableStock: productData.availableStock || 0,
    });

    // 2. Manejar la relación con Categorías
    if (productData.categoryIds && productData.categoryIds.length > 0) {
      const categories = await this.categoryRepository.findBy({
        id: In(productData.categoryIds)
      });
      // Si no se encuentran todas las categorías, lanzar un error
      if (categories.length !== productData.categoryIds.length) {
          throw new Error("Una o más categorías no fueron encontradas.");
      }
      // Asignamos las entidades de categoría encontradas al nuevo producto
      newProduct.categories = categories;
    }

    // 3. Guardar el nuevo producto con sus relaciones en la base de datos
    await this.productRepository.save(newProduct);
    
    return newProduct;
  }
}