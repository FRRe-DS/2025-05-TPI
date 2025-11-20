import { useCategories } from "../category.hook";
import { useSelectFilter } from "./generics";

export function useCategoryFilter() {
  const ALL_CATEGORY_SLUG = 'all';
  const { data: categories, isLoading, isError } = useCategories(); 

  const paramName = 'category';
  const defaultValue = ALL_CATEGORY_SLUG;
  const allValue = ALL_CATEGORY_SLUG;

  const { 
    selected, 
    setSelected, 
    reset, 
    isAll 
  } = useSelectFilter(
    paramName,
    defaultValue,
    allValue
  );

  return {
    // Estado de React Query
    categories: categories, 
    isLoading,
    isError,

    // Estado del Filtro
    selectedCategorySlug: selected, 
    setCategory: setSelected,
    resetCategory: reset,
    isAllCategory: isAll,
  };
}
