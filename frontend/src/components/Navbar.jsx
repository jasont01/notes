import { Button, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
      <Button variant='contained'>Logout</Button>
    </Container>
  )
}

export default Navbar
