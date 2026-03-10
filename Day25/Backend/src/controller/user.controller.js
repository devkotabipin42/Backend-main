const userModel = require('../module/auth.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blackListModel=require('../module/blacklist.model')
const redis = require('../config/cache')

async function registerUser(req,res){
  const {username,email,password,bio,profileImage} = req.body;

  const isuser = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  if(isuser){
    return res.status(409).json({message:'username or email already exists'})
  }
  const hash = await bcrypt.hash(password,10);
  const user = await userModel.create({
    username,
    email,
    password:hash,
    bio,
    profileImage
  })

  const token = jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET,{
    expiresIn:'1d'
  })

  res.cookie('token',token)
  res.status(201).json({message:'user registered successfully',
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage
    }
  })

}

async function loginUserController(req,res){
  const {username,email,password} = req.body

  user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  }).select('+password')
  if(!user){
    return res.status(400).json({
      message:"invalid credentials"
    })
  }

  const isPassowrdValid = await bcrypt.compare(password,user.password)

  if(!isPassowrdValid){
    return res.status(400).json({
      message:"invalid credentials"
    })
  }

  const token = jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET)

  res.cookie('token',token)
  res.status(200).json({
    message:"user logged in sucessfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
}

async function getMeController(req,res){
  const user =await userModel.findById(req.user.id)

  res.status(200).json({
    message:"user fetch sucessfully",user
  })
}

async function LogoutCotroller(req,res){
  const token = req.cookies.token
  res.clearCookie("token")
  await redis.set(token,Date.now().toString(),"EX",60*60)
  
  res.status(200).json({
    message:'logout sucessfully'
  })
}

module.exports = {registerUser,loginUserController,getMeController,LogoutCotroller}