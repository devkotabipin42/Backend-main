const commentModel = require('../model/comment.model')

async function addComment(req, res) {
  const { ticketId } = req.params
  const { message } = req.body

  try {
    const comment = await commentModel.create({
      ticket: ticketId,
      author: req.user.id,
      message
    })

    const populatedComment = await commentModel
      .findById(comment._id)
      .populate('author', 'username role')

    res.status(201).json({
      message: 'Comment added successfully',
      comment: populatedComment
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
async function getComments(req, res) {
  const { ticketId } = req.params

  try {
    const comments = await commentModel
      .find({ ticket: ticketId })
      .populate('author', 'username role')
      .sort({ createdAt: 1 })

    res.status(200).json({ comments })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addComment, getComments }