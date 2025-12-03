// src/controllers/productController.ts

import { Request, Response, NextFunction } from 'express'; // 1. Agregamos NextFunction
import { ProductService } from "../services";
import { ProductoInput, ProductoUpdate } from '../types'; 
import { AppError } from '../utils/AppError'; // 2. Importamos nuestra clase de error

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  // Agregamos 'next' aqui 👇
  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productos = await this.productService.findAllProducts();
      res.status(200).json(productos);
    } catch (error) {
      // En lugar de responder manual, pasamos el error al middleware
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.productoId);

      if (isNaN(id)) {
        // 3. Usamos AppError para errores de validación (400)
        return next(new AppError(
          'El ID proporcionado no es un número válido.',
          400,
          'INVALID_ID',
          'El parámetro productoId debe ser numérico'
        ));
      }

      const producto = await this.productService.findProductById(id);

      if (producto) {
        res.status(200).json(producto);
      } else {
        // 4. Usamos AppError para errores de "No encontrado" (404)
        return next(new AppError(
          'Producto no encontrado',
          404,
          'PRODUCT_NOT_FOUND',
          `No existe producto con ID ${id}`
        ));
      }
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input: ProductoInput = req.body; 

      // Validación gigante...
      if (
        !input.nombre ||
        !input.descripcion ||  
        input.precio === undefined || 
        input.stockDisponible === undefined || 
        input.pesoKg === undefined || 
        !input.dimensiones || 
        input.dimensiones.largoCm === undefined || 
        input.dimensiones.anchoCm === undefined || 
        input.dimensiones.altoCm === undefined || 
        !input.ubicacion ||
        !input.ubicacion.calle || 
        !input.ubicacion.ciudad || 
        !input.ubicacion.provincia ||
        !input.ubicacion.codigoPostal ||
        !input.ubicacion.pais
      ) {
        // Error de datos incompletos
        return next(new AppError(
            'Faltan campos requeridos.',
            400,
            'INVALID_DATA',
            'Asegúrate de enviar todos los campos del producto en español.'
        ));
      }
  
      const nuevoProducto = await this.productService.createProduct(input);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.productoId); 
    const updateData: ProductoUpdate = req.body;

    if (isNaN(id)) {
        return next(new AppError('ID de producto inválido en la URL.', 400, 'INVALID_ID'));
    }
  
    try {
      const productoActualizado = await this.productService.updateProduct(id, updateData);
      
      // Nota: Asumo que tu servicio lanza un error si no encuentra el producto.
      // Si tu servicio retorna null, deberías agregar un if(!productoActualizado) aquí.
      
      res.status(200).json(productoActualizado);

    } catch (error: any) {
      // Mantenemos tu lógica original de detectar "not found" en el mensaje del error
      // pero lo envolvemos en AppError para cumplir el formato
      if (error.message && error.message.includes("not found")) {
         return next(new AppError(error.message, 404, 'PRODUCT_NOT_FOUND'));
      }
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.productoId);

    if (isNaN(id)) {
        return next(new AppError('ID de producto inválido en la URL.', 400, 'INVALID_ID'));
    }
    
    try {
      await this.productService.deleteProduct(id);
      res.status(204).send(); 
    } catch (error: any) {
      if (error.message && error.message.includes("not found")) {
        return next(new AppError(error.message, 404, 'PRODUCT_NOT_FOUND'));
     }
      next(error);
    }
  }
}