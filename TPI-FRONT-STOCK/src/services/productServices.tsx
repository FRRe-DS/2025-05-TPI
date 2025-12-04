import axios from "axios";
import { api } from "../client";
import type { IProduct, IProductInput } from "../types";

// --- GET (Lectura) ---

export async function getAllProducts(): Promise<IProduct[]> {
  try {
    const result = await api.get<IProduct[]>("/productos");
    if (!result) throw new Error("Products not found");
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error al obtener productos:", error.message);
    }
    throw error;
  }
}

export async function getFeaturedProducts(): Promise<IProduct[]> {
  try {
    const result = await api.get<IProduct[]>("/productos/feature/", { params: { is_featured: true } });
    if (!result) throw new Error("Products not found");
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error("Error Axios:", error.message);
    throw error;
  }
}

export async function getProductById(id: number): Promise<IProduct> {
  try {
    const result = await api.get<IProduct>(`/productos/${id}`);
    if (!result) throw new Error("Product not found");
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error("Error Axios:", error.message);
    throw error;
  }
}

export async function getProductByName(name: string): Promise<IProduct[]> {
  try {
    const result = await api.get<IProduct[]>(`/productos/name/${name}`);
    if (!result) throw new Error("Product not found");
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error("Error Axios:", error.message);
    throw error;
  }
}

// --- CREATE (Crear) ---

export async function createProduct(productData: IProductInput): Promise<IProduct> {
  try {
    const categoriaId = productData.categorias?.[0] ? Number(productData.categorias[0]) : null;

    const payload = {
      nombre: productData.nombre,
      precio: Number(productData.precio),
      stockDisponible: Number(productData.stock),
      descripcion: productData.descripcion,
      pesoKg: Number(productData.pesoKg),
      
      dimensiones: {
        altoCm: Number(productData.dimensiones?.altoCm),
        anchoCm: Number(productData.dimensiones?.anchoCm),
        largoCm: Number(productData.dimensiones?.largoCm),
      },
  
      ubicacion: productData.ubicacion,

      categorias: categoriaId ? [{ id: categoriaId }] : [],
      categoria_id: categoriaId
    };

    console.log("Payload Crear:", payload);
    const result = await api.post<IProduct>("/productos", payload);
    return result.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error Backend (Crear):", error.response?.data);
      throw new Error(error.response?.data?.message || "Error al crear");
    }
    throw error;
  }
}

// --- UPDATE (Actualizar) ---

export async function updateProduct(id: number, productData: IProductInput): Promise<IProduct> {
  try {
    // Construir el payload exactamente igual que en createProduct
    const categoriaId = productData.categorias?.[0] ? Number(productData.categorias[0]) : null;

    const payload = {
      nombre: productData.nombre,
      precio: Number(productData.precio),
      stockDisponible: Number(productData.stock),
      descripcion: productData.descripcion,
      pesoKg: Number(productData.pesoKg),
      
      dimensiones: {
        altoCm: Number(productData.dimensiones?.altoCm),
        anchoCm: Number(productData.dimensiones?.anchoCm),
        largoCm: Number(productData.dimensiones?.largoCm),
      },
  
      ubicacion: productData.ubicacion,

      categorias: categoriaId ? [{ id: categoriaId }] : [],
      categoria_id: categoriaId
    };

    console.log("Payload Actualizar:", payload);
    
    // IMPORTANTE: Usa PATCH o PUT según lo que espere tu backend
    const result = await api.patch<IProduct>(`/productos/${id}`, payload);
    return result.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error Backend (Actualizar):", error.response?.data);
      throw new Error(error.response?.data?.message || "Error al actualizar producto");
    }
    throw error;
  }
}