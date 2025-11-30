import { memo, useMemo } from "react";
import type { IProduct } from "../../types/product.interface";
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow"; 

// 1. IMPORTA TU COMPONENTE AQUÍ (Ajusta la ruta si es necesario)
import StockStatus from "./StockStatus";

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
      render: (p: IProduct) => {
        const cats = p.categorias || [];
        return (
          <div className="flex items-center">
            <div>
              <div className="text-sm font-bold text-gray-900">
                {p.nombre}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                Categoría: {cats.length > 0 
                  ? cats.map(c => c.nombre).join(', ') 
                  : 'Sin categoría'}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: "Stock",
      render: (p: IProduct) => {
        // Mantenemos la lógica defensiva que ya tenías para obtener el número
        const stock = p.stockDisponible ?? p.stock_disponible ?? p.stock ?? 0;

        // 2. REEMPLAZAMOS EL RENDERIZADO ANTERIOR POR TU COMPONENTE
        return (
          <div className="flex items-center">
             {/* Le pasamos el número limpio a tu componente */}
             <StockStatus stock={stock} />
          </div>
        );
      }
    },
    {
      header: "Precio",
      render: (p: IProduct) => (
        <div className="text-sm font-bold text-green-700">
          $ {Number(p.precio).toFixed(2)}
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