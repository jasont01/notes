import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { useAuthContext } from './hooks/useAuthContext'
import { getSession } from './api/authAPI'
import Alert from './components/Alert'
import Spinner from './components/Spinner'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  const { dispatch, accessToken } = useAuthContext()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'LOGIN_USER', payload: response.data })
      }
      setLoading(false)
    })
  }, [dispatch])

  useEffect(() => {
    if (!accessToken) return
    const interval = setInterval(async () => {
      const response = await getSession()

      dispatch({ type: 'SET_ACCESS_TOKEN', payload: response.data.accessToken })
    }, 14 * 60 * 1000)

    return () => clearInterval(interval)
  }, [accessToken, dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          path='/'
          element={accessToken ? <Home /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Alert />
    </>
  )
}

export default App
