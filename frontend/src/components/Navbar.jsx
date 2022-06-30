import { Button, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'

const Navbar = () => {
  const { user, dispatch } = useNotesContext()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' })
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
