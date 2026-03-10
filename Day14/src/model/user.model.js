const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"username is already exist"],
    required:[true,"username is required"]
  },
  email:{
    type:String,
    unique:[true,"Email already used"],
    required:[true,"Email is required"]
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  bio:"String",
  profileImage:{
    type:"String",
    default:"https://ik.imagekit.io/b8slwt3znj/default-avatar-profile-icon-social-media-user-vector-49816613.avif"
  }
})

const UserModel = mongoose.model("User",userSchema)
module.exports = UserModel