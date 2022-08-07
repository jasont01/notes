const express = require('express')
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  archiveNote,
  deleteNote,
} = require('../controllers/noteController')

const { verifyAccessToken } = require('../middleware/authMiddleware')
const { validateRequest } = require('../middleware/noteMiddleware')

const router = express.Router()

router.post('/', verifyAccessToken, createNote)
router.get('/', verifyAccessToken, getAllNotes)

router.get('/:id', verifyAccessToken, validateRequest, getNote)
router.patch('/:id', verifyAccessToken, validateRequest, updateNote)
router.patch('/archive/:id', verifyAccessToken, validateRequest, archiveNote)
router.delete('/:id', verifyAccessToken, validateRequest, deleteNote)

module.exports = router
