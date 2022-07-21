const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const validator = require('validator')

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'email is not valid' })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ error: 'user already exists' })
  }

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    email,
    password: hashedPassword,
  })

  if (!user) return res.sendStatus(400)

  res.status(201).json(user)
}

// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUser = (req, res) => {
  const user = req.user

  res.status(200).json({ _id: user._id, email: user.email })
}

// @desc    Update user
// @route   PATCH /api/users/update
// @access  Private
const updateUser = (req, res) => {
  res.json({ message: 'update user' })
}

// @desc    Get user
// @route   DELETE /api/users/delete
// @access  Private
const deleteUser = (req, res) => {
  res.json({ message: 'delete user' })
}

module.exports = { registerUser, getUser, updateUser, deleteUser }
