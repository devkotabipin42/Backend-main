const express = require('express')
const {postController,getPostConnection,getPostDetailsController,getLikeController} = require('../controllers/post.controller')
const postRoute = express.Router()
const Identifyer=require('../Middleware/auth.Middleware')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})


postRoute.post('/',upload.single('image'),Identifyer,postController)

postRoute.get('/',Identifyer,getPostConnection)

postRoute.get('/details/:postId',Identifyer,getPostDetailsController)

postRoute.post('/like/:postId',Identifyer,getLikeController)


module.exports=postRoute