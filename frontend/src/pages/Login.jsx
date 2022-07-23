import { Box, Grid, Paper, Avatar, Typography, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          backgroundImage: 'url(splash.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
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
          <UserForm />
          <Grid container sx={{ justifyContent: 'center' }}>
            <Grid item>
              <Button size='small' onClick={() => navigate('/register')}>
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Login
