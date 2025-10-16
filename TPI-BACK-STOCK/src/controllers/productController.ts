import type { Request, Response } from 'express';
import { ProductService } from "../services/productServices";

const productServices = new ProductService();


export const getAllProductos = async (req: Request, res: Response) => {
  const productos = await productServices.findAllProducts();
  res.status(200).json(productos);
};

export const getProductosById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const producto = await productServices.findProductById(id)

  if(producto){
    res.status(200).json({producto})
  } else {
    res.status(404).json({message: 'Producto no encontrado'});
  };
};

export const createProducto = async (req: Request, res: Response) => {
  const { name, description, price, availableStock, categoryIds } = req.body;

  if (
    !name ||
    !description ||
    price === undefined ||
    availableStock === undefined
  ) {
    return res.status(400).json({ 
      message: 'Faltan campos requeridos. Asegúrate de enviar name, description, price y stock.' 
    });
  
  }
  try {
    const nuevoProducto = await productServices.createProduct({ name, description, price, availableStock, categoryIds });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ message: "Error al crear el producto", error: errorMessage });
  }
};