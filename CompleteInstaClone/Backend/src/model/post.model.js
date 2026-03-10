const mongoose= require('mongoose')

const postSchema = new mongoose.Schema({
  caption:{
    type:String,
    default:''
  },
  imgUrl:{
    type:String,
    required:[true,'imgUrl is required or an creating an post']
  },
  user:{
    ref:'users',
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"user id os required for creating an post"]

  }
})

const postModel = mongoose.model('posts',postSchema)

module.exports=postModel