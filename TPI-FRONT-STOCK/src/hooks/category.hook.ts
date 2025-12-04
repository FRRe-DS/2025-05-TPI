import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} from "../services/category.service";
import type { ICategory } from "../types";

// Obtener todas las categorias
export const useCategories = () => 
  useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

// Obtener una categoria por ID
export const useCateICategoryById = (id: number, enabled = true) => 
  useQuery<ICategory, Error>({
    queryKey: ["Category", id],
    queryFn: () => getCategoryById(id),
    enabled: enabled && id > 0,
  });

// Crear categoria
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Eliminar categoria
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

