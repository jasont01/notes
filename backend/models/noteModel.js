const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    title: String,
    text: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)
