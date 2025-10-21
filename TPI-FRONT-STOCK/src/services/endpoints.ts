export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  PRODUCTS_SEARCH: "/products/search",
  CATEGORIES: "/categories",
  CATEGORY_BY_ID: (id: number) => `/categories/${id}`,
  RESERVATIONS: "/reservations",
  RESERVATION_BY_ID: (id: number) => `/reservations/${id}`,
  RESERVATIONS_BY_USER: (userId: number) => `/reservations/user/${userId}`,
} as const;
