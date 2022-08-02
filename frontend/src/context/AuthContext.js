import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: {
          _id: action.payload.user._id,
          email: action.payload.user.email,
        },
        accessToken: action.payload.accessToken,
      }
    case 'LOGOUT_USER':
      return {
        user: null,
        accessToken: null,
      }
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload,
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    accessToken: null,
  })

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
