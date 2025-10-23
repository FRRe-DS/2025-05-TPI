// src/controllers/productController.ts

import { Request, Response } from 'express';
import { ProductService } from "../services"; //
import { ProductInput, ProductUpdate } from '../types';

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
      const id = Number(req.params.productoId);

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
    const updateData: ProductInput = req.body;

    if (
      !updateData.name ||
      !updateData.description || 
      updateData.unitPrice === undefined || 
      updateData.availableStock === undefined || 
      updateData.weightKg === undefined || 
      !updateData.dimensions || 
      updateData.dimensions.lengthCm === undefined || 
      updateData.dimensions.widthCm === undefined || 
      updateData.dimensions.heightCm === undefined || 
      !updateData.location ||
      updateData.location.warehouseId === undefined || 
      !updateData.location.aisle || 
      !updateData.location.shelf ||
      updateData.location.level === undefined
    ) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos. Asegúrate de enviar todos los campos del producto, incluyendo los valores para dimensions y location.' 
      });
    }
  
    try {
      const nuevoProducto = await this.productService.createProduct(updateData);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      console.error("Detalle del error al crear producto:", error); 
      res.status(500).json({ message: "Error al crear el producto", error: errorMessage });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.productoId);
    const updateData: ProductUpdate = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID de producto inválido en la URL.' });
    }
    if (
      !updateData.name ||
      !updateData.description || 
      updateData.unitPrice === undefined || 
      updateData.availableStock === undefined || 
      updateData.weightKg === undefined || 
      !updateData.dimensions || 
      updateData.dimensions.lengthCm === undefined || 
      updateData.dimensions.widthCm === undefined || 
      updateData.dimensions.heightCm === undefined || 
      !updateData.location ||
      updateData.location.warehouseId === undefined || 
      !updateData.location.aisle || 
      !updateData.location.shelf ||
      updateData.location.level === undefined
    ) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos. Asegúrate de enviar todos los campos del producto, incluyendo los valores para dimensions y location.' 
      });
    }
    
    try {
      const productoActualizado = await this.productService.updateProduct(id, updateData);
      res.status(200).json(productoActualizado);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      console.error(`Detalle del error al actualizar producto ID ${id}:`, error); 
    
      const statusCode = errorMessage.includes("not found") ? 404 : 500;

      res.status(statusCode).json({ 
        message: "Error al actualizar el producto", 
        error: errorMessage 
      });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.productoId);

    if (isNaN(id)) {
      res.status(400).json({ message: 'ID de producto inválido en la URL.' });
      return;
    }
    
    try {
      await this.productService.deleteProduct(id);
      res.status(200).json({ message: 'Producto eliminado.' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      console.error(`Detalle del error al eliminar producto ID ${id}:`, error); 
    
      const statusCode = errorMessage.includes("not found") ? 404 : 500;

      res.status(statusCode).json({ 
        message: "Error al eliminar el producto", 
        error: errorMessage 
      });
    }
  }
}