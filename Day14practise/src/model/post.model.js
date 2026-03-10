const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  caption:{
    type:String,
    default:''
  },
  imageUrl:{
    type:String,
    required:[true,'img_url is required for creating for post']
  },
  user:{
      ref:'User',
      type:mongoose.Schema.Types.ObjectId,
      required:[true,'user id is required for creating an post']
  }
})

const postModel = mongoose.model('post',postSchema)


module.exports=postModel