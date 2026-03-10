const express = require('express')
const noteModel =require('./models/notes.model')
const app = express()
app.use(express.json())
/**
 post/notes
 req.body=>{tittle,description}
 */

 app.post('/notes',async(req,res)=>{
  const {title,description} = req.body
  const note = await noteModel.create({
    title,description
  })
  res.status(201).json({
    message:'note created sucessfull',
    note
  })
 })

 app.get('/notes',async(req,res)=>{
 const notes =await noteModel.find()
 res.status(200).json({
  message:'notes fetch sucessfully',
  notes
 })
 })

module.exports = app