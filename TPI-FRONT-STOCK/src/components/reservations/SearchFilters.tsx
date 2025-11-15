import { useReservationFilters, type FilterStatus } from "../../context/ReservationFilterContext";

export function SearchFilters() {
  const { filterId, filterStatus, filterUserId, setFilterId, setFilterStatus, setFilterUserId, reset } = useReservationFilters();
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800"> Filtros de Búsqueda</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por ID */}
        <div>
          <label htmlFor="filterId" className="block text-sm font-semibold text-gray-700 mb-2">
            Buscar por ID de Reserva
          </label>
          <input
            id="filterId"
            type="number"
            min="1"
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
            placeholder="Ingrese ID de reserva..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filtro por Estado */}
        <div>
          <label htmlFor="filterStatus" className="block text-sm font-semibold text-gray-700 mb-2">
            Filtrar por Estado
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="ALL">Todos los estados</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
        {/* Filtro por Usuario ID */}
        <div>
          <label htmlFor="filterUserId" className="block text-sm font-semibold text-gray-700 mb-2">
            Buscar por ID de Usuario
          </label>
          <input
            id="filterUserId"
            type="number"
            min="1"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            placeholder="Ingrese ID de usuario..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}