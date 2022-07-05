import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { NotesContextProvider } from './context/NotesContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
