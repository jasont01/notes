const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  loggedIn,
  getUser,
  logoutUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/loggedIn', loggedIn)
router.get('/', protect, getUser)
router.get('/logout', protect, logoutUser)

module.exports = router
