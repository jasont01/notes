const jwt = require('jsonwebtoken')
const Session = require('../models/sessionModel')

const verifyRefreshToken = async (req, res, next) => {
  if (!req.cookies.token) return res.sendStatus(204)

  const token = req.cookies.token

  const ip =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress.split(':').pop()

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    const session = await Session.getSession(decoded.session)

    req.session = await Session.updateSession(session._id, ip)

    next()
  } catch (error) {
    return res.status(403).json({ error: error.message })
  }
}

const verifyAccessToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(401)

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.session = await Session.getSession(decoded.session)

    next()
  } catch (error) {
    return res.status(403).json({ error: error.message })
  }
}

module.exports = { verifyRefreshToken, verifyAccessToken }
