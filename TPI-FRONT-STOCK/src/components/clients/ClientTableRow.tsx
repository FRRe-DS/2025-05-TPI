import { memo, useMemo } from "react";
import type { IClient } from "../../types/client.interface.ts";
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow";

interface ClientTableRowProps {
  client: IClient;
  onEdit: (client: IClient) => void;
}

export const ClientTableRow = memo(function ClientTableRow({ 
  client, 
  onEdit 
}: ClientTableRowProps) {

  const columns: TableColumn<IClient>[] = useMemo(() => [
    {
      header: "Cliente",
      render: (c: IClient) => (
        <div className="flex items-center">
          {/* Avatar con iniciales */}
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
            onEdit(c);
          }}
          className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
        >
          Editar
        </button>
      )
    }
  ], [onEdit]);

  return (
    <GenericTableRow 
      showData={client} 
      columns={columns} 
    />
  );
});