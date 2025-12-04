import { useCallback, useEffect } from "react";
import type { IProduct } from "../../types/product.interface";
import StockStatus from "./StockStatus";
import { useNotification } from "../../context/notifications/notificactions";

interface ProductModalProps {
  product: IProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  
  // --- 1. HOOKS (Siempre arriba) ---
  const { showNotification } = useNotification();

  // Handlers memorizados
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // --- 2. LÓGICA Y VARIABLES DERIVADAS ---
  
  const currentStock = product?.stockDisponible ?? product?.stock_disponible ?? product?.stock ?? 0;

  // --- 3. EFECTOS ---
  
  useEffect(() => {
    // Si no está abierto o no hay producto, no hacemos nada
    if (!isOpen || !product) return;

    if (currentStock == 0) {
      showNotification('Stock Agotado', 'error');
    }else{
      if (currentStock <= 10) {
        showNotification('Stock Bajo', 'warning');
      }
    }
  }, [isOpen, product, currentStock, showNotification]);

  // --- 4. EARLY RETURN (Renderizado Condicional) ---
  if (!isOpen || !product) return null;

  // --- 5. RENDERIZADO (JSX) ---
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity"></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {product.nombre}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  ID: #{product.id}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-blue-500 rounded-lg p-2 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* Info General Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Precio</p>
                <p className="text-xl font-bold text-green-600">
                  ${product.precio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Stock Disponible</p>
                <div className="mt-1">
                  {/* Usamos la variable calculada 'currentStock' */}
                  <StockStatus stock={currentStock} variant="detail" />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Peso</p>
                <p className="text-lg font-bold text-gray-900">
                  {product.pesoKg ? `${product.pesoKg} kg` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Descripción</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                {product.descripcion || "Sin descripción disponible."}
              </div>
            </div>

            {/* Categorías */}
            {product.categorias && product.categorias.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Categorías</h3>
                <div className="flex flex-wrap gap-2">
                  {product.categorias.map((cat, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                    >
                      {cat.nombre.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detalles Técnicos (Dimensiones y Ubicación) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dimensiones */}
              {product.dimensiones && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Dimensiones
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Alto:</span> <span className="font-medium">{product.dimensiones.altoCm} cm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Ancho:</span> <span className="font-medium">{product.dimensiones.anchoCm} cm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Largo:</span> <span className="font-medium">{product.dimensiones.largoCm} cm</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Ubicación */}
              {product.ubicacion && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ubicación en Almacén
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">{product.ubicacion.calle}</p>
                    <p>{product.ubicacion.ciudad}, {product.ubicacion.provincia}</p>
                    <p>{product.ubicacion.codigoPostal}, {product.ubicacion.pais}</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}