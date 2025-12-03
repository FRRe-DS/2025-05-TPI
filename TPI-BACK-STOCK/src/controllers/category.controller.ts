// src/controllers/CategoryController.ts

import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service'; 
import { CategoriaInput } from '../types/categories'; 
import { AppError } from '../utils/AppError'; // <--- 1. Importamos esto

export class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input: CategoriaInput = req.body; 
      
      if (!input.nombre) {
        // 2. Reemplazamos el res.status(400) por AppError
        return next(new AppError("El campo 'nombre' es requerido.", 400, "INVALID_DATA", "Debes enviar un nombre para la categoría"));
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
      const id = parseInt(req.params.id, 10); 
      
      if (isNaN(id)) {
         // 3. Validación de ID inválido
         return next(new AppError("El ID de la categoría debe ser numérico.", 400, "INVALID_ID"));
      }

      await this.categoryService.deleteCategory(id);
      
      res.status(204).send();
    } catch (error: any) {
      // 4. Pequeña mejora: si el error dice "not found", devolvemos 404
      if (error.message && error.message.includes("not found")) {
         return next(new AppError(error.message, 404, 'CATEGORY_NOT_FOUND'));
      }
      next(error);
    }
  }
}