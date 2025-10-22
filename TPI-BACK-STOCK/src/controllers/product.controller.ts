// src/controllers/productController.ts

import { Request, Response } from 'express';
import { ProductService, CreateProductDTO } from "../services/product.service"; //

export class ProductController {
  
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const productos = await this.productService.findAllProducts();
      res.status(200).json(productos);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ message: "Error al obtener los productos", error: errorMessage });
    }
  };

  getProductById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      // Validar si el ID es un número válido
      if (isNaN(id)) {
        res.status(400).json({ message: 'El ID proporcionado no es un número válido.' });
        return;
      }

      const producto = await this.productService.findProductById(id);

      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ message: "Error al obtener el producto", error: errorMessage });
    }
  };

  
  createProduct = async (req: Request, res: Response) => {
    const productData: CreateProductDTO = req.body;

    if (
      !productData.name ||
      !productData.description || 
      productData.unitPrice === undefined || 
      productData.availableStock === undefined || 
      productData.weightKg === undefined || 
      !productData.dimensions || 
      !productData.location 
    ) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos. Asegúrate de enviar name, description, unitPrice, availableStock, weightKg, dimensions y location.' 
      });
    }
  
    try {
      const nuevoProducto = await this.productService.createProduct(productData);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      console.error("Detalle del error al crear producto:", error); 
      res.status(500).json({ message: "Error al crear el producto", error: errorMessage });
    }
  };
}