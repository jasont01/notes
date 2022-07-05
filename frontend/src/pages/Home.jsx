import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
  const { notes, dispatch, accessToken } = useNotesContext()

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const refreshToken = useCallback(async () => {
    const response = await fetch('/api/auth/refresh', { method: 'POST' })
    const json = await response.json()

    dispatch({ type: 'SET_ACCESS_TOKEN', payload: json.accessToken })
  }, [dispatch])

  useEffect(() => {
    const getUser = async () => {
      if (!accessToken) return
      const response = await fetch('/api/users', {
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      })
      const json = await response.json()
      dispatch({ type: 'LOGIN_USER', payload: json })
    }

    const checkSession = async () => {
      const session = await fetch('/api/auth/loggedIn')
      const isLoggedIn = await session.json()
      console.log(isLoggedIn)
      if (isLoggedIn) {
        refreshToken()
        getUser()
      } else {
        navigate('/login')
      }
    }

    if (!accessToken) checkSession()
  }, [dispatch, navigate, refreshToken, accessToken])

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

    if (loading && accessToken) fetchNotes()
  }, [dispatch, loading, accessToken])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
    }, 14 * 60 * 1000) // refresh every 14mins before accessToken expires

    return () => clearInterval(interval)
  }, [dispatch, refreshToken])

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
