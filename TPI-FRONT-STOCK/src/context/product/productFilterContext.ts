import { createContext, useContext } from "react";
import type { IProduct } from "../../types"; // Importaciones actualizadas

type FilterCategoryId = number | null;

/** Interfaz que define la estructura del valor del Contexto de Filtros de Producto. */
interface ProductFilterContextType {
    // Propiedades de Estado/Filtro
    /** ID exacto para filtrar. */
    filterId: number | null; // Cambiado a number | null para coincidir con IProduct.id
    /** ID de la categoría seleccionada (usamos 'null' para 'todas'). */
    filterCategoryId: FilterCategoryId;
    /** Término para buscar en el nombre del producto. */
    filterSearchTerm: string;
    
    // Propiedades de Paginación y Datos
    displayData: IProduct[];
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    
    // Funciones (Setters y Acciones)
    setFilterId: (id: number | null) => void;
    setFilterCategoryId: (categoryId: FilterCategoryId) => void;
    setFilterSearchTerm: (term: string) => void;
    goToPage: (page: number) => void;
    reset: () => void;
}

/**
 * Crea el contexto de filtros de producto.
 */
export const ProductFilterContext = createContext<ProductFilterContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de filtros de producto.
 * Lanza un error si se usa fuera de un ProductFilterProvider.
 */
export const useProductFilter = (): ProductFilterContextType => {
    const context = useContext(ProductFilterContext);
    
    if (!context) {
        throw new Error("useProductFilter must be used within ProductFilterProvider");
    }
    
    return context;
}