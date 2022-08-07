const Note = require('../models/noteModel')

/**
 * @desc Create note
 * @route POST /api/notes
 * @access Private
 */
const createNote = async (req, res) => {
  const { title, text } = req.body
  const id = req.session.userId

  try {
    const note = await Note.createNote(title, text, id)
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc Get all notes
 * @route GET /api/notes
 * @access Private
 */
const getAllNotes = async (req, res) => {
  const id = req.session.userId

  try {
    const notes = await Note.getAllNotes(id)
    res.status(200).json(notes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc Get a single note
 * @route GET /api/notes/:id
 * @access Private
 */
const getNote = async (req, res) => {
  const { id } = req.params

  try {
    const note = await Note.getNote(id)
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc Update note
 * @route PATCH /api/note/:id
 * @access Private
 */
const updateNote = async (req, res) => {
  const { id } = req.params
  const { title, text } = req.body

  try {
    const updatedNote = await Note.updateNote(id, title, text)
    res.status(200).json(updatedNote)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc Archive note
 * @route PATCH /api/note/archive/:id
 * @access Private
 */
const archiveNote = async (req, res) => {
  const { id } = req.params

  try {
    const archivedNote = await Note.archiveNote(id)
    res.status(200).json(archivedNote)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc Delete note
 * @route DELETE /api/notes/:id
 * @access Private
 */
const deleteNote = async (req, res) => {
  const { id } = req.params

  try {
    const note = await Note.deleteNote(id)
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  archiveNote,
  deleteNote,
}
