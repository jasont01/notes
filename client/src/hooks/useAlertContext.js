import { useContext } from 'react'
import { AlertContext } from '../context/AlertContext'

export const useAlertContext = () => {
  const context = useContext(AlertContext)

  if (!context) {
    throw Error('useAlertContext must be used inside a AlertContextProvider')
  }

  return context
}
