const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    title: String,
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const notesDB = mongoose.connection.useDb('notes')

module.exports = notesDB.model('Note', noteSchema)
