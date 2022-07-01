const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
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

  if (user) {
    res
      .status(201)
      .cookie('token', generateToken(user._id), {
        maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days
        httpOnly: true,
      })
      .json({ _id: user._id, email: user.email })
  } else {
    return res.status(400).json({ error: 'error creating user' })
  }
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res
      .status(200)
      .cookie('token', generateToken(user._id), {
        maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days
        httpOnly: true,
      })
      .json({
        _id: user._id,
        email: user.email,
      })
  } else {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
}

// @desc    Check if user is logged in
// @route   GET /api/users/loggedIn
// @access  Public
const loggedIn = (req, res) => {
  const token = req.cookies.token
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    res.send(true)
  } catch (error) {
    res.send(false)
  }
}

// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUser = async (req, res) => {
  const { id } = req.auth
  const user = await User.findById(id)

  if (user) {
    res.status(200).json({ _id: user._id, email: user.email })
  } else {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
}

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logoutUser = async (req, res) => {
  res
    .status(200)
    .cookie('token', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    })
    .json({ success: true, message: 'User logged out successfully' })
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = { registerUser, loginUser, loggedIn, getUser, logoutUser }
