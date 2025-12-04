import React from "react";
import SidePanel from "../../home/sidePanel/sidePanel"; // Ajusta esta ruta si es necesario
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="block lg:flex lg:flex-row min-h-screen bg-gray-100"> 
      {/* Agregué min-h-screen y bg para que no se vea blanco roto */}
      
      <div className="w-full lg:w-[15%]">
        <SidePanel />
      </div>
      
      <main className="w-full lg:w-[85%] p-4">
        {/* Aquí es donde se inyectan /productos, /clientes, etc. */}
        <Outlet />
      </main>
    </div>
  );
}