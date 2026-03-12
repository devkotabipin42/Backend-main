import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/ticket',
  withCredentials: true
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getAllTickets = async () => {
  const response = await api.get('/all')
  return response.data
}

export const createTicket = async (data) => {
  const response = await api.post('/create', data)
  return response.data
}

export const updateTicket = async (id, data) => {
  const response = await api.put(`/update/${id}`, data)
  return response.data
}

export const deleteTicket = async (id) => {
  const response = await api.delete(`/delete/${id}`)
  return response.data
}

export const getAllTicketsAdmin = async () => {
  const response = await api.get('/admin/all')
  return response.data
}
export const getTicketById = async (id) => {
  const response = await api.get(`/single/${id}`)
  return response.data
}