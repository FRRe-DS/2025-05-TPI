import { api } from "../client/axios";
import type { IProduct, IProductInput, IProductUpdate, ICreatedProduct } from "../types/product.interface";

class ProductServiceClass {
  async getAll(): Promise<IProduct[]> {
    try {
      return (await api.get<IProduct[]>("/products")).data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<IProduct> {
    try {
      return (await api.get<IProduct>(`/products/${id}`)).data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async getByCategory(categoryId: number): Promise<IProduct[]> {
    try {
      return (await api.get<IProduct[]>("/products", { params: { categoryId } })).data;
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  }

  async search(name: string): Promise<IProduct[]> {
    try {
      return (await api.get<IProduct[]>("/products/search", { params: { name } })).data;
    } catch (error) {
      console.error(`Error searching products:`, error);
      throw error;
    }
  }

  async create(product: IProductInput): Promise<ICreatedProduct> {
    try {
      return (await api.post<ICreatedProduct>("/products", product)).data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async update(id: number, product: IProductUpdate): Promise<IProduct> {
    try {
      return (await api.put<IProduct>(`/products/${id}`, product)).data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
}

export const productService = new ProductServiceClass();