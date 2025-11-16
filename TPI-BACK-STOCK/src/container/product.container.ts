import { ProductRepository, CategoryRepository } from "../repository";
import { ProductService } from "../services";
import { ProductController } from "../controllers";

export const buildProductDependencies = () => {
  
  const productRepository = new ProductRepository(); 
  const categoryRepository = new CategoryRepository();
  
  const service = new ProductService(productRepository, categoryRepository);

  const controller = new ProductController(service);

  return {
    productService: service,
    productController: controller,
  };
};