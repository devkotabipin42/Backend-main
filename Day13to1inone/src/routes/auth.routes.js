const express = require('express')

const jwt = require('jsonwebtoken')
const noteModel = require('../model/user.model')
const authRouter = express.Router()
const crypto = require('crypto')
authRouter.post('/register',async(req,res)=>{
  const {name,email,password,age} = req.body

  const isUserAlreadyExists = await noteModel.findOne({email})

  if (isUserAlreadyExists){
    return res.status(409).json({
      message:"this email is already used"
    })
  }

  const hash = crypto.createHash('md5').update(password).digest('hex')
  const user = await noteModel.create({
    name,email,password:hash,age
  })

  const token = jwt.sign(
    {
      id:user._id
    },
    process.env.JWT_SECRET
  )
  
res.cookie('jwt_token',token)
 return  res.status(201).json({
    message:"user created sucessfully",user,token
  })
})

authRouter.post('/login',async(req,res)=>{
  const {email,password}= req.body
  const user = await noteModel.findOne({email})
  if(!user){
res.status(404).json({
      message:"email doesnot exists"
    })
  }

  const IsExistPassword= user.password===crypto.createHash('SHA256').update(password).digest('hex')
  if(!IsExistPassword){
    return res.status(404).json({
      message:"password doesnot match"
    })
  }

  const token = jwt.sign(
    {
      id:user._id,
    }
    ,process.env.JWT_SECRET
  )
  res.cookie('jwt_token',token)

  res.status(200).json({
    message:"logged in ",user
  })
})

module.exports=authRouter