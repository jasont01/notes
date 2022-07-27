const jwt = require('jsonwebtoken')

const generateAccessToken = (sessionId) => {
  return jwt.sign({ session: sessionId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (sessionId) => {
  return jwt.sign({ session: sessionId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '180d',
  })
}

module.exports = { generateAccessToken, generateRefreshToken }
