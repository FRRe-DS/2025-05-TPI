import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { IClientSummary } from "../../services/clientsService"; // ✅ Cambiar import
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow";

interface ClientTableRowProps {
  client: IClientSummary; // ✅ Cambiar tipo
}

export const ClientTableRow = memo(function ClientTableRow({ client }: ClientTableRowProps) {
  const navigate = useNavigate();

  const columns: TableColumn<IClientSummary>[] = useMemo(() => [ // ✅ Cambiar tipo genérico
    {
      header: "ID Cliente",
      render: (c: IClientSummary) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
            #{c.id}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">
              Cliente #{c.id}
            </div>
            <div className="text-xs text-gray-500">
              Usuario registrado
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Última Compra",
      render: (c: IClientSummary) => {
        const date = c.lastPurchase ? new Date(c.lastPurchase) : null;
        const formattedDate = date 
          ? date.toLocaleDateString('es-AR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })
          : 'Sin compras';
        
        return (
          <div className="text-sm text-gray-900">
            {formattedDate}
          </div>
        );
      }
    },
    {
      header: "Acciones",
      className: "text-right",
      render: (c: IClientSummary) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/reservas?userId=${c.id}`);
          }}
          className="inline-flex items-center cursor-pointer gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-md text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          Ver reservas
        </button>
      )
    }
  ], [navigate]);

  return (
    <GenericTableRow 
      showData={client} 
      columns={columns} 
    />
  );
});