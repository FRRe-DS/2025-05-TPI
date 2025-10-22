import { useQuery } from "@tanstack/react-query";

import type { IProduct } from "../types";
import { getProducts } from "../services/productService";

const PRODUCTS_QUERY_KEY = ["products"];

export function useProducts() {
  return useQuery<IProduct[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getProducts,
    staleTime: 1000 * 60,
  });
}
