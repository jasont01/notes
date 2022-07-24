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
    case 'EDIT_NOTE':
      return {
        ...state,
        edit: action.payload,
      }
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id !== action.payload._id ? note : action.payload
        ),
        edit: null,
      }
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((n) => n._id !== action.payload._id),
        edit: null,
      }
    default:
      return state
  }
}

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: null,
    edit: null,
  })

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}
