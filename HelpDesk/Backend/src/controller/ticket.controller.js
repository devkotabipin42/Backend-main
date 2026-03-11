const ticketModel = require('../model/ticket.model')
const { validationResult } = require('express-validator')

async function createTicket(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { title, description, priority } = req.body

  try {
    const ticket = await ticketModel.create({
      title,
      description,
      priority,
      createdBy: req.user.id
    })

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

async function getAllTickets(req, res) {
  try {
    const tickets = await ticketModel
      .find({ createdBy: req.user.id })
      .populate('createdBy', 'username email')

    res.status(200).json({ tickets })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

async function updateTicket(req, res) {
  const { id } = req.params
  const { status, priority } = req.body

  try {
    const ticket = await ticketModel.findById(id)

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (ticket.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const updatedTicket = await ticketModel.findByIdAndUpdate(
      id,
      { status, priority },
      { new: true }
    )

    res.status(200).json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
async function deleteTicket(req, res) {
  const { id } = req.params

  try {
    const ticket = await ticketModel.findById(id)

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (ticket.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    await ticketModel.findByIdAndDelete(id)

    res.status(200).json({ message: 'Ticket deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
module.exports = { createTicket, getAllTickets, updateTicket, deleteTicket }