import { useState } from "react"

import {getAllTickets,createTicket,updateTicket,getAllTicketsAdmin,getTicketById,deleteTicket}from "../services/ticketService"

export const useTicket = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTickets = async () => {
    setLoading(true)
    try {
      const data = await getAllTickets()
      setTickets(data.tickets)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tickets')
    } finally {
      setLoading(false)
    }
  }

  const addTicket = async (ticketData) => {
    setLoading(true)
    try {
      const data = await createTicket(ticketData)
      setTickets([...tickets, data.ticket])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket')
    } finally {
      setLoading(false)
    }
  }

  const editTicket = async (id, ticketData) => {
    setLoading(true)
    try {
      const data = await updateTicket(id, ticketData)
      setTickets(tickets.map(t => t._id === id ? data.ticket : t))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update ticket')
    } finally {
      setLoading(false)
    }
  }

  const removeTicket = async (id) => {
    setLoading(true)
    try {
      await deleteTicket(id)
      setTickets(tickets.filter(t => t._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete ticket')
    } finally {
      setLoading(false)
    }
  }

  const fetchAllTickets = async () => {
  setLoading(true)
  try {
    const data = await getAllTicketsAdmin()
    setTickets(data.tickets)
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch tickets')
  } finally {
    setLoading(false)
  }
}
const fetchTicketById = async (id) => {
  setLoading(true)
  try {
    const data = await getTicketById(id)
    return data.ticket
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch ticket')
  } finally {
    setLoading(false)
  }
}

  return { tickets, loading, error, fetchTickets, addTicket, editTicket, removeTicket, fetchAllTickets, fetchTicketById }
}