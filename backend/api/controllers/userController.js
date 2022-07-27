const User = require('../models/userModel')

/**
 * @desc    Register new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.register(email, password)

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Get user
 * @route   GET /api/users
 * @access  Private
 */
const getUser = async (req, res) => {
  const id = req.session.userId

  try {
    const user = await User.getUser(id)

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Update user
 * @route   PATCH /api/users/update
 * @access  Private
 */
const updateUser = (req, res) => {
  //TODO
  res.json({ message: 'update user' })
}

/**
 * @desc    Delete user
 * @route   DELETE /api/users/delete
 * @access  Private
 */
const deleteUser = (req, res) => {
  //TODO
  res.json({ message: 'delete user' })
}

module.exports = { registerUser, getUser, updateUser, deleteUser }
