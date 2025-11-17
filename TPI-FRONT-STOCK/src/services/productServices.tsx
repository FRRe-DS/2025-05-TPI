import axios from "axios";
import { api } from "../client";
import type { ICreateProduct, IProduct } from "../types";

export async function createProduct(data: ICreateProduct): Promise<IProduct> {
  try{
    const result = await api.post("/product", data)

    if(!result){
      throw new Error('Visitor not found')
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