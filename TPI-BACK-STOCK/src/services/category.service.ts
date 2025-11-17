// src/services/CategoryService.ts

import { Category } from '../models/entities';
import { CategoryRepository } from '../repository'; 
import { CategoriaInput } from '../types';

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(categoryData: CategoriaInput): Promise<Category> {
    if (typeof categoryData.nombre !== "string" || categoryData.nombre.trim().length < 2) {
      throw new Error("VALIDATION_ERROR: El nombre es requerido (min 2 caracteres).");
    }
    
    const existe = await this.categoryRepository.findByName(categoryData.nombre.trim());
    if (existe) {
      throw new Error("CONFLICT_ERROR: La categoría ya existe.");
    }
    
    return this.categoryRepository.create(categoryData);
  }

  async listCategories(): Promise<Category[]> {
    try {
      return this.categoryRepository.findAll();
    } catch (error) {
      throw new Error(`DB_ERROR: Error al listar categorías: ${(error as Error).message}`);
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      if (error instanceof Error && error.message.includes("NOT_FOUND")) {
        throw new Error(`NOT_FOUND: Categoría con ID ${id} no encontrada.`);
      }
      throw new Error(`DB_ERROR: Error al eliminar categoría: ${(error as Error).message}`);
    }
  }
}