import { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
  const { accessToken } = useAuthContext()
  const { notes, dispatch } = useNotesContext()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      if (!accessToken) return
      const response = await fetch('/api/notes', {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json })
        setLoading(false)
      }
    }

    if (loading) fetchNotes()
  }, [dispatch, loading, accessToken])

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
