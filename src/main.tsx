import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { NoticiasProvider } from './components/Tidings/noticiasContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NoticiasProvider>
        <App />
      </NoticiasProvider>
    </BrowserRouter>
  </StrictMode>,
)
