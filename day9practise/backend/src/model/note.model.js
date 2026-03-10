const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title:String,
  description:String,
  age:String
})

const noteModule = mongoose.model('notes',noteSchema)

module.exports= noteModule