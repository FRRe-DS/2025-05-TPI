interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoToPage: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPrevPage,
  onNextPage,
  onGoToPage
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onGoToPage(i)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4 mt-6">
      <div className="flex items-center justify-between">
        {/* Información de registros */}
        <div className="text-sm text-gray-600">
          Mostrando <span className="font-semibold">{startItem}</span> a{' '}
          <span className="font-semibold">{endItem}</span> de{' '}
          <span className="font-semibold">{totalItems}</span> reservas
        </div>

        {/* Controles de paginación */}
        <div className="flex items-center gap-2">
          {/* Botón Anterior */}
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            ← Anterior
          </button>

          {/* Números de página */}
          {renderPageNumbers()}

          {/* Botón Siguiente */}
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}