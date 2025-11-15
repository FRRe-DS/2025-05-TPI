// src/pages/products/ProductListPage.tsx

import StockStatus from "../../components/products/stockStatus"; // 1. Importamos tu componente!

// 2. Definimos datos falsos ("harcodeados") para nuestra prueba.
const productosDePrueba = [
  {
    id: 1,
    nombre: "Laptop Pro X1",
    precio: 150000,
    stock: 200, // <-- STOCK BAJO
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico",
    precio: 45000,
    stock: 150, // <-- STOCK NORMAL
  },
  {
    id: 3,
    nombre: "Teclado Mecánico",
    precio: 90000,
    stock: 10, // <-- EN EL LÍMITE
  },
];

/**
 * Esta es nuestra página de prueba para listar productos.
 */
export default function ProductListPage() {
  return (
    // Cambiamos el color de texto principal a 'white' para el título
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Lista de Productos (Prueba)</h1>

      {/* 3. Usamos .map() para "dibujar" cada producto de nuestro array */}
      {productosDePrueba.map((producto) => (
        
        // Esta es la "caja" de cada producto
        <div 
          key={producto.id} 
          style={{ 
            // --- ESTILOS VISUALES ---
            border: '1px solid gray', 
            borderRadius: '8px', 
            padding: '10px', 
            margin: '10px 0',
            backgroundColor: 'white', // Fondo blanco para la caja
            
            // --- CAMBIO 1: ARREGLAR COLOR DE TEXTO ---
            // Ponemos el color 'black' aquí para que el texto
            // dentro de esta caja sea visible sobre el fondo blanco.
            color: 'black',
            
            // --- CAMBIO 2: DISEÑO EN COLUMNAS (FLEXBOX) ---
            display: 'flex',          // 1. Pone los elementos internos en fila
            flexDirection: 'row',     //    (horizontalmente)
            justifyContent: 'space-between', // 2. Separa los elementos para que usen el espacio
            alignItems: 'center'      // 3. Alinea todo verticalmente al centro
          }}
        >
          {/* Cambiamos <h3> y <p> por <div>s para que Flexbox los trate 
            como "columnas" y les damos peso (flex) para distribuir el espacio.
          */}
          
          {/* Columna 1: Nombre (le damos más espacio) */}
          <div style={{ flex: 2, paddingRight: '10px' }}>
            <strong>{producto.nombre}</strong>
          </div>
          
          {/* Columna 2: Precio */}
          <div style={{ flex: 1, paddingRight: '10px' }}>
            ${producto.precio}
          </div>
          
          {/* Columna 3: Stock (Aquí usamos tu componente) */}
          <div style={{ flex: 1, paddingRight: '10px' }}>
            <StockStatus stock={producto.stock} />
          </div>

          {/* Columna 4: Botones (como en tu boceto) */}
          <div style={{ flex: 1, textAlign: 'right' }}>
            <button style={{
              padding: '5px 10px', 
              cursor: 'pointer', 
              backgroundColor: '#eee', 
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}>
              Acciones
            </button>
          </div>
          
        </div>
      ))}
    </div>
  );
}