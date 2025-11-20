import { Box, Calendar, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function SidePanelDesktop() {
  const location = useLocation()

  const navItems = [
    { name: "Productos", icon: Box, path: "/productos" },
    { name: "Reservas", icon: Calendar, path: "/reservas" },
    { name: "Clientes", icon: Users, path: "/clientes" },
  ]

  return (
    <div className="w-full flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Titulo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <h3 className="text-2xl font-bold text-gray-100">STOCK</h3>
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

      {/* Footer */}
      <div className="border-t border-gray-800 p-4 bg-gray-900/50 text-xs text-center text-gray-600">
        Sistema de Gestión de Stock v1.0
      </div>
    </div>
  )
}
