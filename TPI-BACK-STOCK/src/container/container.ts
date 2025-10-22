import { buildProductDependencies } from "./product.container"; 

const productDependencies = buildProductDependencies();

export const container = {
  ...productDependencies
};