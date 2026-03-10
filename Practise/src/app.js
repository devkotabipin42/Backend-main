
const express = require('express')
const app = express()
const authRouter=require('./routes/auth.route')
app.use(express.json())
const cookieParser=require('cookie-parser')
const userModel=require('./models/user.model')
app.use('/api/auth',authRouter)
app.use(cookieParser())

app.post('/user',async(req,res)=>{
  const {name,email} = req.body
  const users = await userModel.create({
    name,email
  })
  res.status(201).json({
    message:""
  })
})

module.exports=app