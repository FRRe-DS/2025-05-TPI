/**
 * Props para SearchFilters
 */
interface SearchFiltersProps {
  filterId: string;
  filterStatus: "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED";
  onIdChange: (id: string) => void;
  onStatusChange: (status: "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED") => void;
  onSearch: () => void;
  onReset: () => void;
}

/**
 * Componente de filtros de búsqueda para reservas
 * Incluye búsqueda por ID y filtro por estado
 */
export const SearchFilters = ({
  filterId,
  filterStatus,
  onIdChange,
  onStatusChange,
  onSearch,
  onReset,
}: SearchFiltersProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtros de Búsqueda</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Filtro por ID */}
        <div className="flex flex-col">
          <label htmlFor="filterId" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar por ID de Reserva
          </label>
          <div className="flex gap-2">
            <input
              id="filterId"
              type="number"
              value={filterId}
              onChange={(e) => onIdChange(e.target.value)}
              placeholder="Ingrese ID de reserva"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button onClick={onSearch} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Buscar
            </button>
          </div>
        </div>

        {/* Filtro por Estado */}
        <div className="flex flex-col">
          <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Estado
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value as typeof filterStatus)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="ALL">Todos los estados</option>
            <option value="PENDING">Pendiente</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>
      </div>

      <button onClick={onReset} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
        Resetear Filtros
      </button>
    </section>
  );
};
