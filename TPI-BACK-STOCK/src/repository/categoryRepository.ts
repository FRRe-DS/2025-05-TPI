// src/repositories/CategoryRepository.ts

import { Repository, In } from "typeorm";
import { AppDataSource } from "../config/appDataSource";
import { Category } from "../models/entities/Category.entity"; // Asumo esta ruta

export class CategoryRepository {
  
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  /**
   * Busca categorías por un array de IDs.
   * @param ids Array de IDs de categorías a buscar.
   */
  async findByIds(ids: number[]): Promise<Category[]> {
    return this.repository.findBy({
      id: In(ids)
    });
  }
}