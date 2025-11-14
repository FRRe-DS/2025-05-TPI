import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './client'
import './styles/index.css'
import App from './App.tsx'
import AppRouter from './routes/app.routes.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App>
          <AppRouter/>
        </App>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
