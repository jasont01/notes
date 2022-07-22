import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Alert from './components/Alert'
import { useAuthContext } from './hooks/useAuthContext'
import { refreshToken, isLoggedIn } from './api/authAPI'
import { getUser } from './api/usersAPI'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  const { dispatch, accessToken } = useAuthContext()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkSession = async () => {
      if (await isLoggedIn()) {
        dispatch({ type: 'SET_ACCESS_TOKEN', payload: await refreshToken() })

        dispatch({ type: 'LOGIN_USER', payload: await getUser(accessToken) })
      } else {
        if (location.pathname === '/') navigate('/login')
      }
    }

    if (!accessToken) checkSession()
  }, [dispatch, navigate, accessToken, location])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
    }, 14 * 60 * 1000) // refresh every 14mins before accessToken expires

    return () => clearInterval(interval)
  }, [])

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
