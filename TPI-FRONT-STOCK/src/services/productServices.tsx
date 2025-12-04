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

export async function createProduct(productData: any): Promise<IProduct> {
  try {
    const categoriaId = productData.categoryIds?.[0] ? Number(productData.categoryIds[0]) : null;

    const payload = {
      nombre: productData.nombre,
      precio: Number(productData.precio),
      stockDisponible: Number(productData.stock),
      descripcion: productData.descripcion,
      pesoKg: Number(productData.weightKg),
      
      dimensiones: {
        altoCm: Number(productData.dimensions?.heightCm),
        anchoCm: Number(productData.dimensions?.widthCm),
        largoCm: Number(productData.dimensions?.lengthCm),
      },
      
      ubicacion: productData.location,
      
      // Enviamos el objeto con ID para crear la relación
      categorias: categoriaId ? [{ id: categoriaId }] : [],
      // Enviamos también el campo simple por compatibilidad
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

export async function updateProduct(id: number, productData: any): Promise<IProduct> {
  try {
    // 1. Sanitización de datos
    const pesoFinal = productData.pesoKg ?? productData.weightKg;
    const stockFinal = productData.stockDisponible ?? productData.stock;
    
    // 2. ID de Categoría
    const categoriaId = productData.categoryIds?.[0] ? Number(productData.categoryIds[0]) : null;

    // 3. Payload
    const payload = {
      nombre: productData.nombre,
      precio: Number(productData.precio),
      descripcion: productData.descripcion,
      stockDisponible: Number(stockFinal),
      pesoKg: pesoFinal ? Number(pesoFinal) : 0, 
      
      dimensiones: {
        altoCm: Number(productData.dimensiones?.altoCm || productData.dimensions?.heightCm || 0),
        anchoCm: Number(productData.dimensiones?.anchoCm || productData.dimensions?.widthCm || 0),
        largoCm: Number(productData.dimensiones?.largoCm || productData.dimensions?.lengthCm || 0),
      },
      
      ubicacion: {
          calle: productData.ubicacion?.calle || productData.location?.calle || "",
          ciudad: productData.ubicacion?.ciudad || productData.location?.ciudad || "",
          provincia: productData.ubicacion?.provincia || productData.location?.provincia || "",
          codigoPostal: productData.ubicacion?.codigoPostal || productData.location?.codigoPostal || "",
          pais: productData.ubicacion?.pais || productData.location?.pais || ""
      },
      
      // --- SOLUCIÓN DE CATEGORÍAS ---
      categorias: categoriaId ? [{ id: categoriaId }] : [],
      
      categoria_id: categoriaId 
    };

    console.log("Payload Actualizar:", payload);

    const result = await api.patch<IProduct>(`/productos/${id}`, payload);
    
    if (!result) throw new Error("Error updating product");

    return result.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Error Backend (Update):", error.response?.data);
    }
    throw error;
  }
}