const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({ error: 'No Authorization Token' })
  }

  try {
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.auth = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Not Authorized' })
  }
}

module.exports = { protect }
