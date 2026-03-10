const UserModel = require('../model/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


 async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;
  const userAreadyExist = await UserModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })
  if (userAreadyExist) {
    return res.status(409).json({
      message: "user already exists" + (userAreadyExist.email == email ? "Email already exists" : "Username alreaady exists")
    })
  }

  const hash =await bcrypt.hash(password,10)

  const user = await UserModel.create({
    username, email, bio, password: hash, profileImage
  })

  const token = jwt.sign(
    { id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }
  )

  res.cookie('jwt_token', token)

  res.status(201).json({
    message: "user registerd sucessfully",
    username: user.username, email: user.email, bio: user.bio, profileImage: user.profileImage
  })
}

async function loginController(req,res){
const{username,email,password} = req.body
const user = await UserModel.findOne({
  $or:[
    {
      username:username
    },{
      email:email
    }
  ]
})
if(!user){
return res.status(404).json({
  message:'user not found'
})
}

const isPasswordValid =await bcrypt.compare(password,user.password)

if (!isPasswordValid){
  return res.status(404).json({
    message:"passowrd invalid"
  })
}
const token = jwt.sign({
  id :user._id
},process.env.JWT_SECRET,{expiresIn:'1d'})
res.cookie('jwt_token',token)
res.status(200).json({
  message:'user loggedIn sucessfully',
  user:{
    username:user.username,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage
  }
})
}

module.exports={registerController,loginController} 