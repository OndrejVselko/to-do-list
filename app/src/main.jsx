import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AccountButton, MyNavbar, NewTaskButton, ThemeButton} from './App.jsx'

createRoot(document.getElementById('result')).render(
  <StrictMode>
      <MyNavbar></MyNavbar>
      <AccountButton></AccountButton>
      <ThemeButton></ThemeButton>
      <NewTaskButton></NewTaskButton>
  </StrictMode>,
)
