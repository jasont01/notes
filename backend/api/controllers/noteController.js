const mongoose = require('mongoose')
const Note = require('../models/noteModel')

// @desc Create note
// @route POST /api/notes
// @access Private
const createNote = async (req, res) => {
  const { title, text } = req.body

  if (!title && !text) {
    return res.status(400).json({ error: 'no data provided' })
  }

  try {
    const note = await Note.create({
      title,
      text,
      user: req.user._id,
    })
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// @desc Get all notes
// @route GET /api/notes
// @access Private
const getAllNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id })
  res.status(200).json(notes)
}

// @desc Get a single note
// @route GET /api/notes/:id
// @access Private
const getNote = async (req, res) => {
  const isValid = await validateRequest(req, res)

  if (isValid) {
    const note = await Note.findById(req.params.id)
    res.status(200).json(note)
  }
}

// @desc Update note
// @route PATCH /api/note/:id
// @access Private
const updateNote = async (req, res) => {
  const isValid = await validateRequest(req, res)

  if (isValid) {
    await Note.findByIdAndUpdate(req.params.id, { ...req.body })
    const updatedNote = await Note.findById(req.params.id)
    res.status(200).json(updatedNote)
  }
}

// @desc Delete note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = async (req, res) => {
  const isValid = await validateRequest(req, res)

  if (isValid) {
    const note = await Note.findByIdAndDelete(req.params.id, { ...req.body })
    res.status(200).json(note)
  }
}

const validateRequest = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid note id' })
    return false
  }

  const note = await Note.findById(id)

  if (!note) {
    res.status(404).json({ error: 'Note not found' })
    return false
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ error: 'Not Authorized' })
    return false
  }

  return true
}

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
}
