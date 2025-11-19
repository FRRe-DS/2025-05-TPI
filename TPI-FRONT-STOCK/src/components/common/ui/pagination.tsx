// src/components/common/ui/Pagination.tsx
import { useMemo } from 'react';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Componente de Paginación genérico y reutilizable (UI Pura).
 * Se espera que la lógica de estado (URL/TanStack Query) viva en el componente padre.
 */
export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {

  const startItem = useMemo(() => (currentPage - 1) * itemsPerPage + 1, [currentPage, itemsPerPage]);
  const endItem = useMemo(() => Math.min(currentPage * itemsPerPage, totalItems), [currentPage, itemsPerPage, totalItems]);

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;


  
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-4 py-3 sm:flex-row sm:px-6">
      <div>
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{startItem}</span> a{' '}
          <span className="font-medium">{endItem}</span> de{' '}
          <span className="font-medium">{totalItems}</span> registros
        </p>
      </div>

      {/* Controles de paginación */}
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          {/* Botón Anterior */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 
            ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 
            disabled:cursor-not-allowed hover:cursor-pointer"
          >
            <span className="sr-only">Página Anterior</span>
            ← Anterior
          </button>

          {/* Números de página generados por useMemo */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 
                focus:outline-offset-0 hover:cursor-pointer ${
                page === currentPage
                  ? 'z-10 bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 
            ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 
            isabled:cursor-not-allowed hover:cursor-pointer"
          >
            <span className="sr-only">Página Siguiente</span>
            Siguiente →
          </button>
        </nav>
      </div>
    </div>
  );
}