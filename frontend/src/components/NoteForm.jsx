import { useState, useEffect } from 'react'
import { Container, Box, Button, TextField, Typography } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { createNote, updateNote } from '../api/notesAPI'

const NoteForm = () => {
  const { dispatch, edit } = useNotesContext()
  const { accessToken } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    setTitle(edit?.title || '')
    setText(edit?.text || '')
  }, [edit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const note = { title, text }

    try {
      if (edit) {
        const response = await updateNote(accessToken, edit._id, note)
        dispatch({ type: 'UPDATE_NOTE', payload: response })
      } else {
        const response = await createNote(accessToken, note)
        dispatch({ type: 'CREATE_NOTE', payload: response })
      }
      setTitle('')
      setText('')
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  return (
    <Container maxWidth='xs'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        m='1em'
        mt='3em'
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Typography variant='h5'>{edit ? 'Edit Note' : 'Add Note'}</Typography>
        <TextField
          size='small'
          name='title'
          id='title'
          label='Title'
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          sx={{ marginY: '1em' }}
          value={title}
        />
        <TextField
          size='small'
          name='text'
          id='text'
          multiline
          rows={3}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button
          type='submit'
          variant='contained'
          sx={{ marginY: '1em' }}
          disabled={title.length === 0 || text.length === 0}
        >
          {edit ? 'Update' : 'Add'}
        </Button>
      </Box>
    </Container>
  )
}
export default NoteForm
