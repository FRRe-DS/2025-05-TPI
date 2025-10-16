import { useCallback, useEffect, useState } from "react";
import { fetchProducts, type ProductFilters } from "../services/productService";
import type { IProduct } from "../types/product.interface";

interface UseProductsResult {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const useProducts = (filters?: ProductFilters): UseProductsResult => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts(filters);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    products,
    loading,
    error,
    reload: load,
  };
};
