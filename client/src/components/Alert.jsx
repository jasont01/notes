import Snackbar from '@mui/material/Snackbar'
import { Alert as AlertMui } from '@mui/material'
import { useAlertContext } from '../hooks/useAlertContext'

const Alert = () => {
  const { open, severity, message, dispatchAlert } = useAlertContext()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatchAlert({ type: 'CLOSE' })
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AlertMui
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </AlertMui>
    </Snackbar>
  )
}
export default Alert
