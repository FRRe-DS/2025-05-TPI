import {Box, Calendar, Users} from 'lucide-react'; 
import { Link } from 'react-router-dom';

export default function SidePanelDesktop() {

  const navItems = [
    { name: "Productos", icon: Box, path: "/productos" },
    { name: "Reservas", icon: Calendar, path: "/reservas" },
    { name: "Clientes", icon: Users, path: "/clientes" },
  ];



  return (
    <div className="w-full flex flex-col h-full">
      
      {/* Titulo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#1f1c1c]">
        <h3 className="text-xl font-bold text-white"> STOCK </h3>
      </div>

      {/* Navegacion */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-sm font-semibold text-white uppercase mb-4 px-2">Navegación</p>
        {navItems.map((item) => (
          <div 
            key={item.name}
            className="rounded-lg"
          >
            <Link to={item.path}
              className="flex items-center w-full p-3 text-lg text-white transition duration-150 rounded-lg"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      
      {/* Footer (Hice algo simple pero se puede reemplazar por botones, una seccion, etc) */}
      <div className="border-t border-gray-200 p-4 bg-[#1f1c1c] text-sm text-center text-white">
        Sistema de Gestión de Stock v1.0
      </div>
    </div>
  );
};
