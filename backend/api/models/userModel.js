const mongoose = require('mongoose')

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
    sessions: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
