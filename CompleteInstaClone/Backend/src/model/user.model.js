const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"username must be unique"],
    required:[true,"username be required"]
  },
  email:{
    type:String,
    unique:[true,'email must be unique'],
    required:[true,'email must required']
  },
  password:{
    type:String,
    required:[true,'password must required'],
    select:false
  },
  bio:{
    type:String
  },
  profileImage:{
    type:String,
    default:'https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp'
  }
})

const userModel = mongoose.model('users',userSchema)

module.exports=userModel