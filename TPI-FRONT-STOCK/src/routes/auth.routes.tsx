import { Routes, Route, Navigate} from "react-router-dom";
import ReservationsPage from "../pages/protected/reservations";
import ProductList from "../pages/protected/product";
import ClientsPage from "../pages/protected/clients";
import HomeDashboard from "../pages/protected/home-dashboard";
import CategoriesPage from "../pages/protected/categories";
import ProtectedRoute from "../pages/protected/wrapper";

export default function AuthRouter(){
  return(
    <Routes>
      <Route
        path="/admin"
        element={<ProtectedRoute element={<HomeDashboard />} />}
      >
        <Route path="productos" element={<ProductList />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="reservas" element={<ReservationsPage />} />
        <Route path="clientes" element={<ClientsPage />} />
        <Route index element={<Navigate to="productos" replace />} />
      </Route>

    </Routes>
  );
}
