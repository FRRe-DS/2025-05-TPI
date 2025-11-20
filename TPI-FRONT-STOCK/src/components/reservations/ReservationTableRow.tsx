import { memo, useMemo } from "react";
import type { IReservation } from "../../types/reservation.interface";
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow";  
import { formatDate, getStatusColor, getTotalItems } from "../../utils/reservation.utils";

interface ReservationTableRowProps {
  reservation: IReservation;
  onViewDetails: (reservation: IReservation) => void;
}

export const ReservationTableRow = memo(function ReservationTableRow({ 
  reservation, 
  onViewDetails 
}: ReservationTableRowProps) {

  // Aquí definimos las "secciones" (columnas) de la tabla
  const columns: TableColumn<IReservation>[] = useMemo(() => [
    {
      header: "ID Reserva",
      render: (r: IReservation) => (
        <div className="flex items-center">
          <div>
            <div className="text-sm font-bold text-gray-900">#{r.idReserva}</div>
            <div className="text-xs text-gray-500">Compra: #{r.idCompra}</div>
          </div>
        </div>
      )
    },
    {
      header: "Usuario",
      render: (r: IReservation) => (
        <div className="text-sm text-gray-900 font-medium">
          ID: {r.usuarioId}
        </div>
      )
    },
    {
      header: "Fecha",
      render: (r: IReservation) => (
        <div className="text-sm text-gray-900 font-medium">
          {formatDate(r.fechaCreacion)}
        </div>
      )
    },
    {
      header: "Estado",
      render: (r: IReservation) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusColor(r.estado)}`}>
          {r.estado}
        </span>
      )
    },
    {
      header: "Productos",
      render: (r: IReservation) => {
        const total = getTotalItems(r.items);
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">{total}</span>
            <span className="text-xs text-gray-500">{total === 1 ? 'producto' : 'productos'}</span>
          </div>
        );
      }
    },
    {
      header: "Acciones",
      className: "text-center",
      render: (r: IReservation) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(r);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md cursor-pointer"
        >
          Ver detalles
        </button>
      )
    }
  ], [onViewDetails]);

  // Pasamos 'reservation' como 'showData' y las columnas definidas
  return (
    <GenericTableRow 
      showData={reservation} 
      columns={columns} 
    />
  );
});