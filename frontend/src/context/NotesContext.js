import { createContext, useReducer } from 'react'

export const NotesContext = createContext()

export const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
      }
    case 'CREATE_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      }
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((n) => n._id !== action.payload._id),
      }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT_USER':
      return {
        notes: null,
        user: null,
      }
    default:
      return state
  }
}

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: null,
    user: null,
  })

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}
