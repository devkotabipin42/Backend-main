import { useEffect, useState } from 'react'
import { useTicket } from '../hooks/useTicket'
import { useAuth } from '../../auth/hooks/UseAuth'
import { useNavigate } from 'react-router-dom'

const priorityColor = {
  low: 'bg-green-900 text-green-400',
  medium: 'bg-yellow-900 text-yellow-400',
  high: 'bg-red-900 text-red-400'
}

const statusColor = {
  open: 'bg-blue-900 text-blue-400',
  'in-progress': 'bg-purple-900 text-purple-400',
  resolved: 'bg-green-900 text-green-400'
}

const Dashboard = () => {
  const { tickets, loading, fetchTickets, addTicket, removeTicket } = useTicket()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addTicket({ title, description, priority })
    setTitle('')
    setDescription('')
    setPriority('medium')
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">HelpDesk</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">👤 {user?.username}</span>
          <button
            onClick={logout}
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow text-center">
            <p className="text-3xl font-bold text-blue-400">{tickets.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total Tickets</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow text-center">
            <p className="text-3xl font-bold text-yellow-400">
              {tickets.filter(t => t.status === 'open').length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Open</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow text-center">
            <p className="text-3xl font-bold text-green-400">
              {tickets.filter(t => t.status === 'resolved').length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Resolved</p>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">My Tickets</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + New Ticket
          </button>
        </div>

        {/* Create Ticket Form */}
        {showForm && (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow mb-6">
            <h3 className="text-lg font-bold mb-4 text-white">Create New Ticket</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
                  placeholder="What is the issue?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
                  rows="3"
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tickets List */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="text-4xl mb-2">🎫</p>
            <p>No tickets yet! Create your first ticket.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-blue-500 transition border-l-4 border-l-blue-500"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3
                      className="font-bold text-lg text-white cursor-pointer hover:text-blue-400 transition"
                      onClick={() => navigate(`/ticket/${ticket._id}`)}
                    >
                      {ticket.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{ticket.description}</p>
                    <div className="flex gap-2 mt-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[ticket.status]}`}>
                        {ticket.status}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColor[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeTicket(ticket._id)}
                    className="text-gray-600 hover:text-red-400 transition ml-4 text-lg"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard