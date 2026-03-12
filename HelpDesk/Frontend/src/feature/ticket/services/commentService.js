import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/comment',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getComments = async (ticketId) => {
  const response = await api.get(`/${ticketId}`)
  return response.data
}

export const addComment = async (ticketId, message) => {
  const response = await api.post(`/${ticketId}/add`, { message })
  return response.data
}