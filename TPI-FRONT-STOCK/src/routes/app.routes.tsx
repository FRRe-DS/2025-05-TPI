import { Routes, Route, Navigate } from "react-router-dom";
import ReservationsPage from "../pages/reservations";
import ProductListPage from "../pages/products/productListPage";
import ProductDetailPage from "../pages/products/productDetailPage";

export default function AppRouter(){
  return(
    <Routes>
      {/* Ruta principal - Muestra reservas directamente ya que no tenemos home */}
      <Route path="/" element={<ReservationsPage />} />
      
      {/* Ruta alternativa para reservas */}
      <Route path="/reservations" element={<ReservationsPage />} />

      {/*Ruta para mostrar los productos */}
      <Route path="/productos" element={<ProductListPage />} />

      {/* AGREGÁ ESTA LÍNEA NUEVA PARA TU PRUEBA */}
      <Route path="/producto-detalle-prueba" element={<ProductDetailPage />} />

    </Routes>
  );
}