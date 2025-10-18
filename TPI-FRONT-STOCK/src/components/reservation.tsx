import { useReservationFilters } from "../hooks/useReservationFilters";
import { SearchFilters } from "./SearchFilters";
import { ReservationCard } from "./ReservationCard";
import { LoadingState, ErrorState, EmptyState } from "./ReservationStates";

/**
 * Componente principal para gestionar y visualizar reservas
 * Incluye filtros por ID y estado con estados de carga y error
 */
export const ReservationList = () => {
  const {
    filterId,
    filterStatus,
    displayData,
    isLoading,
    error,
    setFilterId,
    handleSearchById,
    handleSearchByStatus,
    handleReset,
  } = useReservationFilters();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Reservas</h1>

      <SearchFilters
        filterId={filterId}
        filterStatus={filterStatus}
        onIdChange={setFilterId}
        onStatusChange={handleSearchByStatus}
        onSearch={handleSearchById}
        onReset={handleReset}
      />

      {isLoading && <LoadingState />}

      {error && <ErrorState message={error.message} />}

      {!isLoading && !error && (
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <header className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Resultados ({displayData.length} reservas encontradas)
            </h2>
          </header>

          {displayData.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-gray-200">
              {displayData.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ReservationList;
