import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Product } from "../models";

export class ProductRepository{
  
  private repository: Repository<Product>;
    
  constructor(manager?: EntityManager) {
    this.repository = manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product);
  }


/**
* Busca y devuelve todos los productos, incluyendo su imagen principal y categorías.
*/
  async findAllProducts(): Promise<Product[]> {
    return this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect(
        "product.images",
        "image",
        // Mantenemos esta condición porque 'isMain' SÍ existe en ProductImage
        "image.isMain = :isRep", //
        { isRep: true }
      )
      .leftJoinAndSelect("product.categories", "category") 
      .getMany();
  }
  

/**
   * Busca un producto por su ID, incluyendo todas sus relaciones detalladas.
   * @param id El ID del producto a buscar.
   */
  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: { id: id },
      // Aquí sí cargamos todas las relaciones porque es la vista detallada
      relations: {
        categories: true,
        images: true,
        dimensions: true,
        location: true,
        // reservationItems: true // Descomenta si necesitas cargar esto también
      }
    });
  }

/**
   * @param productData 
   */
  create(productData: Partial<Product>): Product {
    return this.repository.create({
      name: productData.name,
      description: productData.description,
      unitPrice: productData.unitPrice,
      availableStock: productData.availableStock || 0,
      weightKg: productData.weightKg || 0,
      dimensions: productData.dimensions,
      location: productData.location
    });
  }

  /**
   * Guarda una entidad de producto en la base de datos.
   * @param product La entidad Product a guardar.
   */
  async save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

}

