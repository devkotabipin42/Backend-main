const express = require('express')

const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  const ifEmailExist = await userModel.findOne({ email })

  if (ifEmailExist) {
    return res.status(409).json({
      message: "User already Exists"
    })
  }
  const hash = crypto.createHash('md5').update(password).digest('hex')

  const user = await userModel.create({
    email, password: hash, name
  })

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET)

  res.cookie('jwt_token', token)
  res.status(201).json({
    message: "user created", user
  })

})
authRouter.post('/login', async (req, res) => {
  const {email,password } = req.body
  const user = await userModel.findOne({email})
  if (!user) {
    return res.status(404).json({
      message: "email doesnot match"
    })
  }
  const isPaswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

  if (!isPaswordMatched) {
    return res.status(400).json({
      message: "invalid passowrd"
    })
  }

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET)

  res.cookie('jwt_token', token)
  res.status(200).json({
    message: 'logged in', user
  })
})

module.exports = authRouter