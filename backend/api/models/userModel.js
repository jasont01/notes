const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

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
  if (!username || !email || !password) {
    throw Error('all fields are required')
  }

  if (!validator.isAlphanumeric(username)) {
    throw Error('usernames can only contain letters and numbers')
  }

  if (!validator.isEmail(email)) {
    throw Error('please enter a valid email address')
  }

  const usernameExists = await this.findOne({ username })

  if (usernameExists) {
    throw Error('that username already exists')
  }

  const emailExists = await this.findOne({ email })

  if (emailExists) {
    throw Error('an account with that email already exists')
  }

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

  return { _id: user._id, email: user.email }
}

const notesDB = mongoose.connection.useDb('notes')

module.exports = notesDB.model('User', userSchema)
