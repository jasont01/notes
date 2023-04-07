import { Container, Grid, Typography, Button } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import NoteDetails from './NoteDetails'

const Archive = ({ setShowArchive }) => {
  const { notes } = useNotesContext()

  return (
    <Container maxWidth='md'>
      <Typography variant='h5'>Archived Notes</Typography>
      <Button onClick={() => setShowArchive(false)}>Home</Button>
      <Grid container spacing={1}>
        {notes.map((note) =>
          note.archived ? (
            <Grid item xs={12} sm={6} md={4} key={note._id}>
              <NoteDetails note={note} />
            </Grid>
          ) : null
        )}
      </Grid>
    </Container>
  )
}

export default Archive
