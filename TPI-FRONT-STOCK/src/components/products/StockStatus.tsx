// --- CONSTANTES DE CONFIGURACIÓN ---
const LIMITE_STOCK_BAJO = 10;
const LIMITE_STOCK_CRITICO = 3;

// --- DEFINICIÓN DE PROPS ---
type StockStatusProps = {
  stock: number;
  variant?: 'list' | 'detail';
};

export default function StockStatus({ stock, variant = 'list' }: StockStatusProps) {
  
  // 1. LÓGICA DE ESTADO
  const isOutOfStock = stock === 0;
  const isCritical = stock <= LIMITE_STOCK_CRITICO;
  const isLowStock = stock <= LIMITE_STOCK_BAJO;

  // -----------------------------------------------------------------------
  // ESCENARIO 1: PRODUCTO AGOTADO (STOCK 0)
  // -----------------------------------------------------------------------
  if (isOutOfStock) {
    if (variant === 'detail') {
      return (
         <div className="flex flex-col items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 w-full h-full min-h-[100px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <span className="font-bold text-sm">PRODUCTO AGOTADO</span>
         </div>
      );
    }
    return (
      <span className="bg-gray-200 text-gray-600 border border-gray-300 font-bold px-2 py-1 rounded text-xs whitespace-nowrap">
        AGOTADO
      </span>
    );
  }

  // -----------------------------------------------------------------------
  // ESCENARIO 2: STOCK NORMAL (SANO)
  // -----------------------------------------------------------------------
  if (!isLowStock) {
    if (variant === 'list') {
      return <span>{stock}</span>;
    }
    return (
      <div className="flex flex-col items-center justify-center h-full">
         <span className="text-3xl font-bold text-gray-800">{stock}</span>
         <span className="text-xs text-gray-500 uppercase tracking-wide">Unidades</span>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // ESCENARIO 3: ALERTA DE STOCK BAJO
  // -----------------------------------------------------------------------

  // 3.A: VISTA DETALLE (MODAL)
  if (variant === 'detail') {
    return (
      <div 
        className={`
          flex flex-col items-center justify-center text-center p-2 rounded-lg border h-full w-full
          ${isCritical ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}
        `}
      >
        
        {/* Icono: Rojo si es crítico, Naranja si es bajo */}
        <div 
          className={`
            mb-1 p-1 rounded-full 
            ${isCritical ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Título */}
        <h3 
          className={`
            font-bold text-sm leading-tight 
            ${isCritical ? 'text-red-800' : 'text-orange-800'}
          `}
        >
          {isCritical ? '¡Stock Crítico!' : 'Poco Stock'}
        </h3>
        
        {/* Texto descriptivo */}
        <p 
          className={`
            text-xs mt-1 leading-snug 
            ${isCritical ? 'text-red-700' : 'text-orange-700'}
          `}
        >
          Solo quedan <strong className="text-sm">{stock}</strong>
        </p>
      </div>
    );
  }

  // 3.B: VISTA LISTA (TABLA/CARD)
  return (
    <span 
      className={`
        font-bold px-2 py-1 rounded text-xs border whitespace-nowrap
        ${isCritical 
          ? 'bg-red-100 text-red-700 border-red-300' 
          : 'bg-orange-100 text-orange-700 border-orange-300'
        }
      `}
    >
      STOCK BAJO: {stock}
    </span>
  );
}