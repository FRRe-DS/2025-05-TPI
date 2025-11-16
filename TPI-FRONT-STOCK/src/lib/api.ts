import { api } from '@/client'
import type {
  Categoria,
  Producto,
  ProductoCreado,
  ProductoInput,
  ProductoUpdate,
} from '@/types/api'

export const productosApi = {
  async list(): Promise<Producto[]> {
    const { data } = await api.get<Producto[]>('/productos')
    return data
  },

  async getById(id: number): Promise<Producto> {
    const { data } = await api.get<Producto>(`/productos/${id}`)
    return data
  },

  async create(payload: ProductoInput): Promise<Producto | ProductoCreado> {
    const { data } = await api.post<Producto | ProductoCreado>('/productos', payload)
    return data
  },

  async update(id: number, payload: ProductoUpdate): Promise<Producto> {
    const { data } = await api.patch<Producto>(`/productos/${id}`, payload)
    return data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/productos/${id}`)
  },
}

export const categoriasApi = {
  async list(): Promise<Categoria[]> {
    const { data } = await api.get<Categoria[]>('/categorias')
    return data
  },
}
