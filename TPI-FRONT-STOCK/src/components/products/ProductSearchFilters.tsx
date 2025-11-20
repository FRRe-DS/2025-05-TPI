import { GenericFilter, type FilterConfig } from "../common/filters/GenericFilter";

interface ProductSearchFiltersProps {
  filterId: string;
  setFilterId: (id: string) => void;
  filterName: string;
  setFilterName: (name: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  reset: () => void;
}

export function ProductSearchFilters({
  filterId,
  setFilterId,
  filterName,
  setFilterName,
  selectedCategory,
  setSelectedCategory,
  categories,
  reset
}: ProductSearchFiltersProps) {

  const filters: FilterConfig[] = [
    {
      id: "filterId",
      label: "Buscar por ID de Producto",
      type: "number",
      value: filterId,
      onChange: (val) => setFilterId(val as string),
      placeholder: "Ingrese ID de producto...",
      min: 1
    },
    {
      id: "filterCategory",
      label: "Categoría",
      type: "select",
      value: selectedCategory,
      onChange: (val) => setSelectedCategory(val as string),
      options: [
        { value: "all", label: "Todas las categorías" },
        ...categories.map(c => ({ 
          value: c, 
          label: c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() 
        }))
      ]
    },
    {
      id: "filterName",
      label: "Buscar por Nombre",
      type: "text",
      value: filterName,
      onChange: (val) => setFilterName(val as string),
      placeholder: "Ingrese nombre del producto..."
    }
  ];

  return (
    <GenericFilter
      title="Filtros de Productos"
      onReset={reset}
      filters={filters}
    />
  );
}
