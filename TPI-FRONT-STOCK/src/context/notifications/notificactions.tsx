import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TIPOS ---
// Agregamos 'warning' para tener 4 estilos distintivos
type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

// 1. CREAMOS EL CONTEXTO
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// 2. EL COMPONENTE VISUAL (La Alerta Animada)
const NotificationToast = ({ notification, onClose }: { notification: Notification | null, onClose: () => void }) => {
  if (!notification) return null;
  
  // Configuración de estilos visuales
  const styles = {
    success: 'bg-green-500 text-white shadow-green-200',
    error: 'bg-red-500 text-white shadow-red-200',
    info: 'bg-blue-600 text-white shadow-blue-200',
    warning: 'bg-orange-500 text-white shadow-orange-200', // Estilo para Eliminar/Precaución
  };

  const icons = {
    success: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    error: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    warning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
    )
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        <motion.div
          key="notification-toast"
          layout
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl ${styles[notification.type]}`}
        >
          {icons[notification.type]}
          <span className="font-semibold text-sm md:text-base">
            {notification.message}
          </span>
          <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// 3. EL PROVIDER
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    
    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <NotificationToast 
            notification={notification} 
            onClose={() => setNotification(null)} 
        />
      )}
    </NotificationContext.Provider>
  );
};

// 4. EL HOOK
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe usarse dentro de un NotificationProvider');
  }
  return context;
};