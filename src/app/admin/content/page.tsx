'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  active: boolean
}

export default function ContentManagement() {
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setHeroTitle(data.heroTitle || '')
        setHeroSubtitle(data.heroSubtitle || '')
        setAnnouncements(data.announcements || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const saveContent = async (type: string, data: unknown) => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: `${type} saved successfully!` })
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

  const addAnnouncement = () => {
    setAnnouncements([
      ...announcements,
      {
        id: Date.now().toString(),
        title: '',
        content: '',
        date: new Date().toISOString(),
        active: true,
      },
    ])
  }

  const updateAnnouncement = (id: string, field: string, value: string | boolean) => {
    setAnnouncements(
      announcements.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    )
  }

  const removeAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-spe-navy">Content Management</h1>
        <p className="text-spe-gray-600 mt-1">Edit the website hero section and announcements.</p>
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

      {/* Hero Section Editor */}
      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-spe-navy mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
              Hero Title
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 
                focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
              placeholder="Main headline..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
              Hero Subtitle
            </label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 
                focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
              placeholder="Sub-headline..."
            />
          </div>
          <button
            onClick={() => saveContent('heroTitle', heroTitle).then(() => saveContent('heroSubtitle', heroSubtitle))}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Hero Section'}
          </button>
        </div>
      </div>

      {/* Announcements Editor */}
      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-spe-navy">Announcements</h2>
          <button
            onClick={addAnnouncement}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-spe-navy 
              border border-spe-navy rounded-lg hover:bg-spe-navy hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>

        {announcements.length === 0 ? (
          <p className="text-spe-gray-500 text-sm py-8 text-center">No announcements yet. Click &quot;Add&quot; to create one.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-spe-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-spe-gray-500">#{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={announcement.active}
                        onChange={(e) => updateAnnouncement(announcement.id, 'active', e.target.checked)}
                        className="rounded border-spe-gray-300 text-spe-navy focus:ring-spe-navy"
                      />
                      Active
                    </label>
                    <button
                      onClick={() => removeAnnouncement(announcement.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={announcement.title}
                    onChange={(e) => updateAnnouncement(announcement.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm 
                      focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="Announcement title..."
                  />
                  <textarea
                    value={announcement.content}
                    onChange={(e) => updateAnnouncement(announcement.id, 'content', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm 
                      focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="Announcement content..."
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <button
          onClick={() => saveContent('announcements', announcements)}
          disabled={saving}
          className="btn-primary mt-4 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Announcements'}
        </button>
      </div>
    </div>
  )
}
