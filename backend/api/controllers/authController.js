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

/**
 * @desc    Login user
 * @route   POST /api/auth/
 * @access  Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const ip =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress.split(':').pop()

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
 * @route   GET /api/auth/
 * @access  Private
 */
const getSession = async (req, res) => {
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
 * @desc    Get all user sessions
 * @route   GET /api/auth/sessions
 * @access  Private
 */
const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.getAllSessions(req.session.userId)

    res.status(200).json({ sessions, current: req.session._id })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * @desc    Refresh access token
 * @route   PUT /api/auth/
 * @access  Private
 */
// const refreshToken = async (req, res) => {
//   try {
//     const accessToken = generateAccessToken(req.session._id)

//     res.status(200).json({ accessToken })
//   } catch (error) {
//     return res.status(400).json({ error: error.message })
//   }
// }

/**
 * @desc    Logout user
 * @route   DELETE /api/auth/
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

/**
 * @desc    Close another session
 * @route   DELETE /api/auth/:id
 * @access  Priavte
 */
const deleteSession = async (req, res) => {
  const { id } = req.params

  //TODO: verify session belongs to user

  try {
    const session = await Session.close(id)

    res.status(200).json(session)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  loginUser,
  logoutUser,
  getSession,
  getAllSessions,
  deleteSession,
}
