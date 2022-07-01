import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
  const { notes, user, dispatch } = useNotesContext()

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json })
      }
    }

    const getUser = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'LOGIN_USER', payload: json })
        fetchNotes()
        setLoading(false)
      } else {
        navigate('/login')
      }
    }

    const handleLogin = async () => {
      const response = await fetch('/api/users/loggedIn')
      const isLoggedIn = await response.json()

      if (isLoggedIn) {
        getUser()
      } else {
        navigate('/login')
      }
    }

    if (user) {
      fetchNotes()
      setLoading(false)
    } else {
      handleLogin()
    }
  }, [dispatch, navigate, user])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Navbar />
      <Container maxWidth='md'>
        <Grid container spacing={1}>
          {notes &&
            notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
                <NoteDetails note={note} />
              </Grid>
            ))}
        </Grid>
        <NoteForm />
      </Container>
    </>
  )
}
export default Home
