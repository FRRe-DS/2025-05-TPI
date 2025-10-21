// src/controllers/CategoryController.ts

import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service'; 

export class CategoryController {

    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { nombre } = req.body ?? {};
        
        const newCategory = await this.categoryService.createCategory(nombre);
        
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
          throw new Error("VALIDATION_ERROR: El ID de la categoría debe ser numérico.");
        }

        await this.categoryService.deleteCategory(id);
        
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
}