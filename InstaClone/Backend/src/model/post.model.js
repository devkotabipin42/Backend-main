const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  caption:{
    type:String,
    default:''
  },
  imgUrl:{
    type:String,
    required:[true,"imgUrl is required or creating an post"]
  },
  user:{
    ref:'users',
    type:mongoose.Schema.Types.ObjectId,
    requird:[true,"user id is required for creating an post"]
  }
})

const postModel= mongoose.model('posts',postSchema)

module.exports=postModel