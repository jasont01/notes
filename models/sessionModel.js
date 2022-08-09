const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
)

/**
 * Create new session
 *
 * @param {ObjectId} userId - user id
 * @param {string} ip - ip address
 * @returns session
 */
sessionSchema.statics.open = async function (userId, ip) {
  const session = await this.create({ userId, ip })

  return session
}

/**
 * Get existing session
 *
 * @param {ObjectId} id - session id
 * @returns session
 */
sessionSchema.statics.getSession = async function (id) {
  const session = await this.findById(id)

  if (!session) throw Error('Invlaid Session')

  return session
}

/**
 * Get all sessions for user
 *
 * @param {ObjectId} userId - user id
 * @returns sessions
 */
sessionSchema.statics.getAllSessions = async function (userId) {
  const sessions = await this.find({ userId })

  return sessions
}

/**
 * Update session
 *
 * @param {ObjectId} id - session id
 * @param {string} ip - ip address
 * @returns session
 */
sessionSchema.statics.updateSession = async function (id, ip) {
  const session = await this.findByIdAndUpdate(id, { ip }, { new: true })

  return session
}

/**
 * Destroy session
 *
 * @param {ObjectId} id - session id
 * @returns session
 */
sessionSchema.statics.close = async function (id) {
  const session = await this.findByIdAndDelete(id)

  return session
}

const notesDB = mongoose.connection.useDb('notes')

module.exports = notesDB.model('Session', sessionSchema)
