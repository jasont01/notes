import { Button, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { logoutUser } from '../api/authAPI'

const Navbar = () => {
  const { user, dispatch } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch({ type: 'LOGOUT_USER' })
      dispatchAlert({ type: 'SUCCESS', payload: 'Logout Successful' })
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  return (
    <Container
      component='header'
      maxWidth='md'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2em',
      }}
    >
      <Link to='/'>
        <Typography variant='h4' color='black'>
          Notes
        </Typography>
      </Link>
      {user && <Typography sx={{ fontSize: '1em' }}>{user.email}</Typography>}
      <Button variant='contained' onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default Navbar
