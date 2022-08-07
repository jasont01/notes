import { Container, Divider, Button } from '@mui/material'

const Navbar = ({ setShowArchive }) => {
  return (
    <Container maxWidth='xs' sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={() => setShowArchive(false)}>Home</Button>
      <Button onClick={() => setShowArchive(true)}>Archived</Button>
      <Divider />
      <Button>Setting</Button>
    </Container>
  )
}

export default Navbar
