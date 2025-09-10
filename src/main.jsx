import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './default.css'
// import './glasmorfism.css'
import './neumorphism.css'
// import './neobrutasilm.css'
// import './y2k.css'
// import './claymorphism.css'
import {CalculadoraApp} from './calculadoraApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalculadoraApp />
  </StrictMode>,
)
