const express = require('express')
const app = express()
app.use(express.json())
const CookieParser = require('cookie-parser')
app.use(CookieParser())
const userRouter = require('./routes/auth.route')
app.use('/api/auth',userRouter)
const postRouter = require('./routes/post.routes')
app.use('/api/posts',postRouter)



module.exports=app