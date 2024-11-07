import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globalStyles/index.css';
import App from './components/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
