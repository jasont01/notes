const User = require('../models/userModel')
const validator = require('validator')

const validateUsername = async (req, res, next) => {
  const { username } = req.body

  if (!username) {
    return res.status(400).json({ error: 'username cannot be empty' })
  }

  if (!validator.isAlphanumeric(username)) {
    return res
      .status(400)
      .json({ error: 'usernames can only contain letters and numbers' })
  }

  const usernameExists = await User.findOne({ username })

  if (usernameExists) {
    return res.status(400).json({ error: 'that username already exists' })
  }

  next()
}

const validateEmail = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'email cannot be empty' })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'please enter a valid email address' })
  }

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    return res
      .status(400)
      .json({ error: 'an account with that email already exists' })
  }

  next()
}

module.exports = { validateUsername, validateEmail }
