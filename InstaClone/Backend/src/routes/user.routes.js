const express = require('express')
const {followUserCollection,unfollowUserController} = require('../controller/user.controller')
const IdentifyUser=require('../middleware/auth.middleware')
const userRouter = express.Router()


userRouter.post('/follow/:username',IdentifyUser,followUserCollection)
userRouter.post('/unfollow/:username',IdentifyUser,unfollowUserController)




module.exports=userRouter