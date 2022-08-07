const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    title: String,
    text: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
)

/**
 * Create new note
 *
 * @param {string} title - note title
 * @param {string} text - note body
 * @param {objectId} userId - id of user making request
 * @returns {object} new note
 */

noteSchema.statics.createNote = async function (title, text, userId) {
  if (!title && !text) {
    throw Error('no data provided')
  }

  const note = await this.create({
    title,
    text,
    userId,
  })

  return note
}

/**
 * Get all notes
 *
 * @param {objectId} id - id of user making request
 */

noteSchema.statics.getAllNotes = async function (userId) {
  const notes = await this.find({ userId })

  return notes
}

/**
 * Get a single note
 *
 * @param {objectId} id - document id
 * @returns {object} note
 */

noteSchema.statics.getNote = async function (id) {
  const note = await this.findById(id)

  return note
}

/**
 * Update note
 *
 * @param {objectId} id - document id
 * @param {string} title - updated note title
 * @param {string} text - updated note body
 * @returns {object} updated note
 */

noteSchema.statics.updateNote = async function (id, title, text) {
  const updatedNote = await this.findByIdAndUpdate(
    id,
    { title, text },
    { new: true }
  )

  return updatedNote
}

/**
 * Archive note - Toggles archived status
 *
 * @param {ObjectId} id - document id
 * @returns {object} note
 */
noteSchema.statics.archiveNote = async function (id) {
  const archivedNote = await this.findByIdAndUpdate(
    id,
    [{ $set: { archived: { $not: '$archived' } } }],
    { new: true }
  )

  return archivedNote
}

/**
 * Delete note
 *
 * @param {ObjectId} id - document id
 * @returns {object} deleted note
 */
noteSchema.statics.deleteNote = async function (id) {
  const deleted = await this.findByIdAndDelete(id)

  return deleted
}

const notesDB = mongoose.connection.useDb('notes')

module.exports = notesDB.model('Note', noteSchema)
