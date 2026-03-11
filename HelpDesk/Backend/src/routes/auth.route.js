const express = require('express');
const validator = require('../validation/auth.validation');

const Router = express.Router();

Router.post('/register',validator,registerController)