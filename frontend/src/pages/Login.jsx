import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Typography,
  Link,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { toast } from 'react-toastify'
import { useNotesContext } from '../hooks/useNotesContext'

const Login = () => {
  const { dispatch } = useNotesContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const login = { email, password }

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()

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
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Login
