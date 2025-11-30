import { Routes, Route, Navigate} from "react-router-dom";
import ReservationsPage from "../pages/reservations";
import Home from "../pages/home";
import ProductList from "../pages/product";
import ClientsPage from "../pages/clients";


export default function AppRouter(){
  return(
    <Routes>
      {/* Ruta principal - Muestra reservas directamente ya que no tenemos home */}
      <Route path="/" element={<Home/>}>
        <Route index element={<Navigate to="/productos" replace />} />
        <Route path="/productos" element={<ProductList />}/>
        <Route path="/reservas" element={<ReservationsPage />}/>
        <Route path="/clientes" element={<ClientsPage />}/>
      </Route>
      
      {/* Ruta alternativa para reservas */}
      <Route path="/reservations" element={<ReservationsPage />} />

    </Routes>
  );
}