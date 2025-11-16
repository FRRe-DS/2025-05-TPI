import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Calendar, Users, Menu, User } from 'lucide-react'; 
import { Link } from 'react-router-dom';

export default function SidePanelMobile() {
  const [stockPanelOpen, setStockPanelOpen] = useState(false);

  const navItems = [
    { name: "Productos", icon: Box, path: "/productos" },
    { name: "Reservas", icon: Calendar, path: "/reservas" },
    { name: "Clientes", icon: Users, path: "/clientes" },
  ];

  return (
    <div className="relative z-50"> 
      {/* Barra superior cuando no se muestra la barra lateral en celulares */}
      <div className='w-full p-2 h-auto flex justify-between items-center bg-[#1f1c1c]'>
        <button
          onClick={() => setStockPanelOpen(true)}
          className="p-2 border-2 border-white rounded-md shadow hover:cursor-pointer transition flex items-center"
        >
          <Menu className="h-6 w-6 text-white rouded" />
        </button>

        <button
          className="p-2 border-2 border-white rounded-md shadow hover:cursor-pointer transition flex items-center"
        >
          <User className="h-6 w-6 text-white rouded" />
        </button>
      </div>
      

      <AnimatePresence>
        {stockPanelOpen && (
          <div 
            className="fixed inset-0 z-101 bg-black/50" 
            onClick={() => setStockPanelOpen(false)} 
          >
            <motion.div
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }} 
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} 
              className="absolute left-0 top-0 h-full w-[90%] max-w-md bg-[#1f1c1c] shadow-2xl" 
            >
              <div className="flex flex-col h-full">
                
                {/* Titulo */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#1f1c1c]">
                  <h3 className="text-xl font-bold text-white"> STOCK </h3>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                      onClick={() => setStockPanelOpen(false)} 
                      className="p-2 rounded-full hover:bg-cyan-200 transition"
                      aria-label="Cerrar panel de stock"
                    >
                      <X className="h-6 w-6 text-white" />
                    </button>
                  </motion.div>
                </div>

                {/* Navegacion */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  <p className="text-sm font-semibold text-white uppercase mb-4 px-2">Navegación</p>
                  {navItems.map((item) => (
                    <motion.div 
                      key={item.name}
                      whileHover={{ scale: 1.01, backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.99 }}
                      className="rounded-lg"
                    >
                      <Link to={item.path}
                        className="flex items-center w-full p-3 text-lg text-white transition duration-150 rounded-lg"
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Footer (Hice algo simple pero se puede reemplazar por botones, una seccion, etc) */}
                <div className="border-t border-gray-200 p-4 bg-[#1f1c1c] text-sm text-center text-white">
                  Sistema de Gestión de Stock v1.0
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
