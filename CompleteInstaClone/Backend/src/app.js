const express = require('express')
const app = express()

const cookieParser = require("cookie-parser")
const AuthRouter=require('./routes/auth.route')
const postRoute= require('./routes/post.routes')



app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',AuthRouter)
app.use('/api/posts',postRoute)




module.exports=app