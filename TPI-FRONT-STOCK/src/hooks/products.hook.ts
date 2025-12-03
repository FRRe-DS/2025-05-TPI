import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "../types";
import { getAllProducts, getProductByName, createProduct, updateProduct } from "../services/productServices";

export const useProduct = () => {
  const queryClient = useQueryClient();

  // 1. GET
  const query = useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // 2. CREATE
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 3. UPDATE (Asegúrate de tener este bloque)
  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; data: any }) => updateProduct(vars.id, vars.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    
    // TIENES QUE EXPORTAR ESTO PARA QUE FUNCIONE:
    updateProduct: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};

export const useProductByName = (name: string) => 
  useQuery<IProduct[], Error>({
    queryKey: ["products", "byName", name], 
    queryFn: () => getProductByName(name), 
    staleTime: 1000 * 60 * 5,
    enabled: !!name, 
  });