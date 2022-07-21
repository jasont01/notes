import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, TextField, Button } from '@mui/material'
import { toast } from 'react-toastify'

const UserForm = ({ endpoint }) => {
  const { dispatch } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const login = { email, password }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let json

    if (response.status === 201) {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      json = await res.json()
    } else {
      json = await response.json()
    }

    if (response.ok) {
      setEmail('')
      setPassword('')
      dispatch({ type: 'LOGIN_USER', payload: json })
      navigate('/')
    } else {
      toast.error(json.error)
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
