import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { logoutUser } from '../api/authAPI'

import { Menu } from '@mantine/core'
import { IconSettings, IconLogout, IconArchive } from '@tabler/icons'
import { Avatar } from '@mui/material'

const UserMenu = ({ setShowArchive }) => {
  const { user, dispatch, accessToken } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser(accessToken)
      dispatch({ type: 'LOGOUT_USER' })
      dispatchAlert({ type: 'SUCCESS', payload: 'Logout Successful' })
      navigate('/login')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  const handleSettings = () => {
    navigate('/account')
  }

  if (!user) return null

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Avatar src={null}>{user.email.charAt(0)}</Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<Avatar />}>{user.email}</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          icon={<IconArchive size={14} />}
          onClick={() => setShowArchive(true)}
        >
          Archived
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />} onClick={handleSettings}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
export default UserMenu
