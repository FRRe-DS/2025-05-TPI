import { useState } from "react";
import { useDeleteReservation } from "../hooks/reservation.hook";

/**
 * Props para el botón de eliminar
 */
interface DeleteButtonProps {
  reservationId: number;
  onDeleteSuccess?: () => void;
}

/**
 * Botón para eliminar una reserva con confirmación
 * Incluye estados de loading y manejo de errores
 */
export const DeleteReservationButton = ({ 
  reservationId,
  onDeleteSuccess 
}: DeleteButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteMutation = useDeleteReservation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(reservationId);
      setShowConfirm(false);
      onDeleteSuccess?.();
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-600">¿Confirmar?</span>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          {deleteMutation.isPending ? "Eliminando..." : "Sí"}
        </button>
        <button
          onClick={handleCancel}
          disabled={deleteMutation.isPending}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
    >
      Eliminar
    </button>
  );
};
