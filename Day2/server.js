const express = require('express')

const app = express()


app.get('/',(req,res)=>{
  res.send('Hello world')
})

app.get('/home',(req,res)=>{
  res.send('This is home page')
})

app.get('/about',(req,res)=>{
  res.send('This is about page')
})

app.get('/app',(req,res)=>{
  res.send('this is app')
})
  app.listen(3000)//server start