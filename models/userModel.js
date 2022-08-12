const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//const db = process.env.MONGO_DB_NS
const db = 'notes'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
  },
  {
    timestamps: true,
  }
)

/**
 * Register New User
 *
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns new user
 */
userSchema.statics.register = async function (username, email, password) {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await this.create({
    username,
    email,
    password: hashedPassword,
  })

  return user
}

/**
 * Authenticate User
 *
 * @param {string} login - username or email
 * @param {string} password
 * @returns user
 */
userSchema.statics.authenticate = async function (login, password) {
  const user = await this.findOne({
    $or: [{ username: login }, { email: login }],
  })

  if (!user) throw Error('User not found')

  const match = await bcrypt.compare(password, user.password)

  if (!match) throw Error('Invalid credentials')

  return { _id: user._id, username: user.username, email: user.email }
}

/**
 * Get User
 *
 * @param {ObjectId} id - user id
 * @returns user
 */
userSchema.statics.getUser = async function (id) {
  const user = await this.findById(id)

  if (!user) throw Error('User not found')

  return { _id: user._id, username: user.username, email: user.email }
}

/**
 * Update Username
 *
 * @param {ObjectId} id - user id
 * @param {Object} username - new username
 * @returns user
 */
userSchema.statics.updateUsername = async function (id, username) {
  const user = await this.findOneAndUpdate(
    { _id: id },
    { username },
    { new: true }
  )

  return { _id: user._id, username: user.username, email: user.email }
}

/**
 * Update Email
 *
 * @param {ObjectId} id - user id
 * @param {Object} email - new email
 * @returns user
 */
userSchema.statics.updateEmail = async function (id, email) {
  const user = await this.findOneAndUpdate(
    { _id: id },
    { email },
    { new: true }
  )

  return { _id: user._id, username: user.username, email: user.email }
}

/**
 * Update Password
 *
 * @param {ObjectId} id - user id
 * @param {Object} username - new password
 * @returns user
 */
userSchema.statics.updatePassword = async function (id, password) {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await this.findOneAndUpdate(
    { _id: id },
    { password: hashedPassword },
    { new: true }
  )

  return { _id: user._id, username: user.username, email: user.email }
}

/**
 * Delete User
 *
 * @param {ObjectId} id - user id
 * @returns user
 */
userSchema.statics.deleteUser = async function (id) {
  const user = await this.findByIdAndDelete(id)

  return { _id: user._id, username: user.username, email: user.email }
}

const notesDB = mongoose.connection.useDb(db)

module.exports = notesDB.model('User', userSchema)
