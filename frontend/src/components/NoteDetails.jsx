import { useNotesContext } from '../hooks/useNotesContext'
import { Box, Button, Paper, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NoteDetails = ({ note }) => {
  const { accessToken, dispatch } = useNotesContext()

  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${note._id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + accessToken,
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_NOTE', payload: json })
    }
  }

  return (
    <Paper
      sx={{
        margin: '1em',
        padding: '1em',
        backgroundColor: '#f4f4f4',
        position: 'relative',
        paddingBottom: '1.4em',
      }}
    >
      <Typography variant='h5' mb='0.4em'>
        {note.title}
      </Typography>
      <Typography>{note.text}</Typography>
      <Box sx={{ position: 'absolute', right: '0em', top: '1em' }}>
        <Button onClick={handleDelete}>
          <DeleteForeverIcon />
        </Button>
      </Box>
      <Typography
        sx={{ fontSize: 'x-small', position: 'absolute', right: '1em' }}
      >
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </Typography>
    </Paper>
  )
}
export default NoteDetails
