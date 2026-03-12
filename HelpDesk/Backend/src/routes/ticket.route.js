const express = require('express');
const { createTicketValidation } = require('../validation/ticket.validation');
const { createTicket, getAllTickets,updateTicket,deleteTicket,getAllTicketsAdmin,updateTicketAdmin ,getTicketById} = require('../controller/ticket.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Router = express.Router();

Router.post('/create', authMiddleware, createTicketValidation, createTicket);
Router.put('/update/:id', authMiddleware, updateTicket);
Router.delete('/delete/:id', authMiddleware, deleteTicket);
// Admin — saari tickets dekhe
Router.get('/admin/all', authMiddleware, adminMiddleware, getAllTicketsAdmin)

// Admin — status update kare
Router.put('/admin/update/:id', authMiddleware, adminMiddleware, updateTicketAdmin)
Router.get('/all', authMiddleware, getAllTickets);

Router.get('/single/:id', authMiddleware, getTicketById)

module.exports = Router;