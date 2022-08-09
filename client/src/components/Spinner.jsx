import { Container, CircularProgress } from '@mui/material'
const Spinner = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  )
}
export default Spinner
