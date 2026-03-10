const express = require('express');

const userRouter = express.Router()
const authController = require('../controllers/auth.controller')


userRouter.post('/register',authController.registerController)

userRouter.post('/login',authController.loginController)
module.exports = userRouter