import type { ReactNode } from "react";

// Definimos la estructura de una columna
export interface TableColumn<T> {
  header?: string;
  className?: string;
  render: (data: T) => ReactNode; // Función que decide qué mostrar en la celda
}

interface GenericTableRowProps<T> {
  showData: T;                // El dato (Reserva, Producto, Cliente)
  columns: TableColumn<T>[];  // La configuración de las columnas
  className?: string;
  onClick?: () => void;
}

export default function GenericTableRow<T>({ 
  showData, 
  columns, 
  className = "",
  onClick 
}: GenericTableRowProps<T>) {
  
  // Esto cumple la función del bucle de la imagen pero de forma correcta
  const rowContent = columns.map((col, index) => (
    <td 
      key={index} 
      className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}
    >
      {/* Aquí ejecutamos la función render pasando el dato */}
      {col.render(showData)}
    </td>
  ));

  return (
    <tr 
      onClick={onClick}
      className={`hover:bg-blue-50 transition-colors duration-150 ${className}`}
    >
      {rowContent}
    </tr>
  );
}