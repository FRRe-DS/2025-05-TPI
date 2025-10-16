import { productsData } from "../data/productData.js";
import type { Product, ProductInput, ProductUpdate } from "../types/product.js";

export class ProductService {
  private products = productsData;
  private nextId = productsData.length > 0 ? Math.max(...productsData.map(p => p.id)) + 1 : 1;

  // ===== MÉTODOS DE CONSULTA =====

  findAllProducts(): Product[] | null {
    if (this.products.length === 0) return null;
    return this.products;
  }

  findProductById(id: number): Product | null {
    const product = this.products.find((productAux) => productAux.id === id);
    if (!product) return null;
    return product;
  }

  getAllProducts(
    page: number = 1, 
    limit: number = 10, 
    search?: string, 
    categoryId?: number
  ): { products: Product[], total: number, page: number, totalPages: number } {
    let filteredProducts = [...this.products];

    // Filtrar por búsqueda (nombre o descripción)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por categoría
    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (product) => product.categories?.some(cat => cat.id === categoryId)
      );
    }

    // Calcular paginación
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages
    };
  }

  // ===== MÉTODOS DE CREACIÓN =====

  createProduct(productData: ProductInput): { id: number; mensaje: string } {
    // Validar datos
    this.validateProductInput(productData);

    // Verificar que no exista un producto con el mismo nombre
    const existingProduct = this.products.find(
      p => p.name.toLowerCase() === productData.name.toLowerCase()
    );

    if (existingProduct) {
      throw new Error('Ya existe un producto con ese nombre');
    }

    // Crear el producto
    const newProduct: Product = {
      id: this.nextId++,
      nombre: productData.nombre,
      descripcion: productData.descripcion,
      precio: productData.precio,
      stockDisponible: productData.stockInicial,
      pesoKg: productData.pesoKg,
      imagenes: productData.imagenes || [],
      categorias: productData.categoriaIds?.map(id => ({ id, nombre: '', descripcion: '' })) // Simular categorías
    };

    this.products.push(newProduct);
    
    return {
      id: newProduct.id,
      mensaje: 'Producto creado exitosamente.'
    };
  }

  // ===== MÉTODOS DE ACTUALIZACIÓN =====

  updateProduct(id: number, updates: ProductUpdate): Product | null {
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return null;
    }

    // Si se actualiza el nombre, verificar que no exista otro con el mismo
    if (updates.nombre) {
      const existingProduct = this.products.find(
        p => p.id !== id && p.nombre.toLowerCase() === updates.nombre!.toLowerCase()
      );

      if (existingProduct) {
        throw new Error('Ya existe otro producto con ese nombre');
      }
    }

    // Actualizar propiedades del producto existente
    const product = this.products[productIndex];
    
    if (updates.nombre !== undefined) product?.name = updates.nombre;
    if (updates.descripcion !== undefined) product?.description = updates.descripcion;
    if (updates.precio !== undefined) product?.price = updates.precio;
    if (updates.stockInicial !== undefined) product?.stockAvailable = updates.stockInicial;
    if (updates.pesoKg !== undefined) product?.weightKg = updates.pesoKg;
    if (updates.imagenes !== undefined) product?.images = updates.imagenes;
    if (updates.categoriaIds !== undefined) {
      product?.categories = updates.categoriaIds.map(id => ({ id, name: '', description: '' }));
    }

    return product;
  }

  // ===== MÉTODOS DE ELIMINACIÓN =====

  deleteProduct(id: number): boolean {
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return false;
    }

    this.products.splice(productIndex, 1);
    return true;
  }

  // ===== MÉTODOS DE STOCK =====

  checkStockAvailability(productId: number, quantity: number): boolean {
    const product = this.findProductById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product.stockDisponible >= quantity;
  }

  reserveStock(productId: number, quantity: number): boolean {
    const product = this.findProductById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (product.stockDisponible < quantity) {
      throw new Error('Stock insuficiente');
    }

    product.stockDisponible -= quantity;
    return true;
  }

  releaseStock(productId: number, quantity: number): boolean {
    const product = this.findProductById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    product.stockDisponible += quantity;
    return true;
  }

  getLowStockProducts(threshold: number = 10): Product[] {
    return this.products.filter(product => product.stockDisponible <= threshold);
  }

  // ===== MÉTODOS DE CATEGORÍA =====

  getProductsByCategory(categoryId: number): Product[] {
    return this.products.filter(product => 
      product.categorias?.some(cat => cat.id === categoryId)
    );
  }

  // ===== MÉTODOS DE VALIDACIÓN =====

  private validateProductInput(data: ProductInput): void {
    if (!data.nombre || data.nombre.trim().length === 0) {
      throw new Error('El nombre del producto es requerido');
    }
    if (data.nombre.length > 200) {
      throw new Error('El nombre del producto no puede exceder 200 caracteres');
    }
    if (data.precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    if (data.stockInicial < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    if (data.pesoKg !== undefined && data.pesoKg < 0) {
      throw new Error('El peso no puede ser negativo');
    }
    if (data.imagenes && data.imagenes.length > 0) {
      const principalCount = data.imagenes.filter(img => img.esPrincipal).length;
      if (principalCount > 1) {
        throw new Error('Solo una imagen puede ser marcada como principal');
      }
    }
  }

  // ===== MÉTODOS ESTADÍSTICOS =====

  getProductStatistics(): {
    totalProducts: number;
    averagePrice: number;
    totalStock: number;
    lowStockCount: number;
    averageWeight: number;
  } {
    const totalStock = this.products.reduce((sum, p) => sum + p.stockAvailable, 0);
    const totalPrice = this.products.reduce((sum, p) => sum + p.price, 0);
    const totalWeight = this.products.reduce((sum, p) => sum + (p.weightKg || 0), 0);
    const averagePrice = this.products.length > 0 ? totalPrice / this.products.length : 0;
    const averageWeight = this.products.length > 0 ? totalWeight / this.products.length : 0;
    const lowStockCount = this.getLowStockProducts().length;

    return {
      totalProducts: this.products.length,
      averagePrice: Number(averagePrice.toFixed(2)),
      totalStock,
      lowStockCount,
      averageWeight: Number(averageWeight.toFixed(2))
    };
  }

  // ===== MÉTODOS DE BÚSQUEDA AVANZADA =====

  searchProducts(query: string): Product[] {
    const queryLower = query.toLowerCase();
    return this.products.filter(product => 
      product.nombre.toLowerCase().includes(queryLower) ||
      product.descripcion?.toLowerCase().includes(queryLower)
    );
  }

  filterProducts(filters: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    inStock?: boolean;
    maxWeight?: number;
  }): Product[] {
    let filtered = [...this.products];

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.categoryId !== undefined) {
      filtered = filtered.filter(p => p.categories?.some(cat => cat.id === filters.categoryId));
    }

    if (filters.inStock !== undefined && filters.inStock) {
      filtered = filtered.filter(p => p.stockAvailable > 0);
    }

    if (filters.maxWeight !== undefined) {
      filtered = filtered.filter(p => (p.weightKg || 0) <= filters.maxWeight!);
    }

    return filtered;
  }
}