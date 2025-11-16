import { useEffect, useMemo, useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Pagination } from '@/components/pagination'
import type { Producto } from '@/types/api'

interface ProductTableProps {
  productos: Producto[]
  searchQuery: string
  categoryId: number | null
  onEdit: (producto: Producto) => void
  onDelete: (producto: Producto) => void
  isLoading?: boolean
}

export function ProductTable({
  productos,
  searchQuery,
  categoryId,
  onEdit,
  onDelete,
  isLoading = false,
}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, categoryId, productos.length])

  const filteredProductos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return productos.filter((producto) => {
      const matchesSearch =
        query.length === 0 || producto.nombre.toLowerCase().includes(query)
      const matchesCategory =
        categoryId === null || producto.categorias?.some((cat) => cat.id === categoryId)

      return matchesSearch && matchesCategory
    })
  }, [productos, searchQuery, categoryId])

  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / itemsPerPage))

  const paginatedProductos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProductos.slice(start, start + itemsPerPage)
  }, [filteredProductos, currentPage])

  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return 'destructive'
    if (stock < 10) return 'outline'
    return 'secondary'
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Producto</TableHead>
              <TableHead className="text-muted-foreground">Descripción</TableHead>
              <TableHead className="text-muted-foreground">Categorías</TableHead>
              <TableHead className="text-right text-muted-foreground">Precio</TableHead>
              <TableHead className="text-right text-muted-foreground">Stock</TableHead>
              <TableHead className="text-right text-muted-foreground">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  Cargando productos...
                </TableCell>
              </TableRow>
            ) : paginatedProductos.length > 0 ? (
              paginatedProductos.map((producto) => {
                const imagen = producto.imagenes?.find((img) => img.esPrincipal)
                return (
                  <TableRow
                    key={producto.id}
                    className="border-b border-border hover:bg-accent/50"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md border border-border">
                          <img
                            src={imagen?.url || '/placeholder.svg'}
                            alt={producto.nombre}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-foreground">{producto.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs text-muted-foreground">
                      <span className="line-clamp-2">{producto.descripcion}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {producto.categorias?.map((cat) => (
                          <Badge key={cat.id} variant="secondary" className="text-xs">
                            {cat.nombre}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-foreground">
                      {(() => {
                        const price = Number(producto.precio)
                        return Number.isFinite(price) ? `$${price.toFixed(2)}` : producto.precio
                      })()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStockBadgeVariant(producto.stockDisponible)}>
                        {producto.stockDisponible}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(producto)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(producto)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredProductos.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
