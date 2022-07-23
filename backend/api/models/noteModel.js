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

module.exports = mongoose.model('Note', noteSchema)
