import { useAuthContext } from '../hooks/useAuthContext'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAlertContext } from '../hooks/useAlertContext'
import { Box, Paper, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { archiveNote, deleteNote } from '../api/notesAPI'
import NoteMenu from '../components/NoteMenu'

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

  const handleArchive = async () => {
    try {
      const response = await archiveNote(accessToken, note._id)

      dispatch({ type: 'UPDATE_NOTE', payload: response })
      dispatchAlert({ type: 'INFO', payload: 'note archived' })
    } catch (error) {
      dispatchAlert({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  const menuOptions = [
    {
      name: 'Edit',
      icon: EditIcon,
      onClick: handleEdit,
      disabled: note.archived,
    },
    {
      name: note.archived ? 'Unarchive' : 'Archive',
      icon: ArchiveIcon,
      onClick: handleArchive,
    },
    { name: 'Delete', icon: DeleteForeverIcon, onClick: handleDelete },
  ]

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
        <NoteMenu options={menuOptions} />
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
