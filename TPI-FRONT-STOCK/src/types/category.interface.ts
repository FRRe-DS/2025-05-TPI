/**
 * Categoría de producto.
*/
export interface ICategory {
  id: number;
  nombre: string;
  descripcion: string | null;
}

/**
 * Estructra para crear una categoria.
*/
export interface ICategoryInput {
  nombre: string; 
  descripcion?: string | null;
}

/**
 * Tipo para actualizar un producto
*/
export type IUpdateCategory = Partial<ICategoryInput>;