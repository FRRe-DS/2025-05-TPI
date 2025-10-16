export interface productImage {
  id?: number;
  url: string;
  productId?: number;
  esPrincipal: boolean; // Según la API, debe indicar si es la imagen principal
}

export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stockDisponible: number;
  pesoKg?: number;
  imagenes?: productImage[];
  categorias?: Category[];
}

export interface ProductInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  stockInicial: number;
  pesoKg?: number;
  imagenes?: productImage[];
  categoriaIds?: number[];
}

export interface ProductUpdate {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stockInicial?: number;
  pesoKg?: number;
  imagenes?: productImage[];
  categoriaIds?: number[];
}