export interface ICategory {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export interface ICategoryInput {
  nombre: string; 
  descripcion?: string | null;
}

export type IUpdateCategory = Partial<ICategoryInput>;