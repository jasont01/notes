import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { registerUser } from '../api/usersAPI'
import { loginUser } from '../api/authAPI'

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const navigate = useNavigate()

  const signup = async (username, email, password) => {
    setIsLoading(true)

    try {
      await registerUser({ username, email, password })

      const user = await loginUser({ login: username, password })

      dispatch({ type: 'LOGIN_USER', payload: user })

      dispatchAlert({
        type: 'SUCCESS',
        payload: 'Registration Successful',
      })

      navigate('/')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }

    setIsLoading(false)
  }

  return { signup, isLoading }
}
