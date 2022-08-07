import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Backdrop,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signup, isLoading } = useSignup()

  const navigate = useNavigate()

  //TODO: add password confirm
  const handleSubmit = async (e) => {
    e.preventDefault()

    signup(email, password)
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(splash.jpg)',
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
            Register
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
              id='username'
              label='Username'
              name='username'
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <TextField
              margin='normal'
              required
              fullWidth
              name='password-confirm'
              label='Confirm Password'
              type='password'
              id='password-confirm'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Box>
          <Grid container sx={{ justifyContent: 'center' }}>
            <Grid item>
              <Button size='small' onClick={() => navigate('/login')}>
                {'Already have an account? Log In'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Register
