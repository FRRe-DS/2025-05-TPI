import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { IProduct, IProductInput, IProductUpdate } from "../types/product.interface";

export const useProducts = () => 
  useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });

export const useProductById = (id: number, enabled = true) =>
  useQuery<IProduct, Error>({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: enabled && id > 0,
  });

export const useProductsByCategory = (categoryId: number, enabled = true) =>
  useQuery<IProduct[], Error>({
    queryKey: ["products", "category", categoryId],
    queryFn: () => productService.getByCategory(categoryId),
    enabled: enabled && categoryId > 0,
  });

export const useSearchProducts = (name: string, enabled = true) =>
  useQuery<IProduct[], Error>({
    queryKey: ["products", "search", name],
    queryFn: () => productService.search(name),
    enabled: enabled && name.length > 0,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: IProductInput) => productService.create(product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    onError: (error: Error) => console.error("Error al crear producto:", error),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: IProductUpdate }) => 
      productService.update(id, product),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => console.error("Error al actualizar:", error),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    onError: (error: Error) => console.error("Error al eliminar:", error),
  });
};