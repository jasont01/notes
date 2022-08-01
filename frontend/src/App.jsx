import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { useAuthContext } from './hooks/useAuthContext'
import { getSession } from './api/authAPI'
import Alert from './components/Alert'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Account from './pages/Account'

const App = () => {
  const { dispatch, accessToken } = useAuthContext()

  useEffect(() => {
    const checkSession = async () => {
      const response = await getSession()
      if (response.status === 200) {
        dispatch({ type: 'LOGIN_USER', payload: response.data })
      }
    }

    if (!accessToken) checkSession()
  }, [accessToken, dispatch])

  useEffect(() => {
    if (!accessToken) return
    const interval = setInterval(async () => {
      const response = await getSession()

      dispatch({ type: 'SET_ACCESS_TOKEN', payload: response.data.accessToken })
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
        <Route path='/account' element={<Account />} />
      </Routes>
      <Alert />
    </>
  )
}

export default App
