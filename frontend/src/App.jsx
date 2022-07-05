import { useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  const { dispatch, accessToken } = useAuthContext()

  const navigate = useNavigate()

  const refreshToken = useCallback(async () => {
    const response = await fetch('/api/auth/refresh', { method: 'POST' })
    const json = await response.json()

    dispatch({ type: 'SET_ACCESS_TOKEN', payload: json.accessToken })
  }, [dispatch])

  useEffect(() => {
    const getUser = async () => {
      if (!accessToken) return
      const response = await fetch('/api/users', {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      })
      const json = await response.json()
      dispatch({ type: 'LOGIN_USER', payload: json })
    }

    const checkSession = async () => {
      const session = await fetch('/api/auth/loggedIn')
      const isLoggedIn = await session.json()

      if (isLoggedIn) {
        refreshToken()
        getUser()
      } else {
        navigate('/login')
      }
    }

    if (!accessToken) checkSession()
  }, [dispatch, navigate, refreshToken, accessToken])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
    }, 14 * 60 * 1000) // refresh every 14mins before accessToken expires

    return () => clearInterval(interval)
  }, [dispatch, refreshToken])

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer position='bottom-center' theme='colored' />
    </>
  )
}

export default App
