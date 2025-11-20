// src/repositories/CategoryRepository.ts

import { Repository, FindOptionsWhere, In } from 'typeorm';
import { Category } from '../models/entities';
import { AppDataSource } from '../config/appDataSource';
import { CategoriaInput } from '../types';

export class CategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  findByName(nombre: string): Promise<Category | null> { 
    return this.repository.findOne({ 
      where: { nombre } 
    });
  }

  create(categoryData: CategoriaInput): Promise<Category> { 
    const newCategory = this.repository.create(categoryData);
    return this.repository.save(newCategory);
  }

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }
  
  delete(id: number) {
    return this.repository.delete(id);
  }

  findByIds(ids: number[]): Promise<Category[]> {
    return this.repository.findBy({
      id: In(ids)
    });
  }
}