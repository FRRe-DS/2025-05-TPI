import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategoryById
} from "../services/category.service";
import type { ICategory } from "../types";

// Obtener todas las reservas
export const useCategories = () => 
  useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

// Obtener una reserva por ID
export const useCateICategoryById = (id: number, enabled = true) => 
  useQuery<ICategory, Error>({
    queryKey: ["Category", id],
    queryFn: () => getCategoryById(id),
    enabled: enabled && id > 0,
  });

