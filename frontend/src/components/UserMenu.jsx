import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { logoutUser } from '../api/authAPI'

import { Menu, Button } from '@mantine/core'
import { IconSettings, IconLogout } from '@tabler/icons'

const UserMenu = () => {
  const { user, dispatch, accessToken } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser(accessToken)
      dispatch({ type: 'LOGOUT_USER' })
      dispatchAlert({ type: 'SUCCESS', payload: 'Logout Successful' })
      navigate('/')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  const handleSettings = () => {
    navigate('/account')
  }

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button>{user?.email}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconSettings size={14} />} onClick={handleSettings}>
          Settings
        </Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
export default UserMenu
