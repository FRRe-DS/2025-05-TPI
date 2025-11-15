// src/pages/products/ProductDetailPage.tsx
// --- ESTE ES UN ARCHIVO DE PRUEBA / BOCETO ---

import StockStatus from "../../components/products/stockStatus";

// 1. Datos falsos para simular un producto específico con stock bajo
const productoFalso = {
  id: 1,
  nombre: "Laptop Pro X1",
  descripcion: "Laptop de última generación con 32GB RAM y RTX 4080.",
  precio: 150000,
  stock: 5, // <-- STOCK BAJO
  imagenUrl: "https://via.placeholder.com/400x300.png?text=Imagen+Producto"
};

/**
 * Esta es nuestra página de boceto para ver el detalle de un producto.
 */
export default function ProductDetailPage() {
  return (
    <div style={{ padding: '20px', color: 'white', maxWidth: '800px', margin: 'auto' }}>

      {/* Título de la página */}
      <h1 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '20px' }}>
        {productoFalso.nombre}
      </h1>

      {/* Aquí iría la lógica del layout (grid, flex) */}
      <div style={{ display: 'flex', gap: '20px' }}>

        {/* Columna Izquierda (Imagen) */}
        <div style={{ flex: 2 }}>
          <img 
            src={productoFalso.imagenUrl} 
            alt={productoFalso.nombre} 
            style={{ width: '100%', borderRadius: '8px' }} 
          />
          {/* Aquí irían las thumbnails */}
        </div>

        {/* Columna Derecha (Info) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>

          {/* --- ¡AQUÍ ESTÁ TU COMPONENTE! ---
            Lo llamamos con variant="detail" para que muestre el nuevo mensaje.
          */}
          <StockStatus stock={productoFalso.stock} variant="detail" />

          <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '10px', backgroundColor: 'white', color: 'black' }}>
            <strong>Descripción:</strong>
            <p>{productoFalso.descripcion}</p>
          </div>

          <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '10px', backgroundColor: 'white', color: 'black' }}>
            <strong>Stock Actual:</strong> {productoFalso.stock}
          </div>

          <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '10px', backgroundColor: 'white', color: 'black' }}>
            <strong>Precio:</strong> ${productoFalso.precio}
          </div>

          <div style={{ border: '1px solid gray', borderRadius: '8px', padding: '10px', backgroundColor: '#333' }}>
            <strong>BOTONES DE ACCIÓN</strong>
            {/* Aquí irían los botones reales */}
          </div>

        </div>
      </div>
    </div>
  );
}