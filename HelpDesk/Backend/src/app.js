const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth.route');
const ticketRoute = require('./routes/ticket.route');
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/ticket',ticketRoute)


module.exports = app;