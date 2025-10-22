import { buildCategoryDependencies } from "./category.container"; 
import { buildProductDependencies } from "./product.container"; 
import { buildReservationDependencies } from "./reservation.container";

const categoryDependencies = buildCategoryDependencies();
const productDependencies = buildProductDependencies();
const reservationDependencies = buildReservationDependencies();

export const container = {
  ...categoryDependencies,
  ...productDependencies,
  ...reservationDependencies
};