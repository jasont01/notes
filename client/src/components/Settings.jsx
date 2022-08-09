import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { Container, Button, Typography } from '@mui/material'
import Sessions from './Sessions'
import {
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
} from '../api/usersAPI'
import { useNavigate } from 'react-router-dom'

const Account = () => {
  const { user, accessToken, dispatch } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const navigate = useNavigate

  const handleChangeUsername = async () => {
    //TODO: client-side validation
    //TODO: show modal
    updateUsername(accessToken)
  }

  const handleChangeEmail = async () => {
    //TODO: client-side validation
    //TODO: show modal
    updateEmail(accessToken)
  }

  const handleChangePassword = async () => {
    //TODO: client-side validation
    //TODO: show modal
    updatePassword(accessToken)
  }

  const handleDelete = async () => {
    //TODO: confirm

    try {
      await deleteUser(accessToken)
      //TODO: not working
      dispatch({ type: 'LOGOUT_USER' })
      dispatchAlert({ type: 'SUCCESS', payload: 'Account Deleted' })
      navigate('/login')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  return (
    <>
      <Container maxWidth='sm'>
        <Typography variant='h5'>Account Settings</Typography>
        <div>
          <div>
            <Typography>Username</Typography>
            {user.username}
            <Button onClick={handleChangeUsername}>Change</Button>
          </div>
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
