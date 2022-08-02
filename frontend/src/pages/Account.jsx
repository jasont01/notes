import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { Container, Button, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import Sessions from '../components/Sessions'

const Account = () => {
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const handleChangeEmail = () => {
    console.log('change email')
  }

  const handleChangePassword = () => {
    console.log('change password')
  }

  const handleDelete = () => {
    console.log('Delete Account')
  }

  return (
    <>
      <Navbar />
      <Container maxWidth='sm'>
        <Button onClick={() => navigate('/')}>Go Back</Button>
        <Typography variant='h5'>Account Settings</Typography>
        <div>
          <div>
            <Typography>Email address</Typography>
            {user.email}
            <Button onClick={handleChangeEmail}>Change</Button>
          </div>

          <Button onClick={handleChangePassword}>change password</Button>
          <hr />
          <Sessions />
          <div>
            <hr />
            <Button onClick={handleDelete} color='error' size='small'>
              Delete Account
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
export default Account
