const mongoose = require('mongoose')
const Note = require('../models/noteModel')

const validateRequest = async (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note id' })
  }

  const note = await Note.findById(id)

  if (!note) {
    return res.status(400).json({ error: 'Note not found' })
  }

  if (!note.userId.equals(req.session.userId)) {
    return res.status(400).json({ error: 'Not Authorized' })
  }

  next()
}

module.exports = { validateRequest }
