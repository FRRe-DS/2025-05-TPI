import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Product } from "../models";

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

  create(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.repository.create({
      name: productData.name,
      description: productData.description,
      unitPrice: productData.unitPrice,
      availableStock: productData.availableStock || 0,
      weightKg: productData.weightKg || 0,
      dimensions: productData.dimensions,
      location: productData.location
    });

    return this.repository.save(newProduct)
  }

}

