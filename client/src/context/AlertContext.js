import { createContext, useReducer } from 'react'

export const AlertContext = createContext()

export const alertReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return { open: true, severity: 'error', message: action.payload }
    case 'WARN':
      return { open: true, severity: 'warning', message: action.payload }
    case 'INFO':
      return { open: true, severity: 'info', message: action.payload }
    case 'SUCCESS':
      return { open: true, severity: 'success', message: action.payload }
    case 'CLOSE':
      return { ...state, open: false }
    default:
      return state
  }
}

export const AlertContextProvider = ({ children }) => {
  const [state, dispatchAlert] = useReducer(alertReducer, {
    open: false,
    severity: 'info',
    message: null,
  })

  return (
    <AlertContext.Provider value={{ ...state, dispatchAlert }}>
      {children}
    </AlertContext.Provider>
  )
}
