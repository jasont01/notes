const User = require('../models/userModel')

/**
 * @desc    Register new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.register(username, email, password)

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
 * @desc    Update username
 * @route   PATCH /api/users/username
 * @access  Private
 */
const updateUsername = async (req, res) => {
  const id = req.session.userId
  const { username } = req.body

  try {
    const user = await User.updateUsername(id, username)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Update email
 * @route   PATCH /api/users/email
 * @access  Private
 */
const updateEmail = async (req, res) => {
  const id = req.session.userId
  const { email } = req.body

  try {
    const user = await User.updateEmail(id, email)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Update password
 * @route   PATCH /api/users/password
 * @access  Private
 */
const updatePassword = async (req, res) => {
  const id = req.session.userId
  const { password } = req.body

  try {
    const user = await User.updatePassword(id, password)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Delete user
 * @route   DELETE /api/users/delete
 * @access  Private
 */
//TODO: delete all user's notes
const deleteUser = async (req, res) => {
  const id = req.session.userId

  try {
    const user = await User.deleteUser(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  registerUser,
  getUser,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
}
