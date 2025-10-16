import { productsData } from '../data/productData';
import { Product } from '../types/product';

export class ProductService {
  getAllProducts(page: number, limit: number, search?: string, categoryId?: number) {
    let filteredProducts = [...productsData];

    // Filtrar por búsqueda
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }

    // Filtrar por categoría
    if (categoryId) {
      filteredProducts = filteredProducts.filter((p) =>
        p.categories && p.categories.length > 0 && p.categories.some((cat) => cat.id === categoryId)
      );
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    };
  }

  getProductById(id: number): Product | undefined {
    return productsData.find((p) => p.id === id);
  }

  createProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: productsData.length + 1,
    };
    productsData.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, updates: Partial<Product>): Product | null {
    const index = productsData.findIndex((p) => p.id === id);
    if (index === -1) return null;

    productsData[index] = { ...productsData[index], ...updates };
    return productsData[index];
  }

  deleteProduct(id: number): boolean {
    const index = productsData.findIndex((p) => p.id === id);
    if (index === -1) return false;

    productsData.splice(index, 1);
    return true;
  }
}