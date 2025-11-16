// API Types based on OpenAPI specification

export interface Dimensiones {
  largoCm?: number
  anchoCm?: number
  altoCm?: number
}

export interface UbicacionAlmacen {
  calle: string
  ciudad: string
  provincia: string
  codigoPostal: string
  pais: string
}

export interface ImagenProducto {
  url: string
  esPrincipal: boolean
}

export interface Categoria {
  id: number
  nombre: string
  descripcion?: string | null
}

export interface Producto {
  id: number
  nombre: string
  descripcion?: string
  precio: number
  stockDisponible: number
  pesoKg?: number
  dimensiones?: Dimensiones
  ubicacion?: UbicacionAlmacen
  imagenes?: ImagenProducto[]
  categorias?: Categoria[]
}

export interface ProductoInput {
  nombre: string
  descripcion?: string
  precio: number
  stockDisponible: number
  pesoKg?: number
  dimensiones: Dimensiones
  ubicacion: UbicacionAlmacen
  imagenes?: ImagenProducto[]
  categoriaIds?: number[]
}

export interface ProductoUpdate {
  nombre?: string
  descripcion?: string
  precio?: number
  stockDisponible?: number
  pesoKg?: number
  dimensiones?: Dimensiones
  ubicacion?: UbicacionAlmacen
  imagenes?: ImagenProducto[]
  categoriaIds?: number[]
}

export interface ProductoCreado {
  id: number
  mensaje: string
}

export interface ErrorResponse {
  code: string
  message: string
  details?: string | null
}
