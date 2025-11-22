import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // YA NO importes BrowserRouter aquí
import Home from './pages/home';
import DashboardLayout from './components/common/layouts/DashboardLayout';
import Productos from './pages/product';
import Clientes from './pages/clients';
import Reservas from './pages/reservations';

function App() {
  return (
    // ELIMINAMOS <BrowserRouter> y <QueryClientProvider> de aquí porque ya están en main.tsx
    <Routes>
      
      {/* --- GRUPO 1: Rutas Públicas --- */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* --- GRUPO 2: Rutas Privadas/Dashboard --- */}
      <Route element={<DashboardLayout />}>
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/reservas" element={<Reservas />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
  );
}

export default App;