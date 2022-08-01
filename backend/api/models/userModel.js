const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = mongoose.Schema(
  {
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
 * @param {string} email
 * @param {string} password
 * @returns new user
 */
userSchema.statics.register = async function (email, password) {
  if (!email || !password) {
    throw Error(`${email ? 'password' : 'email'} is required`)
  }

  if (!validator.isEmail(email)) {
    throw Error('please enter a valid email address')
  }

  const userExists = await this.findOne({ email })

  if (userExists) {
    throw Error('user already exists')
  }

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await this.create({
    email,
    password: hashedPassword,
  })

  return user
}

/**
 * Authenticate User
 *
 * @param {string} email
 * @param {string} password
 * @returns user
 */
userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email })

  if (!user) throw Error('User not found')

  const match = await bcrypt.compare(password, user.password)

  if (!match) throw Error('Invalid credentials')

  return { _id: user._id, email: user.email }
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
