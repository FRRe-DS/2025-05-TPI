import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css'
import { queryClient } from './client'
import AppRouter from './routes/app.routes.tsx'
import App from './App.tsx'

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
