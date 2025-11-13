import { Routes, Route } from "react-router-dom";
import ReservationsPage from "../pages/reservations";

export default function AppRouter(){
  return(
    <Routes>
      {/* Ruta principal - Muestra reservas directamente ya que no tenemos home */}
      <Route path="/" element={<ReservationsPage />} />
      
      {/* Ruta alternativa para reservas */}
      <Route path="/reservations" element={<ReservationsPage />} />
    </Routes>
  );
}