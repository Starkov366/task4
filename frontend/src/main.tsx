import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { AppRouter } from './router'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
    <App />

    <AppRouter/>
    
  </StrictMode>,
)
