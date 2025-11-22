import { Routes, Route, Navigate} from "react-router-dom";
import ReservationsPage from "../pages/reservations";
import Home from "../pages/home";
import ProductList from "../pages/product";
import ClientsPage from "../pages/clients";
import HomeDashboard from "../pages/home-dashboard";

export default function AppRouter(){
  return(
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Ruta principal - Muestra reservas directamente ya que no tenemos home */}
      <Route path="/admin" element={<HomeDashboard/>}>
        <Route path="/admin" element={<Navigate to="/admin/productos" replace />} />
        <Route path="productos" element={<ProductList />}/>
        <Route path="reservas" element={<ReservationsPage />}/>
        <Route path="clientes" element={<ClientsPage />}/>
      </Route>
    </Routes>
  );
}