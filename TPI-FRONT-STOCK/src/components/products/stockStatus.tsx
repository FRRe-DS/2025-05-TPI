// src/components/products/StockStatus.tsx

const LIMITE_STOCK_BAJO = 10;

/**
 * Props: Ahora incluimos una prop 'variant' para elegir el estilo de la alerta.
 */
type StockStatusProps = {
  stock: number;
  variant?: 'list' | 'detail'; // <-- NUEVO: Define si es la vista de lista o detalle
};

/**
 * Este componente maneja la lógica y el renderizado de la alerta.
 */
export default function StockStatus({ stock, variant = 'list' }: StockStatusProps) {
  
  const isLowStock = stock <= LIMITE_STOCK_BAJO;

  // --- Caso 1: Stock Normal ---
  // Si el stock es normal (mayor a 10), devolvemos el número sin estilo,
  // pero solo si estamos en la vista de lista (para mostrar el número).
  if (!isLowStock) {
    return variant === 'list' ? <span>{stock}</span> : null;
  }

  // --- Caso 2: Stock Bajo (El mensaje de alerta) ---

  // 2a. Lógica para la Vista de DETALLE (El nuevo requisito)
  if (variant === 'detail') {
    return (
      // El nuevo mensaje largo, sin bordes
      <div style={{ color: 'red', fontWeight: 'bold', fontSize: '1.1em' }}>
        STOCK BAJO, RECUERDE ACTUALIZARLO
      </div>
    );
  }

  // 2b. Lógica para la Vista de LISTA (Default, lo que ya teníamos con recuadro)
  return (
    <span style={{
      color: 'red',                
      fontWeight: 'bold',          
      border: '1px solid red',   // Borde fino rojo
      padding: '2px 5px',        
      borderRadius: '4px'    
    }}>
      STOCK BAJO: {stock}
    </span>
  );
}