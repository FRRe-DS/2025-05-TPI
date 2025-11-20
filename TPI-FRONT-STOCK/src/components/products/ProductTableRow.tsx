import { memo, useMemo } from "react";
import type { IProduct } from "../../types/product.interface"; // Usamos la interfaz global
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow"; 


interface ProductTableRowProps {
  product: IProduct;
  onViewDetails: (product: IProduct) => void;
}

export const ProductTableRow = memo(function ProductTableRow({ 
  product, 
  onViewDetails 
}: ProductTableRowProps) {

  const columns: TableColumn<IProduct>[] = useMemo(() => [
    {
      header: "Producto",
      render: (p: IProduct) => (
        <div className="flex items-center">
          <div>
            <div className="text-sm font-bold text-gray-900">
              {p.name}
            </div>
            <div className="text-xs text-gray-500 uppercase">
              {/* Mapeamos las categorías para mostrar sus nombres separados por coma */}
              Categoría: {p.categories && p.categories.length > 0 
                ? p.categories.map(c => c.name).join(', ') 
                : 'Sin categoría'}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Stock",
      render: (p: IProduct) => (
        <div className="flex items-center">
          {/* Usamos availableStock del back */}
          <span className={`text-sm font-bold ${p.availableStock > 0 ? 'text-gray-900' : 'text-red-600'}`}>
            {p.availableStock} unidades
          </span>
        </div>
      )
    },
    {
      header: "Precio",
      render: (p: IProduct) => (
        <div className="text-sm font-bold text-green-700">
          {/* Usamos unitPrice del back */}
          $ {Number(p.unitPrice).toFixed(2)}
        </div>
      )
    },
    {
      header: "Acciones",
      className: "text-right",
      render: (p: IProduct) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(p);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md cursor-pointer"
        >
          Ver detalles
        </button>
      )
    }
  ], [onViewDetails]);

  return (
    <GenericTableRow 
      showData={product} 
      columns={columns} 
    />
  );
});