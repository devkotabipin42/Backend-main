const express = require('express')
const app = express()
app.use(express.json())
const notes =[]


app.post('/notes',(req,res)=>{
  
  console.log(req.body);
  notes.push(req.body)
  console.log(notes);
  
  res.send('note created')
})

app.get('/notes',(req,res)=>{
  res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
  console.log(req.params.index);
  delete notes[req.params.index]
  res.send('note deleted')
  
})

app.patch('/notes/:index',(req,res)=>{
  notes[req.params.index].title=req.body.title
  res.send('note updated secessfully')
})

module.exports = app