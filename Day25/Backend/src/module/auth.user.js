const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  username:{
    type:String,
    required:[true,'username is required'],
    unique:[true,'username must be unique']
  },
  email:{
    type:String,
    required:[true,'email is required'],
    unique:[true,'email must be unique']
  },
  password:{
    type:String,
    required:[true,'password is required'],
    select:false
  },
  bio:{
    type:String,
    default:''
  },
  profileImage:{
    type:String,
    default:'https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp'    
  } 
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;