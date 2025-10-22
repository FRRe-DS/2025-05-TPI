import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import type { IProduct } from "../types";
import { useProducts } from "../hooks/product.hook";

interface ProductContextValue {
  products: IProduct[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

export function ProductProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError, refetch } = useProducts();

  return (
    <ProductContext.Provider
      value={{
        products: data ?? [],
        isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }

  return context;
}
