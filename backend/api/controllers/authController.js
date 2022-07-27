const User = require('../models/userModel')
const Session = require('../models/sessionModel')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken')

const cookieOptions = {
  maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
  secure: process.env.NODE_ENV === 'production',
}

//TODO: remove stale sessions
/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const ip = req.connection.remoteAddress.split(':').pop()

  try {
    const user = await User.authenticate(email, password)

    const session = await Session.open(user._id, ip)

    const refreshToken = generateRefreshToken(session._id)
    const accessToken = generateAccessToken(session._id)

    res.status(200).cookie('token', refreshToken, cookieOptions).json({
      user,
      accessToken,
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
/**
 * @desc    Get existing session
 * @route   GET /api/auth/session
 * @access  Private
 */
const session = async (req, res) => {
  try {
    const user = await User.getUser(req.session.userId)

    const accessToken = generateAccessToken(req.session._id)

    res.status(200).json({
      user,
      accessToken,
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
/**
 * @desc    Refresh access token
 * @route   PUT /api/auth/refresh
 * @access  Private
 */
const refreshToken = async (req, res) => {
  try {
    const accessToken = generateAccessToken(req.session._id)

    res.status(200).json({ accessToken })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Logout user
 * @route   DELETE /api/auth/logout
 * @access  Private
 */
const logoutUser = async (req, res) => {
  try {
    await Session.close(req.session._id)

    res
      .status(200)
      .clearCookie('token', cookieOptions)
      .json({ success: true, message: 'User logged out successfully' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = { refreshToken, loginUser, logoutUser, session }
