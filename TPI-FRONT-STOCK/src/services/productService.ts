import { apiClient } from "../client/apiClient";
import type { IProduct } from "../types/product.interface";

export interface ProductFilters {
  page?: number;
  limit?: number;
  q?: string;
  categoriaId?: number;
}

const buildQueryString = (filters: ProductFilters = {}) => {
  const searchParams = new URLSearchParams();

  if (filters.page) searchParams.set("page", String(filters.page));
  if (filters.limit) searchParams.set("limit", String(filters.limit));
  if (filters.q) searchParams.set("q", filters.q);
  if (filters.categoriaId)
    searchParams.set("categoriaId", String(filters.categoriaId));

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const fetchProducts = async (filters?: ProductFilters) =>
  apiClient.get<IProduct[]>(`/productos${buildQueryString(filters)}`);
