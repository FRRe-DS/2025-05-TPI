import { buildCategoryDependencies } from "./category.container"; 
import { buildProductDependencies } from "./product.container"; 

const categoryDependencies = buildCategoryDependencies();
const productDependencies = buildProductDependencies();

export const container = {
  ...categoryDependencies,
  ...productDependencies
};