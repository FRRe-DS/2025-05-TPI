"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Box, Calendar, Users, Menu, User, Tags } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function SidePanelMobile() {
  const [stockPanelOpen, setStockPanelOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Productos", icon: Box, path: "/admin/productos" },
    { name: "Categorías", icon: Tags, path: "/admin/categorias" },
    { name: "Reservas", icon: Calendar, path: "/admin/reservas" },
    { name: "Clientes", icon: Users, path: "/admin/clientes" },
  ]

  return (
    <div className="relative z-50">
      {/* Barra superior cuando no se muestra la barra lateral en celulares */}
      <div className="w-full p-3 h-auto flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800">
        <button
          onClick={() => setStockPanelOpen(true)}
          className="p-2 border border-gray-700 rounded-lg shadow hover:cursor-pointer transition hover:border-gray-600 hover:bg-gray-800 flex items-center"
        >
          <Menu className="h-6 w-6 text-gray-400" />
        </button>

        <button className="p-2 border border-gray-700 rounded-lg shadow hover:cursor-pointer transition hover:border-gray-600 hover:bg-gray-800 flex items-center">
          <User className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <AnimatePresence>
        {stockPanelOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setStockPanelOpen(false)}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 h-full w-[90%] max-w-md bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Titulo */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
                  <h3 className="text-2xl font-bold text-gray-100">STOCK</h3>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                      onClick={() => setStockPanelOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-800 transition"
                      aria-label="Cerrar panel de stock"
                    >
                      <X className="h-6 w-6 text-gray-400" />
                    </button>
                  </motion.div>
                </div>

                {/* Navegacion */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-6 px-3 tracking-widest">Navegación</p>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-lg"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-100 ${
                            isActive
                              ? "bg-gray-800 text-gray-100 border-l-4 border-gray-700"
                              : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-800 p-4 bg-gray-900/50 text-xs text-center text-gray-600">
                  Sistema de Gestión de Stock v1.0
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
