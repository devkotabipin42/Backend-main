const express = require('express');
const { createTicketValidation } = require('../validation/ticket.validation');
const { createTicket, getAllTickets,updateTicket,deleteTicket } = require('../controller/ticket.controller');
const authMiddleware = require('../middleware/auth.middleware');
const Router = express.Router();

Router.post('/create', authMiddleware, createTicketValidation, createTicket);
Router.put('/update/:id', authMiddleware, updateTicket);
Router.delete('/delete/:id', authMiddleware, deleteTicket);

Router.get('/all', authMiddleware, getAllTickets);

module.exports = Router;