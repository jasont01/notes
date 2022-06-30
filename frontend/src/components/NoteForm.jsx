import { useState } from 'react'
import { Container, Box, Button, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useNotesContext } from '../hooks/useNotesContext'

const NoteForm = () => {
  const { user, dispatch } = useNotesContext()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const note = { title, text }

    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + user.token,
      },
    })
    const json = await response.json()

    if (response.ok) {
      setTitle('')
      setText('')
      dispatch({ type: 'CREATE_NOTE', payload: json })
    } else {
      toast.error(json.error)
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
        <Typography variant='h5'>Add Note</Typography>
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
        <Button type='submit' variant='contained' sx={{ marginY: '1em' }}>
          Add
        </Button>
      </Box>
    </Container>
  )
}
export default NoteForm
