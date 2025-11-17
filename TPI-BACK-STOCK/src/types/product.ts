import { Categoria } from './categories'; // Importar la interfaz

export interface Dimensiones {
  largoCm: number;
  anchoCm: number;
  altoCm: number;
}

export interface UbicacionAlmacen {
  calle: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number; 
  stockDisponible: number;
  pesoKg: number;
  dimensiones: Dimensiones;
  ubicacion: UbicacionAlmacen;
  imagenes: ImagenProducto[]; 
  categorias: Categoria[]; 
}

export interface ProductoInput {
  nombre: string;
  descripcion: string;
  precio: number; 
  stockDisponible: number;
  pesoKg: number;
  dimensiones: Dimensiones;
  ubicacion: UbicacionAlmacen;    
  imagenes?: ImagenProductoInput[];
  categoriaIds?: number[]; 
}

export interface ProductoUpdate {
  nombre?: string;
  descripcion?: string;
  precio?: number; 
  stockInicial?: number;
  pesoKg?: number;
  dimensiones?: Dimensiones;
  ubicacion?: UbicacionAlmacen;
  imagenes?: ImagenProductoInput[];
  categoriaIds?: number[];
}

export interface ImagenProductoInput {
  url: string;
  esPrincipal: boolean;
}

export interface ImagenProducto {
  id: number;
  url: string;
  esPrincipal: boolean;
  productoId: number;
}