'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
  active: boolean
}

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const saveEvents = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'events', data: events }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Events saved successfully!' })
        setEditingId(null)
      } else {
        const err = await res.json()
        setMessage({ type: 'error', text: err.error || 'Failed to save' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }
  }

  const addEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      description: '',
      active: true,
    }
    setEvents([newEvent, ...events])
    setEditingId(newEvent.id)
  }

  const updateEvent = (id: string, field: string, value: string | boolean) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const removeEvent = (id: string) => {
    if (confirm('Are you sure you want to remove this event?')) {
      setEvents(events.filter((e) => e.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-spe-navy border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-spe-navy">Events Management</h1>
          <p className="text-spe-gray-600 mt-1">Create, edit, and manage events.</p>
        </div>
        <button
          onClick={addEvent}
          className="btn-primary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Status Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {events.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-spe-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-spe-gray-500">No events yet. Click &quot;Add Event&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-spe-gray-100 overflow-hidden"
            >
              {editingId === event.id ? (
                // Edit mode
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => updateEvent(event.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                        placeholder="Event title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => updateEvent(event.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={event.location}
                      onChange={(e) => updateEvent(event.id, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                      placeholder="Event location..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Description</label>
                    <textarea
                      value={event.description}
                      onChange={(e) => updateEvent(event.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                      placeholder="Event description..."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={event.active}
                        onChange={(e) => updateEvent(event.id, 'active', e.target.checked)}
                        className="rounded border-spe-gray-300 text-spe-navy focus:ring-spe-navy"
                      />
                      Active
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEvents}
                        disabled={saving}
                        className="px-4 py-1.5 text-sm font-medium text-white bg-spe-navy border border-spe-navy rounded-lg hover:bg-spe-blue-700 disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => removeEvent(event.id)}
                        className="px-4 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 border border-red-300 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${event.active ? 'bg-green-400' : 'bg-spe-gray-300'}`} />
                    <div>
                      <h3 className="font-semibold text-spe-navy">{event.title || 'Untitled Event'}</h3>
                      <div className="flex items-center gap-3 text-xs text-spe-gray-500 mt-1">
                        <span>{event.date || 'No date'}</span>
                        {event.location && <span>| {event.location}</span>}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {event.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingId(event.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-spe-navy border border-spe-navy rounded-lg hover:bg-spe-navy hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}


    </div>
  )
}
