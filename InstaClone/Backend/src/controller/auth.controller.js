const userModel = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerController(req,res){
  const{username,email,password,bio,profileImage}=req.body

  const isuserAlreadyExists=await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if (isuserAlreadyExists){
    return res.status(409).json({
      message:"User is already exists"+(isuserAlreadyExists.email==email?'email already exists':'Username is alady exists')
    })
  }
   hash = await bcrypt.hash(password,10)

   const user = await userModel.create({
    username,
    email,
    password:hash,
    bio,
    profileImage

   })

   const token = jwt.sign({
    id : user._id,
    username:user.username
   },process.env.JWT_SECRET,{expiresIn:'1d'})

   res.cookie('token',token)

   res.status(201).json({
    message:'user registered sucessfully',
    user:{
       email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
    }
   })

}

async function loginController(req,res){
  const {username,email,password} = req.body

  const user = await userModel.findOne({
    $or:[
      {username:username},
      {email:email}
    ]
  })
  if(!user){
    return res.status(404).json({
      message:"User not found"
    })
  }

  const passwordInvalid = await bcrypt.compare(password,user.password)

  if(!passwordInvalid){
    return res.status(401).json({
      message:"password invalid"
    })
  }

  const token = jwt.sign({
    id : user._id,
    username:user.username
  },process.env.JWT_SECRET)

  res.cookie('token',token)
  res.status(200).json({
    message:"user logged in ",
    user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
  })
}

async function getMeController(req,res){
  const userId = req.user.id
  const user = await userModel.findById(userId)

  res.status(200).json({
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage
    }
  })
}


module.exports= {registerController,loginController,getMeController}