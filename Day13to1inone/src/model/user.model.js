const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique:[true,'with this email user account already exists']
  },
  age:String,
  password:String,
})

const noteModel = mongoose.model('user',userSchema)

module.exports=noteModel