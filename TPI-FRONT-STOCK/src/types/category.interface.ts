export interface ICategory {
  id: number;
  name: string;
  description: string | null;
}

export interface ICategoryInput {
  name: string; 
  description?: string | null;
}

export type IUpdateCategory = Partial<ICategoryInput>;