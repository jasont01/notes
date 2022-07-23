const express = require('express')
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController')

const { verifyAccessToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', verifyAccessToken, createNote)
router.get('/', verifyAccessToken, getAllNotes)

router.get('/:id', verifyAccessToken, getNote)
router.patch('/:id', verifyAccessToken, updateNote)
router.delete('/:id', verifyAccessToken, deleteNote)

module.exports = router
