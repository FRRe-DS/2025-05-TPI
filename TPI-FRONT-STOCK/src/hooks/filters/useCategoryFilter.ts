import { useCategories } from "../category.hook"; // Importamos el hook que usa React Query
import { useSelectFilter } from "./generics/useSelectFilter"; // Importamos el hook genérico de selección

// Definición de tipo para ser explícitos
type CategorySlug = string;

export function useCategoryFilter() {
  const ALL_CATEGORY_SLUG: CategorySlug = 'all';

  const { data: categories, isLoading, isError } = useCategories(); 

  const paramName = 'category';
  
  const { 
    selected, 
    setSelected, 
    reset, 
    isAll 
  } = useSelectFilter<CategorySlug>(
    paramName,
    ALL_CATEGORY_SLUG, 
    ALL_CATEGORY_SLUG  
  );

  return {
    categories: categories, 
    isLoading, 
    isError, 

    // Estado del Filtro de URL: Proporciona el estado de filtrado y las funciones para manipularlo.
    selectedCategorySlug: selected, // El slug seleccionado actualmente (e.g., 'electronics', 'all')
    setCategory: setSelected, // Función para cambiar el filtro (actualiza la URL)
    resetCategory: reset, // Función para eliminar el parámetro 'category' de la URL
    isAllCategory: isAll, // Booleano: true si el filtro actual es 'all'
  };
}