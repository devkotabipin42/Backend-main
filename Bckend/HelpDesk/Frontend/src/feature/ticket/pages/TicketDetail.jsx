import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTicket } from '../hooks/useTicket'
import { useAuth } from '../../auth/hooks/UseAuth'
import { getComments, addComment } from '../services/commentService'

const statusColor = {
  open: 'bg-blue-900 text-blue-400',
  'in-progress': 'bg-purple-900 text-purple-400',
  resolved: 'bg-green-900 text-green-400'
}

const priorityColor = {
  low: 'bg-green-900 text-green-400',
  medium: 'bg-yellow-900 text-yellow-400',
  high: 'bg-red-900 text-red-400'
}

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchTicketById, loading } = useTicket()
  const { user } = useAuth()
  const [ticket, setTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadTicket = async () => {
      const data = await fetchTicketById(id)
      setTicket(data)
    }
    loadTicket()
    loadComments()
  }, [id])

  const loadComments = async () => {
    try {
      const data = await getComments(id)
      setComments(data.comments)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitting(true)
    try {
      await addComment(id, message)
      setMessage('')
      loadComments()
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  if (!ticket) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Ticket not found!</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">HelpDesk</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-1.5 rounded-lg transition"
        >
          ← Back
        </button>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        {/* Ticket Info */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow mb-6 border-l-4 border-l-blue-500">
          <h2 className="text-2xl font-bold text-white mb-2">{ticket.title}</h2>
          <p className="text-gray-400 mb-4">{ticket.description}</p>
          <div className="flex gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[ticket.status]}`}>
              {ticket.status}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColor[ticket.priority]}`}>
              {ticket.priority}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Created by: {ticket.createdBy?.username || 'Unknown'}
          </p>
        </div>

        {/* Comments */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow mb-6">
          <h3 className="text-lg font-bold text-white mb-4">
            💬 Comments ({comments.length})
          </h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {comment.author?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">
                        {comment.author?.username}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        comment.author?.role === 'admin'
                          ? 'bg-red-900 text-red-400'
                          : 'bg-blue-900 text-blue-400'
                      }`}>
                        {comment.author?.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-white mb-4">Add Comment</h3>
          <form onSubmit={handleAddComment}>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 transition mb-3"
              rows="3"
              placeholder="Write a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition"
            >
              {submitting ? 'Sending...' : '💬 Add Comment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail