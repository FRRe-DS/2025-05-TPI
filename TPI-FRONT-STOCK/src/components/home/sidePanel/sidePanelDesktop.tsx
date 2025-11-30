import { Box, Calendar, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
// IMPORTACIÓN: Ajusta esto a la ruta real de tu archivo NotificationContext.tsx
import { useNotification } from "../../../context/notifications/notificactions"

export default function SidePanelDesktop() {
  const location = useLocation()
  const { showNotification } = useNotification()

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

        {/* ======================================================================== */}
        {/* === AREA DE PRUEBAS (NOTIFICACIONES) - BORRAR ESTE BLOQUE AL TERMINAR === */}
        {/* ======================================================================== */}
        <div className="mt-10 pt-4 border-t border-gray-800">
            <p className="text-[10px] font-bold text-gray-600 uppercase mb-3 px-3 tracking-widest flex items-center gap-2">
                🚧 DEV TOOLS
            </p>
            <div className="px-2 space-y-2">
                <button 
                    onClick={() => showNotification('Producto guardado correctamente', 'success')}
                    className="w-full text-left px-3 py-2 rounded text-xs font-medium text-green-400 border border-green-900/30 hover:bg-green-900/20 transition-colors cursor-pointer"
                >
                    ✅ Test Success
                </button>
                <button 
                    onClick={() => showNotification('Error de conexión con el servidor', 'error')}
                    className="w-full text-left px-3 py-2 rounded text-xs font-medium text-red-400 border border-red-900/30 hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                    ❌ Test Error
                </button>
                <button 
                    onClick={() => showNotification('Bienvenido al Sistema v1.0', 'info')}
                    className="w-full text-left px-3 py-2 rounded text-xs font-medium text-blue-400 border border-blue-900/30 hover:bg-blue-900/20 transition-colors cursor-pointer"
                >
                    ℹ️ Test Info
                </button>
                {/* NUEVO BOTÓN PARA WARNING (ELIMINAR) */}
                <button 
                    onClick={() => showNotification('Producto eliminado del sistema', 'warning')}
                    className="w-full text-left px-3 py-2 rounded text-xs font-medium text-orange-400 border border-orange-900/30 hover:bg-orange-900/20 transition-colors cursor-pointer"
                >
                    ⚠️ Test Warning
                </button>
            </div>
        </div>
        {/* ======================================================================== */}
      
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4 bg-gray-900/50 text-xs text-center text-gray-600">
        Sistema de Gestión de Stock v1.0
      </div>
    </div>
  )
}