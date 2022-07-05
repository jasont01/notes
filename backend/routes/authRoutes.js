const express = require('express')
const { verifyRefreshToken } = require('../middleware/authMiddleware')
const {
  refreshToken,
  loginUser,
  logoutUser,
  loggedIn,
} = require('../controllers/authController')

const router = express.Router()

router.post('/login', loginUser)
router.get('/logout', verifyRefreshToken, logoutUser)
router.post('/refresh', verifyRefreshToken, refreshToken)
router.get('/loggedIn', loggedIn)

module.exports = router
