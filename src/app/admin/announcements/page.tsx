'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/content?type=announcements')
      const data = await res.json()
      if (Array.isArray(data)) {
        setAnnouncements(data)
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const saveAnnouncements = async () => {
    const nextErrors = validateAnnouncements(announcements)
    if (Object.keys(nextErrors).length > 0) {
      const [firstInvalidId] = Object.keys(nextErrors)
      setValidationErrors(nextErrors)
      setEditingId(firstInvalidId)
      setMessage({ type: 'error', text: nextErrors[firstInvalidId][0] })
      return
    }

    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'announcements', data: announcements }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Announcements saved successfully!' })
        setEditingId(null)
      } else {
        const err = await res.json()
        setMessage({ type: 'error', text: err.error || 'Failed to save' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' })
    } finally {
      setSaving(false)
    }
  }

  const handleAddNew = () => {
    const newAnnouncement: Announcement = {
      id: `temp-${Date.now()}`,
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      active: true,
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setEditingId(newAnnouncement.id)
  }

  const updateField = (id: string, field: keyof Announcement, value: any) => {
    setValidationErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, [field]: value } : ann))
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id))
    const updated = announcements.filter((ann) => ann.id !== id)
    
    setSaving(true)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'announcements', data: updated }),
      })
      setMessage({ type: 'success', text: 'Announcement deleted' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' })
    } finally {
      setSaving(false)
    }
  }

  const getAnnouncementErrors = (announcement: Announcement) => {
    const errors: string[] = []

    if (!announcement.title.trim()) errors.push('Announcement title is required.')
    if (!announcement.content.trim()) errors.push('Announcement content is required.')
    if (!announcement.date.trim()) errors.push('Announcement date is required.')

    return errors
  }

  const validateAnnouncements = (rows: Announcement[]) => {
    return rows.reduce<Record<string, string[]>>((acc, announcement) => {
      const errors = getAnnouncementErrors(announcement)
      if (errors.length > 0) {
        acc[announcement.id] = errors
      }
      return acc
    }, {})
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      !term ||
      [announcement.title, announcement.content, announcement.date]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && announcement.active) ||
      (statusFilter === 'inactive' && !announcement.active)

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-spe-navy mb-4"></div>
          <p className="text-spe-gray-600">Loading announcements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-spe-gray-900">Announcements</h1>
              <p className="text-spe-gray-600 mt-1">Manage and publish announcements for your community</p>
            </div>
            <button
              onClick={handleAddNew}
              disabled={saving}
              className="px-4 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark disabled:opacity-50 font-semibold transition"
            >
              + New Announcement
            </button>
          </div>
        </motion.div>

        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-spe-gray-200 bg-spe-gray-50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, content, or date"
              className="w-full md:max-w-md rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
            >
              <option value="all">All statuses</option>
              <option value="active">Active only</option>
              <option value="inactive">Inactive only</option>
            </select>
          </div>
          <p className="text-sm text-spe-gray-500">Showing {filteredAnnouncements.length} of {announcements.length} announcements</p>
        </div>

        {/* Message */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Announcements List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-12 bg-spe-gray-50 rounded-lg border border-spe-gray-200">
              <p className="text-spe-gray-500 text-lg">No announcements yet. Create one to get started!</p>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12 bg-spe-gray-50 rounded-lg border border-spe-gray-200">
              <p className="text-spe-gray-500 text-lg">No announcements match your current filters.</p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-spe-gray-200 rounded-lg hover:shadow-md transition"
              >
                {editingId === announcement.id ? (
                  // Edit Mode
                  <div className="p-6 space-y-4">
                    {validationErrors[announcement.id] && validationErrors[announcement.id].length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {validationErrors[announcement.id].map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Title *</label>
                      <input
                        type="text"
                        value={announcement.title}
                        onChange={(e) => updateField(announcement.id, 'title', e.target.value)}
                        placeholder="Announcement title..."
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Content *</label>
                      <textarea
                        value={announcement.content}
                        onChange={(e) => updateField(announcement.id, 'content', e.target.value)}
                        placeholder="Announcement details..."
                        rows={4}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          value={announcement.date}
                          onChange={(e) => updateField(announcement.id, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 mt-6">
                          <input
                            type="checkbox"
                            checked={announcement.active}
                            onChange={(e) => updateField(announcement.id, 'active', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm font-semibold text-spe-gray-700">Active</span>
                        </label>
                      </div>
                    </div>

                    <p className="text-xs text-spe-gray-500">* Required fields.</p>

                    <div className="flex gap-2 pt-4 border-t border-spe-gray-200">
                      <button
                        onClick={saveAnnouncements}
                        disabled={saving}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold transition"
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        disabled={saving}
                        className="px-4 py-2 border border-spe-gray-300 text-spe-gray-700 rounded-lg hover:bg-spe-gray-50 font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-spe-gray-900">{announcement.title || '(Untitled)'}</h3>
                        <p className="text-sm text-spe-gray-500 mt-1">
                          {new Date(announcement.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          announcement.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-spe-gray-200 text-spe-gray-700'
                        }`}
                      >
                        {announcement.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-spe-gray-700 mb-4 line-clamp-3">{announcement.content}</p>

                    <div className="flex gap-2 pt-3 border-t border-spe-gray-200">
                      <button
                        onClick={() => setEditingId(announcement.id)}
                        className="flex-1 px-3 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark font-semibold transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
