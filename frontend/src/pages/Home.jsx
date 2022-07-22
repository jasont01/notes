import { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'
import { getAllNotes } from '../api/notesAPI'

const Home = () => {
  const { accessToken } = useAuthContext()
  const { notes, dispatch } = useNotesContext()
  const { dispatchAlert } = useAlertContext()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes(accessToken)
        dispatch({ type: 'SET_NOTES', payload: response })
        setLoading(false)
      } catch (error) {
        dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
      }
    }

    if (loading && accessToken) fetchNotes()
  }, [dispatch, loading, accessToken, dispatchAlert])

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
