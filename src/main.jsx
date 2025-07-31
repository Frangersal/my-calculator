import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {CalculadoraApp} from './calculadoraApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalculadoraApp />
  </StrictMode>,
)
