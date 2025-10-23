import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Product } from "../models";

export class ProductRepository{
  
  private repository: Repository<Product>;
    
  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product);
  }

  async findAllProducts() {
    return this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect(
        "product.images",
        "image",
        "image.isMain = :isRep",
        { isRep: true }
      )
      .where("product.isActive = :active", { active: true })
      .getMany();
  }

}