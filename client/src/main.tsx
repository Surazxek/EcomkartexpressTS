import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from './providers/react-query.provider.tsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
    <App />
    <Toaster position="bottom-right" reverseOrder={false} />
    </QueryProvider>
  </StrictMode>,
)
