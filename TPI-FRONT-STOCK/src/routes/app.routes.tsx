import { Routes, Route } from "react-router-dom";
import ReservationsPage from "../pages/reservations";
import { ProductListView } from "@/components/product-list-view";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductListView />} />
      <Route path="/reservas" element={<ReservationsPage />} />
      <Route path="/reservations" element={<ReservationsPage />} />
    </Routes>
  );
}
