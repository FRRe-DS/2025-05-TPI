import { DeleteResult, EntityManager, In, Repository } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Category, Product } from "../models";
import { ProductoInput, ProductoUpdate } from "../types"; // Cambiado los imports

export class ProductRepository {
  private repository: Repository<Product>;
    
  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect(
        "product.imagenes", // Cambiado images a imagenes
        "image",
        "image.esPrincipal = :esRep", // Cambiado isMain a esPrincipal
        { esRep: true }
      )
      .leftJoinAndSelect("product.categorias", "category") // Cambiado categories a categorias
      .getMany();
  }
  
  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        categorias: true, // Cambiado categories a categorias
        imagenes: true,   // Cambiado images a imagenes
        dimensiones: true,
        ubicacion: true,
      }
    });
  }

  async create(productData: ProductoInput): Promise<Product> { // Cambiado ProductInput a ProductoInput
    const newProduct = this.repository.create(productData);
    return this.repository.save(newProduct);
  }

  async updateProduct(id: number, updateData: ProductoUpdate): Promise<Product> { // Cambiado ProductUpdate a ProductoUpdate
    const productToUpdate = await this.repository.findOne({
      where: { id },
      relations: ['categorias'] // Cambiado categories a categorias
    });

    if (!productToUpdate) {
      throw new Error(`Producto con ID ${id} no encontrado.`); // Mensaje en español
    }
   
    Object.assign(productToUpdate, updateData); 
    
    return this.repository.save(productToUpdate);
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}