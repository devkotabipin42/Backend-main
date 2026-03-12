
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ticket',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

const commentModel = mongoose.model('comment', commentSchema)
module.exports = commentModel