const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  url:{
    type:String,
    required:[true,'song url is required']
  },
  posterUrl:{
    type:String,
    required:[true,'poster url is required']    
  },
  title:{
    type:String,
    required:[true,'song title is required']
  },
  mood:{
    type:String,
    enum:{
      values:['sad','happy','surprised'],
      message:"Enum this is"
    }
  }
})

const songModel = mongoose.model('song',songSchema)

module.exports=songModel