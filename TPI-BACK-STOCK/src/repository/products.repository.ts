import { DeleteResult, EntityManager, In, Repository } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Category, Product } from "../models";
import { ProductInput, ProductUpdate } from "../types";

export class ProductRepository{
  
  private repository: Repository<Product>;
    
  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect(
        "product.images",
        "image",
        "image.isMain = :isRep", 
        { isRep: true }
      )
      .leftJoinAndSelect("product.categories", "category") 
      .getMany();
  }
  
  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        categories: true,
        images: true,
        dimensions: true,
        location: true,
      }
    });
  }

  async create(productData: ProductInput): Promise<Product> {
    const newProduct = this.repository.create(productData);
    return this.repository.save(newProduct)
  }

  async updateProduct(id: number, updateData: ProductUpdate): Promise<Product> {
      
    const productToUpdate = await this.repository.findOne({
      where: { id },
      relations: ['categories'] 
    });

    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found.`);
    }
   
    Object.assign(productToUpdate, updateData); 
    
    return this.repository.save(productToUpdate);
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}

