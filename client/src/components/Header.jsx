import { Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'

const Navbar = ({ setShowArchive }) => {
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
      <UserMenu setShowArchive={setShowArchive} />
    </Container>
  )
}

export default Navbar
