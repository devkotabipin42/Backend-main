const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"User is already exists"],
    required:[true,"Username is required"]
  },
  email:{
    type:String,
    unique:[true,'Email is already exists'],
    required:[true,'Email is required']
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  bio:{
    type:String,
    default:''
  },
  profileImage:{
    type:String,
    default:"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
  }
})

const userModel = mongoose.model('users',userSchema)


module.exports=userModel