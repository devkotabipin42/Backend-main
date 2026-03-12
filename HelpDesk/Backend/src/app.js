const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
const authRoute = require('./routes/auth.route');
const ticketRoute = require('./routes/ticket.route');
const commentRoute = require('./routes/comment.route')
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/ticket',ticketRoute)
app.use('/api/comment',commentRoute)


module.exports = app;