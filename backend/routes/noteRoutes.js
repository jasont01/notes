const express = require('express')
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController')

const router = express.Router()

router.post('/', createNote)

router.get('/', getAllNotes)
router.get('/:id', getNote)

router.patch('/:id', updateNote)

router.delete('/:id', deleteNote)

module.exports = router
