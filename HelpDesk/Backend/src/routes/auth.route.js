const express = require('express');
const {registerValidator,loginValidator} = require('../validation/auth.validation');
const { registerController ,loginController,profileController} = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const Router = express.Router();

Router.post('/register',registerValidator,registerController)

Router.post('/login', loginValidator, loginController);

Router.get('/profile',authMiddleware,profileController)

module.exports = Router;