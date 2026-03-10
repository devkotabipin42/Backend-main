const express = require('express')
const app = express()
app.use(express.json())
const about = []

app.post('/about',(req,res)=>{
about.push(req.body)
res.status(201).json({
  message:"posted"
})
})

app.get('/about',(req,res)=>{
  
  res.status(200).json({
    about:about
  })
})

app.delete('/about/:index',(req,res)=>{
  delete about[req.params.index]
  res.status(204).json({
    message:'deleted'
  })
})

app.patch('/about/:index',(req,res)=>{
  about[req.params.index].currency=req.body.currency
  res.status(200).json({
    message:'Note updated successfully'

  })
})
module.exports=app
