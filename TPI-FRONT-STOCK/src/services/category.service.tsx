import type { ICategory } from "../types";
import axios from "axios";
import { api } from "../client"


export async function getAllCategories(): Promise<ICategory[]> {
  try{
    const result = await api.get<ICategory[]>("/categorias")

    if(!result){
      throw new Error('Categories not found')
    }
    
    return result.data ;
  } catch (error) {
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

export async function getCategoryById(id:number):Promise<ICategory>{
  try{
    const result = await api.get(`/categorias/${id}`)
    if (!result){
      throw new Error ('Category not found')
    }
    return result.data;
  }catch(error){
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

export async function createCategory(data: { nombre: string; descripcion?: string | null }) {
  try {
    const payload = { nombre: data.nombre, descripcion: data.descripcion ?? null };
    const result = await api.post<ICategory>("/categorias", payload);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creando categoria:", error.response?.data || error.message);
    }
    throw error;
  }
}

export async function deleteCategory(id: number) {
  try {
    await api.delete(`/categorias/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error eliminando categoria:", error.response?.data || error.message);
    }
    throw error;
  }
}
