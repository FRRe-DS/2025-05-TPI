import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Router aquí
import { QueryClientProvider } from '@tanstack/react-query' // 2. Provider de Query aquí
import { queryClient } from './client/react-query' // 3. Tu cliente configurado
import './styles/index.css'
import AppRouter from './routes/app.routes.tsx'
import { NotificationProvider } from './context/notifications/notificactions.tsx' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AppRouter/>
      </NotificationProvider>
    </QueryClientProvider>
  </BrowserRouter>
)