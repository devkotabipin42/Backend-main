const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('./public'))
const noteModule = require('./model/note.model')
const cors = require('cors')
const path = require('path')
app.use(cors())

app.post('/api/notes',async(req,res)=>{
  const {title,description} = req.body
  const note =await noteModule.create({
    title,description
  })
  res.status(201).json({
    message:'note create sucessfully',
    note
  })
})

app.get('/api/notes',async(req,res)=>{
  const note = await noteModule.find()
  res.status(200).json({
    message:'Note fetch sucessfully',
    note
  })
})

app.delete('/api/notes/:id',async(req,res)=>{
  const id = req.params.id
  await noteModule.findByIdAndDelete(id)

  res.status(200).json({
    message:'note deleted'
  })
  
})

app.patch('/api/notes/:id',async(req,res)=>{
  const id =req.params.id
  const {description} = req.body
const note =await noteModule.findByIdAndUpdate(id,{description})
res.status(200).json({
  message:'update sucessfully',note
})
})
console.log(__dirname);

app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','/public/index.html'))
})
module.exports=app