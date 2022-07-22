import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { Box, TextField, Button } from '@mui/material'
import { loginUser } from '../api/authAPI'
import { registerUser } from '../api/usersAPI'

const UserForm = ({ register = false }) => {
  const { dispatch } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = { email, password }

    if (register) {
      try {
        await registerUser(formData)
      } catch (error) {
        dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
        return
      }
    }

    try {
      const user = await loginUser(formData)
      dispatch({ type: 'LOGIN_USER', payload: user })
      setEmail('')
      setPassword('')
      dispatchAlert({
        type: 'SUCCESS',
        payload: register ? 'Registration Successful' : 'Login Successful',
      })
      navigate('/')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  return (
    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  )
}
export default UserForm
