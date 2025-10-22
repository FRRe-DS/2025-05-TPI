// src/repositories/CategoryRepository.ts

import { Repository, FindOptionsWhere, In } from 'typeorm';
import { Category } from '../models/entities'; // Asume que tienes una entidad Category
import { AppDataSource } from '../config/appDataSource';

export class CategoryRepository {

  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  findByName(name: string): Promise<Category | null> {
    return this.repository.findOne({ 
      where: { name } 
    });
  }

  create(name: string): Promise<Category> {
    const newCategory = this.repository.create({ name: name.trim() });
    return this.repository.save(newCategory);
  }


  findAll(): Promise<Category[]> {
    return this.repository.find();
  }
  
  delete(id: number) {
    return this.repository.delete(id);
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    return this.repository.findBy({
      id: In(ids)
    });
  }
}