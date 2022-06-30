import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position='bottom-center' theme='colored' />
    </>
  )
}

export default App
