import { Container, Grid } from '@mui/material'
import { useNotesContext } from '../hooks/useNotesContext'
import NoteDetails from './NoteDetails'
import NoteForm from './NoteForm'

const Main = () => {
  const { notes } = useNotesContext()

  return (
    <Container maxWidth='md'>
      <Grid container spacing={1}>
        {notes.map((note) =>
          note.archived ? null : (
            <Grid item xs={12} sm={6} md={4} key={note._id}>
              <NoteDetails note={note} />
            </Grid>
          )
        )}
      </Grid>
      <NoteForm />
    </Container>
  )
}
export default Main
