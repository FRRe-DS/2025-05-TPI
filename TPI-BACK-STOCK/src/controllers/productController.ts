import type { Request, Response } from "express";
import { ProductService } from "../services/productServices.js";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getAllProducts = (req: Request, res: Response): void => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.q as string | undefined;
      const categoryId = req.query.categoriaId ? parseInt(req.query.categoriaId as string) : undefined;

      const result = this.productService.getAllProducts(page, limit, search, categoryId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error al obtener productos' 
      });
    }
  };

  getProductById = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.productoId);
      const product = this.productService.getProductById(id);

      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error al obtener producto' 
      });
    }
  };

  createProduct = (req: Request, res: Response): void => {
    try {
      const newProduct = this.productService.createProduct(req.body);
      res.status(201).json({ id: newProduct.id, mensaje: 'Producto creado exitosamente' });
    } catch (error) {
      res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Error al crear producto' 
      });
    }
  };

  updateProduct = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.productoId);
      const updatedProduct = this.productService.updateProduct(id, req.body);

      if (!updatedProduct) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Error al actualizar producto' 
      });
    }
  };

  deleteProduct = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.productoId);
      const deleted = this.productService.deleteProduct(id);

      if (!deleted) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error al eliminar producto' 
      });
    }
  };
}