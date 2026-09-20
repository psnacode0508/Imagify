import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const SettingsModal = ({ isOpen, onClose }) => {
  const { user, setUser, backendUrl, token } = useContext(AppContext)
  const [newName, setNewName] = useState(user?.name || '')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!newName.trim()) {
      toast.warn('Please provide a name')
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        { name: newName },
        { headers: { token } }
      )

      if (data.success) {
        setUser({ ...user, name: data.user.name })
        toast.success('Name updated successfully!')
        onClose()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm w-full p-6 text-white relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-mono font-bold tracking-wide">SETTINGS</h2>
          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-white font-mono text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              DISPLAY NAME
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold transition disabled:opacity-50"
            >
              {loading ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsModal
