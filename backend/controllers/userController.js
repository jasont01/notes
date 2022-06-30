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
    token: generateToken(user._id),
  })

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email })
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
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

//TODO: Refresh Token

module.exports = { registerUser, loginUser }
