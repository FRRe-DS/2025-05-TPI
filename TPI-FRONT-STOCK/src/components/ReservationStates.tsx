/**
 * Componente de estado de carga
 */
export const LoadingState = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    <p className="mt-4 text-gray-600">Cargando reservas...</p>
  </div>
);

/**
 * Props para ErrorState
 */
interface ErrorStateProps {
  message: string;
}

/**
 * Componente de estado de error
 */
export const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
    <p className="font-bold">Error al cargar las reservas</p>
    <p className="text-sm">{message}</p>
  </div>
);

/**
 * Componente de estado vacío
 */
export const EmptyState = () => (
  <div className="text-center py-8 text-gray-500">
    No se encontraron reservas con los filtros aplicados
  </div>
);
