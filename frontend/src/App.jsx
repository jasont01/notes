import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Alert from './components/Alert'
import { useAuthContext } from './hooks/useAuthContext'
import { refreshToken, getSession } from './api/authAPI'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  const { dispatch, accessToken } = useAuthContext()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session.accessToken) {
        dispatch({ type: 'LOGIN_USER', payload: session })
      } else {
        if (location.pathname === '/') navigate('/login')
      }
    }

    if (!accessToken) checkSession()
  }, [dispatch, navigate, accessToken, location])

  useEffect(() => {
    if (!accessToken) return
    const interval = setInterval(async () => {
      const response = await refreshToken()
      dispatch({ type: 'SET_ACCESS_TOKEN', payload: response.accessToken })
    }, 14 * 60 * 1000)

    return () => clearInterval(interval)
  }, [accessToken, dispatch])

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Alert />
    </>
  )
}

export default App
