import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {MyNavbar} from './App.jsx'

createRoot(document.getElementById('result')).render(
  <StrictMode>
      <MyNavbar></MyNavbar>
  </StrictMode>,
)
