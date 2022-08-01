import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { loginUser } from '../api/authAPI'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const navigate = useNavigate()

  const login = async (email, password) => {
    setIsLoading(true)

    try {
      const user = await loginUser({ email, password })

      dispatch({ type: 'LOGIN_USER', payload: user })

      dispatchAlert({
        type: 'SUCCESS',
        payload: 'Login Successful',
      })

      navigate('/')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }

    setIsLoading(false)
  }

  return { login, isLoading }
}
