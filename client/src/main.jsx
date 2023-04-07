import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { NotesContextProvider } from './context/NotesContext'
import { AuthContextProvider } from './context/AuthContext'
import { AlertContextProvider } from './context/AlertContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <AuthContextProvider>
        <NotesContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotesContextProvider>
      </AuthContextProvider>
    </AlertContextProvider>
  </React.StrictMode>
)
