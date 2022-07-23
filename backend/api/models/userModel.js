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

const notesDB = mongoose.connection.useDb('notes')

module.exports = notesDB.model('User', userSchema)
