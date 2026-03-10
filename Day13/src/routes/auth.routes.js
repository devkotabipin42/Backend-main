const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const crypto = require('crypto')

authRouter.post('/register',async(req,res)=>{
  const {email,name,password} = req.body

  const isUserAlreadyExists = await userModel.findOne({email})
  if(isUserAlreadyExists){
    return res.status(409).json({
      message:'user already exists with this email address'
    })
  }
  const hash= crypto.createHash('md5').update(password).digest('hex')
  const user = await userModel.create({
    email,password:hash,name
  })

  const token = jwt.sign({
    id:user._id,
    email:user.email
  },
   process.env.JWT_SECRET
)

  res.cookie('jwt_token',token)
  res.status(201).json({
    message:"userregistered",user,token
  })
})

authRouter.post('/protected',(req,res)=>{
  console.log(req.cookies);
  res.status(200).json({
    message:'This is a procted route'
  })
})

authRouter.post('/login',async(req,res)=>{
  const{email,password} = req.body
  const user = await userModel.findOne({email})
  if(!user){
    return res.status(404).json({
      message:"user not found with this email adddress"
    })
  }
  const isPasswordMatch = user.password===crypto.createHash('md5').update(password).digest('hex')

  if (!isPasswordMatch){
    return res.status(401).json({
      message:"invalid password"
    })
  }
  const token = jwt.sign({
    id:user._id,

  },process.env.JWT_SECRET)
  res.cookie('jwt_token',token)
  res.status(200).json({
    message:'user logged in',user,
  })
})
module.exports=authRouter