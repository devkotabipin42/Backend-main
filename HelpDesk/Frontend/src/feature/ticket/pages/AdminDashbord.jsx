import { useEffect } from 'react'
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

const AdminDashboard = () => {
  const { tickets, loading, fetchAllTickets, editTicket ,removeTicket} = useTicket()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllTickets()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-blue-400">HelpDesk</h1>
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">Admin</span>
        </div>
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

      <div className="max-w-5xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-400">{tickets.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-yellow-400">
              {tickets.filter(t => t.status === 'open').length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Open</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-400">
              {tickets.filter(t => t.status === 'in-progress').length}
            </p>
            <p className="text-sm text-gray-400 mt-1">In Progress</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">
              {tickets.filter(t => t.status === 'resolved').length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Resolved</p>
          </div>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-4">All Tickets</h2>

        {/* Tickets List */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="text-4xl mb-2">🎫</p>
            <p>No tickets found!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-blue-500 transition border-l-4 border-l-red-500"
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
                    <p className="text-xs text-gray-500 mt-1">
                      🙍 {ticket.createdBy?.username || 'Unknown'}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColor[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition ml-4"
                    value={ticket.status}
                    onChange={(e) => editTicket(ticket._id, { status: e.target.value })}
                  >
                    <option value="open">🔵 Open</option>
                    <option value="in-progress">🟣 In Progress</option>
                    <option value="resolved">🟢 Resolved</option>
                  </select>
                  <div className="flex flex-col items-end gap-2 ml-4">
  <select
    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition"
    value={ticket.status}
    onChange={(e) => editTicket(ticket._id, { status: e.target.value })}
  >
    <option value="open">🔵 Open</option>
    <option value="in-progress">🟣 In Progress</option>
    <option value="resolved">🟢 Resolved</option>
  </select>

  {ticket.status === 'resolved' && (
    <button
      onClick={() => removeTicket(ticket._id)}
      className="text-gray-600 hover:text-red-400 transition text-sm"
    >
      🗑️ Delete
    </button>
  )}
</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard