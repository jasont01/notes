const express = require('express')
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createNote)

router.get('/', protect, getAllNotes)
router.get('/:id', protect, getNote)

router.patch('/:id', protect, updateNote)

router.delete('/:id', protect, deleteNote)

module.exports = router
