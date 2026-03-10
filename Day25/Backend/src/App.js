const express = require('express');
const app = express();
const userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const songRoute = require('./routes/song.route')

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use('/api/auth', userRoute);
app.use('/api/songs',songRoute)

module.exports = app;