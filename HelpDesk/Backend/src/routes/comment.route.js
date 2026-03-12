const express = require('express')
const Router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { addComment, getComments } = require('../controller/comment.controller')

Router.post('/:ticketId/add', authMiddleware, addComment)
Router.get('/:ticketId', authMiddleware, getComments)


module.exports = Router