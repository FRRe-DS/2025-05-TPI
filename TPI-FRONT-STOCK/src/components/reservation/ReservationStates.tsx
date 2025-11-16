// Constantes de estilos para los estados
const STATUS_CLASSES = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-green-100 text-green-800 border-green-300",
  CANCELED: "bg-red-100 text-red-800 border-red-300",
  DEFAULT: "bg-gray-100 text-gray-800 border-gray-300",
} as const;


interface StatusBadgeProps {
  status: string;
}


export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClass = STATUS_CLASSES[status as keyof typeof STATUS_CLASSES] || STATUS_CLASSES.DEFAULT;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}>
      {status}
    </span>
  );
};


export const LoadingState = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    <p className="mt-4 text-gray-600">Cargando reservas...</p>
  </div>
);

interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
    <p className="font-bold">Error al cargar las reservas</p>
    <p className="text-sm">{message}</p>
  </div>
);

export const EmptyState = () => (
  <div className="text-center py-8 text-gray-500">
    No se encontraron reservas con los filtros aplicados
  </div>
);
