const express = require('express')
const { verifyAccessToken } = require('../middleware/authMiddleware')
const {
  registerUser,
  getUser,
  deleteUser,
  updateUsername,
  updateEmail,
  updatePassword,
} = require('../controllers/userController')
const {
  validateUsername,
  validateEmail,
} = require('../middleware/userValidation')

const router = express.Router()

/**
 * @route /api/users
 */
router.post('/register', validateUsername, validateEmail, registerUser)
router.get('/', verifyAccessToken, getUser)
router.patch('/username', verifyAccessToken, validateUsername, updateUsername)
router.patch('/email', verifyAccessToken, validateEmail, updateEmail)
router.patch('/password', verifyAccessToken, updatePassword)
router.delete('/delete', verifyAccessToken, deleteUser)

module.exports = router
