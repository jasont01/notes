import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import { getAllNotes } from '../api/notesAPI'
import Notes from '../components/Notes'
import Archive from '../components/Archive'

const Home = () => {
  const { accessToken } = useAuthContext()
  const { dispatch } = useNotesContext()
  const { dispatchAlert } = useAlertContext()

  const [loading, setLoading] = useState(true)
  const [showArchive, setShowArchive] = useState(false)

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header setShowArchive={setShowArchive} />
      </Grid>
      <Grid item xs={10}>
        {showArchive ? <Archive setShowArchive={setShowArchive} /> : <Notes />}
      </Grid>
    </Grid>
  )
}

export default Home
