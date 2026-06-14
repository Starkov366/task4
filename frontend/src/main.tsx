import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { AppRouter } from './router'
import ProtectedRoute from './router/protectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProtectedRoute>
    <App />
    </ProtectedRoute>
    <AppRouter/>
    
  </StrictMode>,
)
