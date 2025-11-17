import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css'
import App from './App.tsx'
<<<<<<< HEAD
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
=======
import { queryClient } from './client'
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
>>>>>>> 0da8b3b3a7cf9a0dded4b6ed1c55c8fbc75686e7
  </StrictMode>,
)
