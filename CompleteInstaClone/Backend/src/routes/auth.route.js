const express = require('express')
const {registerController,loginController,getMeController}=require('../controllers/auth.controller')
const Identifyer=require('../Middleware/auth.Middleware')
const AuthRouter = express.Router()

AuthRouter.post('/register',registerController)

AuthRouter.post('/login',loginController)

AuthRouter.get('/get-me',Identifyer,getMeController)




module.exports=AuthRouter