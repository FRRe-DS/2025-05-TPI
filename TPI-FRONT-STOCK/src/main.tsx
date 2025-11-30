import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css'
import App from './App.tsx'
import { queryClient } from './client/react-query.ts'
import AppRouter from './routes/app.routes.tsx'

// 1. IMPORTAMOS EL PROVIDER
// Asegúrate de que esta ruta coincida con donde guardaste el archivo.
// Si usaste mi código anterior, es esta:
import { NotificationProvider } from './context/notifications/notificactions.tsx' 
// Si usaste tu ruta con el error de tipeo, sería: './context/notifications/notificactions'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        
        {/* 2. ENVOLVEMOS TODA LA APP AQUÍ */}
        <NotificationProvider>
          <App>
            <AppRouter/>
          </App>
        </NotificationProvider>

      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)