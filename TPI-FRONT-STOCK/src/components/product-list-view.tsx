import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Package, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductTable } from '@/components/product-table'
import { ProductDialog, type ProductFormState } from '@/components/product-dialog'
import { CategoryFilter } from '@/components/category-filter'
import { DeleteProductDialog } from '@/components/delete-product-dialog'
import { categoriasApi, productosApi } from '@/lib/api'
import type { Producto, ProductoInput } from '@/types/api'

const parseNumber = (value: string, fallback = 0) => {
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

const buildPayload = (formData: ProductFormState): ProductoInput => ({
  nombre: formData.nombre.trim(),
  descripcion: formData.descripcion.trim() || undefined,
  precio: parseNumber(formData.precio),
  stockDisponible: parseNumber(formData.stockDisponible),
  pesoKg: formData.pesoKg ? parseNumber(formData.pesoKg) : undefined,
  dimensiones: {
    largoCm: parseNumber(formData.largoCm),
    anchoCm: parseNumber(formData.anchoCm),
    altoCm: parseNumber(formData.altoCm),
  },
  ubicacion: {
    calle: formData.calle.trim(),
    ciudad: formData.ciudad.trim(),
    provincia: formData.provincia.trim(),
    codigoPostal: formData.codigoPostal.trim(),
    pais: formData.pais.trim().toUpperCase(),
  },
  categoriaIds: formData.categoriaIds,
})

export function ProductListView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Producto | null>(null)

  const queryClient = useQueryClient()

  const productosQuery = useQuery({
    queryKey: ['productos'],
    queryFn: productosApi.list,
  })

  const categoriasQuery = useQuery({
    queryKey: ['categorias'],
    queryFn: categoriasApi.list,
  })

  const createMutation = useMutation({
    mutationFn: productosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setIsCreateDialogOpen(false)
    },
    onError: (error) => {
      console.error('Error al crear el producto:', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReturnType<typeof buildPayload> }) =>
      productosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setEditingProduct(null)
    },
    onError: (error) => {
      console.error('Error al actualizar el producto:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productosApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setDeletingProduct(null)
    },
    onError: (error) => {
      console.error('Error al eliminar el producto:', error)
    },
  })

  const productos = productosQuery.data ?? []
  const categorias = categoriasQuery.data ?? []

  const isFetching = productosQuery.isLoading || productosQuery.isFetching

  const handleCreate = async (data: ProductFormState) => {
    try {
      await createMutation.mutateAsync(buildPayload(data))
    } catch (error) {
      console.error('Error al crear el producto:', error)
    }
  }

  const handleUpdate = async (data: ProductFormState) => {
    if (!editingProduct) return
    try {
      await updateMutation.mutateAsync({ id: editingProduct.id, data: buildPayload(data) })
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    try {
      await deleteMutation.mutateAsync(deletingProduct.id)
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }

  const categoriaOptions = useMemo(() => categorias, [categorias])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StockFlow</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <span className="cursor-not-allowed opacity-50">Características</span>
            <span className="cursor-not-allowed opacity-50">Precios</span>
            <span className="cursor-not-allowed opacity-50">Contacto</span>
            <Button variant="ghost" size="sm" disabled>
              Iniciar Sesión
            </Button>
            <Button size="sm" disabled>
              Acceder
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Productos</h1>
            <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
          </div>

          {productosQuery.isError && (
            <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
              No se pudieron cargar los productos. Reintenta más tarde.
            </div>
          )}

          {categoriasQuery.isError && (
            <div className="mb-4 rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              No se pudieron cargar las categorías.
            </div>
          )}

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <CategoryFilter
                categorias={categoriaOptions}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>

          <ProductTable
            productos={productos}
            searchQuery={searchQuery}
            categoryId={selectedCategory}
            onEdit={setEditingProduct}
            onDelete={setDeletingProduct}
            isLoading={isFetching}
          />
        </div>
      </main>

      <ProductDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        categorias={categoriaOptions}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      <ProductDialog
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
        categorias={categoriaOptions}
        product={editingProduct ?? undefined}
        onSubmit={handleUpdate}
        isSubmitting={updateMutation.isPending}
      />

      {deletingProduct && (
        <DeleteProductDialog
          open={!!deletingProduct}
          onOpenChange={(open) => !open && setDeletingProduct(null)}
          product={deletingProduct}
          onConfirm={handleDelete}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  )
}
