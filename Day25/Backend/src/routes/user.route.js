const express = require('express');
const { registerUser,loginUserController,getMeController,LogoutCotroller } = require('../controller/user.controller');
const authUser=require('../middleware/auth.middleware')
const authRouter = express.Router();


authRouter.post('/register', registerUser)
authRouter.post('/login',loginUserController)

authRouter.get('/get-me',authUser,getMeController)

authRouter.get('/logout',LogoutCotroller)
module.exports = authRouter;