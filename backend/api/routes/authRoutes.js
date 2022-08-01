const express = require('express')
const {
  verifyRefreshToken,
  verifyAccessToken,
} = require('../middleware/authMiddleware')
const {
  refreshToken,
  loginUser,
  logoutUser,
  getSession,
  getAllSessions,
  deleteSession,
} = require('../controllers/authController')

const router = express.Router()

//TODO: organize. use accessTokens?
router.post('/', loginUser)

router.get('/', verifyRefreshToken, getSession)
router.get('/sessions', verifyAccessToken, getAllSessions)

//router.put('/', verifyAccessToken, refreshToken)

router.delete('/', verifyAccessToken, logoutUser)
router.delete('/:id', verifyAccessToken, deleteSession)

module.exports = router
