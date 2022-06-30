import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import Navbar from '../components/Navbar'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
  const { notes, user, dispatch } = useNotesContext()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes', {
        headers: {
          authorization: 'Bearer ' + user.token,
        },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json })
      }
    }

    if (!user) {
      navigate('/login')
    } else {
      fetchNotes()
    }
  }, [dispatch, navigate, user])

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
