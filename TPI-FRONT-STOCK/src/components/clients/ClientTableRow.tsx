import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook de navegación
import type { IClient } from "../../types/client.interface";
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow";

interface ClientTableRowProps {
  client: IClient;
  // Ya no necesitamos onEdit obligatorio, pero lo dejamos opcional por si acaso
  onEdit?: (client: IClient) => void; 
}

export const ClientTableRow = memo(function ClientTableRow({ 
  client, 
  onEdit 
}: ClientTableRowProps) {
  const navigate = useNavigate(); // Hook para redirigir

  const columns: TableColumn<IClient>[] = useMemo(() => [
    {
      header: "Cliente",
      render: (c: IClient) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
            {c.firstName[0]}{c.lastName[0]}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">
              {c.firstName} {c.lastName}
            </div>
            <div className="text-xs text-gray-500">
              ID: #{c.id}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Contacto",
      render: (c: IClient) => (
        <div>
          <div className="text-sm text-gray-900">{c.email}</div>
          <div className="text-xs text-gray-500">{c.phone}</div>
        </div>
      )
    },
    {
      header: "Estado",
      render: (c: IClient) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
            c.status === 'ACTIVE' 
            ? 'bg-green-100 text-green-800 border-green-200' 
            : 'bg-gray-100 text-gray-800 border-gray-200'
        }`}>
          {c.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      header: "Última Compra",
      render: (c: IClient) => (
        <div className="text-sm text-gray-600">
          {c.lastPurchase || 'Sin compras'}
        </div>
      )
    },
    {
      header: "Acciones",
      className: "text-right",
      render: (c: IClient) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Redirigimos a /reservas con el filtro id
            navigate(`/reservas?userId=${c.id}`);
          }}
          className="inline-flex items-center cursor-pointer gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-md text-sm font-medium transition-colors"
        >
          {/* Icono de lista/ojo opcional */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          Ver reservas
        </button>
      )
    }
  ], [navigate, onEdit]); // Agregamos navigate a las dependencias

  return (
    <GenericTableRow 
      showData={client} 
      columns={columns} 
    />
  );
});