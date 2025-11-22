import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Router aquí
import { QueryClientProvider } from '@tanstack/react-query' // 2. Provider de Query aquí
import { queryClient } from './client/react-query' // 3. Tu cliente configurado
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)