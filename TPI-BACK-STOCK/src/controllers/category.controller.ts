// src/controllers/CategoryController.ts

import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service'; 
import { CategoriaInput } from '../types/categories'; // Importar la interfaz en español

export class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input: CategoriaInput = req.body; // Usar la interfaz en español
      
      if (!input.nombre) {
        res.status(400).json({ message: "El campo 'nombre' es requerido." });
        return;
      }
      
      const newCategory = await this.categoryService.createCategory(input);
      
      res.status(201).json(newCategory);
    } catch (error) {
      next(error); 
    }
  }

  public listCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories = await this.categoryService.listCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error); 
    }
  }

  public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.categoriaId, 10); // Cambiado a categoriaId
      
      if (isNaN(id)) {
        res.status(400).json({ message: "El ID de la categoría debe ser numérico." });
        return;
      }

      await this.categoryService.deleteCategory(id);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}