const express = require('express')
const {postCollection,getPostController,getPostDetailsController,getLikeDetailsController}= require('../controller/post.controller')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const IdentifyUser=require('../middleware/auth.middleware')


postRouter.post('/',upload.single('image'),IdentifyUser,postCollection)

postRouter.get('/',IdentifyUser,getPostController)

postRouter.get('/details/:postId',IdentifyUser,getPostDetailsController)

postRouter.post('/like/:postId',IdentifyUser,getLikeDetailsController)


module.exports=postRouter