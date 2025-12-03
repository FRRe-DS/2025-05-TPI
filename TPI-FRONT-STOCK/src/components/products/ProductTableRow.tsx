import { memo, useMemo } from "react";
import type { IProduct } from "../../types/product.interface";
import GenericTableRow from "../common/ui/table/tablerow";
import type { TableColumn } from "../common/ui/table/tablerow"; 

// 1. IMPORTA TU COMPONENTE AQUÍ
import StockStatus from "./StockStatus";

interface ProductTableRowProps {
  product: IProduct;
  onViewDetails: (product: IProduct) => void;
  onEdit: (product: IProduct) => void;
}

export const ProductTableRow = memo(function ProductTableRow({ 
  product, 
  onViewDetails, 
  onEdit // <--- Recibimos la función
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
        const stock = p.stockDisponible ?? p.stock_disponible ?? p.stock ?? 0;
        return (
          <div className="flex items-center">
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
        <div className="flex justify-end items-center gap-2">
            
            {/* --- BOTÓN EDITAR (NUEVO) --- */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(p); // Ejecutamos la función de editar
              }}
              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
              title="Editar producto"
            >
              {/* Icono Lápiz */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            {/* --- BOTÓN VER DETALLES (EXISTENTE) --- */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(p);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md cursor-pointer"
            >
              Ver detalles
            </button>
        </div>
      )
    }
  ], [onViewDetails, onEdit]); // <--- IMPORTANTE: Agregamos onEdit a las dependencias

  return (
    <GenericTableRow 
      showData={product} 
      columns={columns} 
    />
  );
});