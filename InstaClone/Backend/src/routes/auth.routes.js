const express = require('express')
const IdentifyUser=require('../middleware/auth.middleware')

const {registerController,loginController,getMeController} = require('../controller/auth.controller')


const authRouter = express.Router()


authRouter.post('/register',registerController)

authRouter.post('/login',loginController)

authRouter.get('/get-me',IdentifyUser,getMeController)




module.exports=authRouter