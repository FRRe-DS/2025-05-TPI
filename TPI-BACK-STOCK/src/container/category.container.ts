import { CategoryRepository } from "../repository";
import { CategoryService } from "../services";
import { CategoryController } from "../controllers";

export const buildCategoryDependencies = () => {
  
  const repository = new CategoryRepository(); 
  const service = new CategoryService(repository);
  const controller = new CategoryController(service);

  return {
    categoryService: service,
    categoryController: controller,
  };
};