import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../types";
import { getAllProducts, getProductByName } from "../services/productServices";

// Obtener todas las reservas
export const useProduct = () => 
  useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

// Obtener productos por nombre
export const useProductByName = (name: string) => 
  useQuery<IProduct[], Error>({
    queryKey: ["products", "byName", name], 
    
    queryFn: () => getProductByName(name), 
    staleTime: 1000 * 60 * 5,
    enabled: !!name, 
  });

