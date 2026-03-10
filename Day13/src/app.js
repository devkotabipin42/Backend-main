const express = require('express')

const authRouter= require('./routes/auth.routes')
const cookieParse = require('cookie-Parser')
const app = express()

app.use(express.json())
app.use(cookieParse())
app.use('/api/auth',authRouter)


module.exports=app