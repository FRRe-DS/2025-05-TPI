"use client"

import { Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Categoria } from "@/types/api"

interface CategoryFilterProps {
  categorias: Categoria[]
  selectedCategory: number | null
  onSelectCategory: (categoryId: number | null) => void
}

export function CategoryFilter({
  categorias,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const selectedCategoryName =
    categorias.find((c) => c.id === selectedCategory)?.nombre || "Todas"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          {selectedCategoryName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuRadioGroup
          value={selectedCategory?.toString() || "all"}
          onValueChange={(value) =>
            onSelectCategory(value === "all" ? null : parseInt(value))
          }
        >
          <DropdownMenuRadioItem value="all">Todas</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          {categorias.map((categoria) => (
            <DropdownMenuRadioItem key={categoria.id} value={categoria.id.toString()}>
              {categoria.nombre}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
