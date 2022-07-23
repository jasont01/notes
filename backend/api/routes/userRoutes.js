const express = require('express')
const { verifyAccessToken } = require('../middleware/authMiddleware')
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

const router = express.Router()

router.post('/register', registerUser)
router.get('/', verifyAccessToken, getUser)
router.patch('/update', verifyAccessToken, updateUser)
router.delete('/delete', verifyAccessToken, deleteUser)

module.exports = router
