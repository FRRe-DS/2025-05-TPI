import { CategoryRepository } from "../repository/categoryRepository";
import { ProductRepository } from "../repository/productsRepository";

import { ProductService } from "../services/productServices";

import { ProductController } from "../controllers/productController";



class Container {
  // Propiedades para guardar las instancias de los servicios
  private productRepository: ProductRepository;
  private categoryRepository: CategoryRepository;

  private productService: ProductService;

  // Propiedad para el controlador de productos
  private productController: ProductController;

  constructor() {
    // 1. Crear instancias de los Repositorios 
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();

    // 2. Crear instancias de los Servicios 
    this.productService = new ProductService(this.productRepository, this.categoryRepository);

    // 3. Crear instancias de los Controladores 
    this.productController = new ProductController(this.productService);
  }

  // --- Getters para acceder a las instancias ---

  getProductService() {
    return this.productService;
  }

  
  // Getter para el controlador de productos
  getProductController() {
    return this.productController;
  }

}

// Exportar una única instancia global del contenedor
export const container = new Container();