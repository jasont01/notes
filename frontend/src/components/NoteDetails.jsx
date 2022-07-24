import { useAuthContext } from '../hooks/useAuthContext'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { deleteNote } from '../api/notesAPI'

const NoteDetails = ({ note }) => {
  const { dispatch } = useNotesContext()
  const { accessToken } = useAuthContext()
  const { dispatchAlert } = useAlertContext()

  const handleEdit = async () => {
    dispatch({ type: 'EDIT_NOTE', payload: note })
  }

  const handleDelete = async () => {
    try {
      const response = await deleteNote(accessToken, note._id)
      dispatch({ type: 'DELETE_NOTE', payload: response })
      dispatchAlert({ type: 'INFO', payload: 'note deleted' })
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
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
        <ButtonGroup variant='text' size='small'>
          <Button onClick={handleEdit} size='small'>
            <EditIcon />
          </Button>
          <Button onClick={handleDelete} size='small'>
            <DeleteForeverIcon size='small' />
          </Button>
        </ButtonGroup>
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
