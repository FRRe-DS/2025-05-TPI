import { buildCategoryDependencies } from "./category.container"; 

const categoryDependencies = buildCategoryDependencies();

export const container = {
  ...categoryDependencies
};