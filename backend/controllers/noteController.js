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
    const note = await Note.create({ title, text })
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// @desc Get all notes
// @route GET /api/notes
// @access Private
const getAllNotes = async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json(notes)
}

// @desc Get a single note
// @route GET /api/notes/:id
// @access Private
const getNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid note id' })
  }

  const note = await Note.findById(id)

  if (!note) {
    return res.status(404).json({ error: `Could not find note with id ${id}` })
  }

  res.status(200).json(note)
}

// @desc Update note
// @route PATCH /api/note/:id
// @access Private
const updateNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note id' })
  }

  const note = await Note.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!note) {
    return res.status(404).json({ error: `Could not find note with id ${id}` })
  }

  res.status(200).json(note)
}

// @desc Delete note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note id' })
  }

  const note = await Note.findOneAndDelete({ _id: id })

  if (!note) {
    return res.status(404).json({ error: `Could not find note with id ${id}` })
  }

  res.status(200).json(note)
}

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
}
