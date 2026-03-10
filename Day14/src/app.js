
const express = require('express')
const app = express()
const authrouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authrouter)
app.use('/api/posts',postRouter)




module.exports=app