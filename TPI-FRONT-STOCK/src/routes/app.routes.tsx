import { Routes, Route} from "react-router-dom";
import ReservationsPage from "../pages/reservations";
import Home from "../pages/home";

export default function AppRouter(){
  return(
    <Routes>
      {/* Ruta principal - Muestra reservas directamente ya que no tenemos home */}
      <Route path="/" element={<Home/>}>
        <Route path="/productos" element={<h1 className="text-2xl">RUTA DE PRODUCTOS</h1>}/>
        <Route path="/reservas" element={<ReservationsPage />}/>
        <Route path="/clientes" element={<h1 className="text-2xl">RUTA DE CLIENTES</h1>}/>
      </Route>
      
      {/* Ruta alternativa para reservas */}
      <Route path="/reservations" element={<ReservationsPage />} />
    </Routes>
  );
}