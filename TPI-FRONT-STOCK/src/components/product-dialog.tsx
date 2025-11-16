"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { Producto, Categoria } from "@/types/api"

export interface ProductFormState {
  nombre: string
  descripcion: string
  precio: string
  stockDisponible: string
  pesoKg: string
  largoCm: string
  anchoCm: string
  altoCm: string
  calle: string
  ciudad: string
  provincia: string
  codigoPostal: string
  pais: string
  categoriaIds: number[]
}

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Producto
  categorias: Categoria[]
  onSubmit: (data: ProductFormState) => Promise<void> | void
  isSubmitting?: boolean
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
  categorias,
  onSubmit,
  isSubmitting = false,
}: ProductDialogProps) {
  const buildInitialState = (current?: Producto): ProductFormState => ({
    nombre: current?.nombre ?? "",
    descripcion: current?.descripcion ?? "",
    precio: current?.precio?.toString() ?? "",
    stockDisponible: current?.stockDisponible?.toString() ?? "",
    pesoKg: current?.pesoKg?.toString() ?? "",
    largoCm: current?.dimensiones?.largoCm?.toString() ?? "",
    anchoCm: current?.dimensiones?.anchoCm?.toString() ?? "",
    altoCm: current?.dimensiones?.altoCm?.toString() ?? "",
    calle: current?.ubicacion?.calle ?? "",
    ciudad: current?.ubicacion?.ciudad ?? "",
    provincia: current?.ubicacion?.provincia ?? "",
    codigoPostal: current?.ubicacion?.codigoPostal ?? "",
    pais: current?.ubicacion?.pais ?? "AR",
    categoriaIds: current?.categorias?.map((c) => c.id) ?? [],
  })

  const [formData, setFormData] = useState<ProductFormState>(buildInitialState())

  useEffect(() => {
    setFormData(buildInitialState(product))
  }, [product, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const toggleCategory = (categoryId: number) => {
    setFormData((prev) => ({
      ...prev,
      categoriaIds: prev.categoriaIds.includes(categoryId)
        ? prev.categoriaIds.filter((id) => id !== categoryId)
        : [...prev.categoriaIds, categoryId],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Actualiza la información del producto"
              : "Completa los datos del nuevo producto"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Nombre */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nombre">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: Laptop Pro X"
                required
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Describe el producto..."
                rows={3}
                required
              />
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <Label htmlFor="precio">
                Precio <span className="text-destructive">*</span>
              </Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>

            {/* Stock Inicial */}
            <div className="space-y-2">
              <Label htmlFor="stockDisponible">
                Stock inicial <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stockDisponible"
                type="number"
                min="0"
                value={formData.stockDisponible}
                onChange={(e) =>
                  setFormData({ ...formData, stockDisponible: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>

            {/* Peso */}
            <div className="space-y-2">
              <Label htmlFor="pesoKg">Peso (kg)</Label>
              <Input
                id="pesoKg"
                type="number"
                step="0.01"
                min="0"
                value={formData.pesoKg}
                onChange={(e) =>
                  setFormData({ ...formData, pesoKg: e.target.value })
                }
                placeholder="0.0"
                required
              />
            </div>

            {/* Dimensiones */}
            <div className="space-y-3 md:col-span-2">
              <Label>Dimensiones (cm)</Label>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="largoCm">
                    Largo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="largoCm"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.largoCm}
                    onChange={(e) =>
                      setFormData({ ...formData, largoCm: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="anchoCm">
                    Ancho <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="anchoCm"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.anchoCm}
                    onChange={(e) =>
                      setFormData({ ...formData, anchoCm: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altoCm">
                    Alto <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="altoCm"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.altoCm}
                    onChange={(e) =>
                      setFormData({ ...formData, altoCm: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="space-y-3 md:col-span-2">
              <Label>Ubicación en almacén</Label>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="calle">
                    Calle <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="calle"
                    value={formData.calle}
                    onChange={(e) =>
                      setFormData({ ...formData, calle: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">
                    Ciudad <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) =>
                      setFormData({ ...formData, ciudad: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provincia">
                    Provincia <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="provincia"
                    value={formData.provincia}
                    onChange={(e) =>
                      setFormData({ ...formData, provincia: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigoPostal">
                    Código Postal <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={(e) =>
                      setFormData({ ...formData, codigoPostal: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pais">
                  País (código ISO 2) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pais"
                  maxLength={2}
                  value={formData.pais}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pais: e.target.value.toUpperCase(),
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Categorías */}
            <div className="space-y-2 md:col-span-2">
              <Label>Categorías / Variantes</Label>
              <div className="space-y-2 rounded-lg border border-border bg-accent/50 p-4">
                {categorias.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No hay categorías disponibles. Crea una desde el backend.
                  </p>
                ) : (
                  categorias.map((categoria) => (
                    <div key={categoria.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`categoria-${categoria.id}`}
                        checked={formData.categoriaIds.includes(categoria.id)}
                        onCheckedChange={() => toggleCategory(categoria.id)}
                      />
                      <label
                        htmlFor={`categoria-${categoria.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {categoria.nombre}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? product
                  ? "Actualizando..."
                  : "Creando..."
                : product
                  ? "Actualizar Producto"
                  : "Crear Producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
