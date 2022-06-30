import { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
  const { notes, dispatch } = useNotesContext()

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('/api/notes')
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_NOTES', payload: json })
      }
    }
    fetchNotes()
  }, [dispatch])

  return (
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
  )
}
export default Home
