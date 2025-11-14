import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../services/productServices";
import type { ICreateProduct, IProduct } from "../types";

export function useCreateProduct() {
  return useMutation<IProduct, Error, ICreateProduct>({
    mutationFn: (data: ICreateProduct) => createProduct(data),
  })
}