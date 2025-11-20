import type { ICategory } from "../types";
import axios from "axios";
import { api } from "../client"


export async function getAllCategories(): Promise<ICategory[]> {
  try{
    const result = await api.get<ICategory[]>("/categories")

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
    const result = await api.get(`/categories/${id}`)
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
