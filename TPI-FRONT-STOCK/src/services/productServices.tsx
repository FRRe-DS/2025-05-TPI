import axios from "axios";
import { api } from "../client";
import type { IProduct } from "../types";

export async function getAllProducts():Promise<IProduct[]>{
  try{
    // CAMBIO: /products -> /productos
    const result = await api.get<IProduct[]>("/productos")

    if (!result) {
      throw new Error ("Products not found")
    }
    return result.data

  } catch (error){
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("La petición tardó demasiado (timeout).");
      } else {
        console.error("Error de Axios:", error.message);
      }
    }

    throw error;
  }
}

export async function getFeaturedProducts():Promise<IProduct[]>{
  try {
    // CAMBIO: /products -> /productos
    const result = await api.get<IProduct[]>("/productos/feature/", { params: {is_featured: true}})

    if (!result){
      throw new Error ("Products not found")
    }

    return result.data;
  } catch (error){
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("La petición tardó demasiado (timeout).");
      } else {
        console.error("Error de Axios:", error.message);
      }
    }

    throw error;
  }
}

export async function getProductById(id:number):Promise<IProduct>{
 try {
    // CAMBIO: /products -> /productos
    const result = await api.get<IProduct>(`/productos/${id}`)

    if (!result){
      throw new Error ("Product not found")
    }
    return result.data; 
  } catch (error){
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("La petición tardó demasiado (timeout).");
      } else {
        console.error("Error de Axios:", error.message);
      }
    }

    throw error;
  }
}

export async function getProductByName(name: string):Promise<IProduct[]>{
 try {
    // CAMBIO: /products -> /productos
    const result = await api.get<IProduct[]>(`/productos/name/${name}`)

    if (!result){
      throw new Error ("Product not found")
    }
    return result.data; 
  } catch (error){
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("La petición tardó demasiado (timeout).");
      } else {
        console.error("Error de Axios:", error.message);
      }
    }

    throw error;
  }
}