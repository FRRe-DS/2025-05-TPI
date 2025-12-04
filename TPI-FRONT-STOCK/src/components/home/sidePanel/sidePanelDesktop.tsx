import { Box, Calendar, Tags, Users, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../context/auth/auth.context"

export default function SidePanelDesktop() {
  const location = useLocation()
  const { logout  } = useAuth()

  
  const navItems = [
    { name: "Productos", icon: Box, path: "/admin/productos" },
    { name: "Categorías", icon: Tags, path: "/admin/categorias" },
    { name: "Reservas", icon: Calendar, path: "/admin/reservas" },
    { name: "Clientes", icon: Users, path: "/admin/clientes" },
  ]

  return (
    <div className="w-full flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Titulo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <Link to="/" className="cursor-pointer hover:opacity-80 transition-opacity">
            <h3 className="text-2xl font-bold text-gray-100">STOCK</h3>
        </Link>
      </div>

      {/* Navegacion */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-6 px-3 tracking-widest">Navegación</p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <div key={item.name} className="rounded-lg transition-all duration-100">
              <Link
                to={item.path}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-100 ${
                  isActive
                    ? "bg-gray-800 text-gray-100 border-l-4 border-gray-700"
                    : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 transition-transform duration-100" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </div>
          )
        })}
      </div>
      <div>
        {/* Botón de Logout */}
        <button
          onClick={() => logout("http://localhost:5173/")}
          className="flex cursor-pointer items-center justify-center w-full px-4 py-3 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600/20 hover:border-red-500/50 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 mr-2 group-hover:translate-x-0.5 transition-transform" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-600 pt-2">
          Sistema de Gestión de Stock v1.0
        </p>
      </div>
    </div>
  )
}