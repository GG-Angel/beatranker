import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import App from './App.tsx'
import GlobalProvider from '../context/GlobalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
      <Analytics />
    </GlobalProvider>
  </StrictMode>,
)
