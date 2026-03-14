'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageUploadField from '@/components/admin/ImageUploadField'

interface Leadership {
  position: string
  name: string
}

interface StudentChapter {
  id: string
  name: string
  university: string
  location: string
  established: string
  description: string
  website?: string
  image?: string
  achievements: Leadership[] | string
  activities: Leadership[] | string
  leadership: Leadership[] | string
  sortOrder: number
  active: boolean
}

export default function StudentsManagement() {
  const [chapters, setChapters] = useState<StudentChapter[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    fetchChapters()
  }, [])

  const fetchChapters = async () => {
    try {
      const res = await fetch('/api/content?type=students')
      const data = await res.json()
      if (Array.isArray(data)) {
        setChapters(data.map((ch: any) => ({
          ...ch,
          achievements: typeof ch.achievements === 'string' ? JSON.parse(ch.achievements) : ch.achievements,
          activities: typeof ch.activities === 'string' ? JSON.parse(ch.activities) : ch.activities,
          leadership: typeof ch.leadership === 'string' ? JSON.parse(ch.leadership) : ch.leadership,
        })))
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const saveChapters = async () => {
    const nextErrors = validateChapters(chapters)
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
      const dataToSave = chapters.map(ch => ({
        ...ch,
        achievements: typeof ch.achievements === 'string' ? ch.achievements : JSON.stringify(ch.achievements),
        activities: typeof ch.activities === 'string' ? ch.activities : JSON.stringify(ch.activities),
        leadership: typeof ch.leadership === 'string' ? ch.leadership : JSON.stringify(ch.leadership),
      }))

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'students', data: dataToSave }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Student chapters saved successfully!' })
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

  const saveChapterWithStatus = async (id: string, active: boolean) => {
    const updated = chapters.map((ch) => (ch.id === id ? { ...ch, active } : ch))
    const nextErrors = validateChapters(updated)
    if (Object.keys(nextErrors).length > 0) {
      const [firstInvalidId] = Object.keys(nextErrors)
      setValidationErrors(nextErrors)
      setEditingId(firstInvalidId)
      setMessage({ type: 'error', text: nextErrors[firstInvalidId][0] })
      return
    }

    setChapters(updated)

    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      const dataToSave = updated.map(ch => ({
        ...ch,
        achievements: typeof ch.achievements === 'string' ? ch.achievements : JSON.stringify(ch.achievements),
        activities: typeof ch.activities === 'string' ? ch.activities : JSON.stringify(ch.activities),
        leadership: typeof ch.leadership === 'string' ? ch.leadership : JSON.stringify(ch.leadership),
      }))

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'students', data: dataToSave }),
      })

      if (res.ok) {
        setMessage({
          type: 'success',
          text: active ? 'Chapter published successfully!' : 'Chapter saved as draft successfully!',
        })
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
    const newChapter: StudentChapter = {
      id: `temp-${Date.now()}`,
      name: '',
      university: '',
      location: '',
      established: '',
      description: '',
      website: '',
      image: '',
      achievements: [],
      activities: [],
      leadership: [],
      sortOrder: chapters.length,
      active: true,
    }
    setChapters([...chapters, newChapter])
    setEditingId(newChapter.id)
  }

  const updateField = (id: string, field: keyof StudentChapter, value: any) => {
    setValidationErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
    setChapters((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, [field]: value } : ch))
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this student chapter?')) return
    const updated = chapters.filter((ch) => ch.id !== id)
    setChapters(updated)

    setSaving(true)
    try {
      const dataToSave = updated.map(ch => ({
        ...ch,
        achievements: typeof ch.achievements === 'string' ? ch.achievements : JSON.stringify(ch.achievements),
        activities: typeof ch.activities === 'string' ? ch.activities : JSON.stringify(ch.activities),
        leadership: typeof ch.leadership === 'string' ? ch.leadership : JSON.stringify(ch.leadership),
      }))
      
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'students', data: dataToSave }),
      })
      setMessage({ type: 'success', text: 'Chapter deleted' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' })
    } finally {
      setSaving(false)
    }
  }

  const parseArrayField = (value: any): string[] => {
    if (Array.isArray(value)) return value.map(v => typeof v === 'string' ? v : JSON.stringify(v))
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed.map(v => typeof v === 'string' ? v : JSON.stringify(v)) : []
      } catch {
        return []
      }
    }
    return []
  }

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const getChapterErrors = (chapter: StudentChapter) => {
    const errors: string[] = []

    if (!chapter.name.trim()) errors.push('Chapter name is required.')
    if (!chapter.university.trim()) errors.push('University name is required.')
    if (!chapter.description.trim()) errors.push('Description is required.')
    if (chapter.website && chapter.website.trim() && !isValidUrl(chapter.website.trim())) {
      errors.push('Website must be a valid URL.')
    }
    if (chapter.established && chapter.established.trim() && !/^\d{4}$/.test(chapter.established.trim())) {
      errors.push('Established year must be a 4-digit year.')
    }

    return errors
  }

  const validateChapters = (rows: StudentChapter[]) => {
    return rows.reduce<Record<string, string[]>>((acc, chapter) => {
      const errors = getChapterErrors(chapter)
      if (errors.length > 0) {
        acc[chapter.id] = errors
      }
      return acc
    }, {})
  }

  const filteredChapters = chapters.filter((chapter) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      !term ||
      [chapter.name, chapter.university, chapter.location, chapter.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && chapter.active) ||
      (statusFilter === 'inactive' && !chapter.active)

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-spe-navy mb-4"></div>
          <p className="text-spe-gray-600">Loading student chapters...</p>
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
              <h1 className="text-3xl font-bold text-spe-gray-900">Student Chapters</h1>
              <p className="text-spe-gray-600 mt-1">Manage university student chapters and programs</p>
            </div>
            <button
              onClick={handleAddNew}
              disabled={saving}
              className="px-4 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark disabled:opacity-50 font-semibold transition"
            >
              + New Chapter
            </button>
          </div>
        </motion.div>

        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-spe-gray-200 bg-spe-gray-50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by chapter, university, location, or description"
              className="w-full md:max-w-md rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
            >
              <option value="all">All statuses</option>
              <option value="active">Published only</option>
              <option value="inactive">Draft only</option>
            </select>
          </div>
          <p className="text-sm text-spe-gray-500">Showing {filteredChapters.length} of {chapters.length} chapters</p>
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

        {/* Chapters List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {chapters.length === 0 ? (
            <div className="text-center py-12 bg-spe-gray-50 rounded-lg border border-spe-gray-200">
              <p className="text-spe-gray-500 text-lg">No student chapters yet. Create one to get started!</p>
            </div>
          ) : filteredChapters.length === 0 ? (
            <div className="text-center py-12 bg-spe-gray-50 rounded-lg border border-spe-gray-200">
              <p className="text-spe-gray-500 text-lg">No student chapters match your current filters.</p>
            </div>
          ) : (
            filteredChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-spe-gray-200 rounded-lg hover:shadow-md transition"
              >
                {editingId === chapter.id ? (
                  // Edit Mode
                  <div className="p-6 space-y-4">
                    {validationErrors[chapter.id] && validationErrors[chapter.id].length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {validationErrors[chapter.id].map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Chapter Name *</label>
                        <input
                          type="text"
                          value={chapter.name}
                          onChange={(e) => updateField(chapter.id, 'name', e.target.value)}
                          placeholder="Chapter name..."
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">University *</label>
                        <input
                          type="text"
                          value={chapter.university}
                          onChange={(e) => updateField(chapter.id, 'university', e.target.value)}
                          placeholder="University name..."
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={chapter.location}
                          onChange={(e) => updateField(chapter.id, 'location', e.target.value)}
                          placeholder="City, State..."
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Established Year</label>
                        <input
                          type="text"
                          value={chapter.established}
                          onChange={(e) => updateField(chapter.id, 'established', e.target.value)}
                          placeholder="e.g., 2013..."
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={chapter.website || ''}
                        onChange={(e) => updateField(chapter.id, 'website', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Description *</label>
                      <textarea
                        value={chapter.description}
                        onChange={(e) => updateField(chapter.id, 'description', e.target.value)}
                        placeholder="Chapter description..."
                        rows={3}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Chapter Image</label>
                      <ImageUploadField
                        value={chapter.image || ''}
                        onChange={(value) => updateField(chapter.id, 'image', value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-2">Achievements (one per line)</label>
                        <textarea
                          value={parseArrayField(chapter.achievements).join('\n')}
                          onChange={(e) => updateField(chapter.id, 'achievements', e.target.value.split('\n').filter(l => l.trim()))}
                          placeholder="Achievement 1&#10;Achievement 2..."
                          rows={3}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-2">Activities (one per line)</label>
                        <textarea
                          value={parseArrayField(chapter.activities).join('\n')}
                          onChange={(e) => updateField(chapter.id, 'activities', e.target.value.split('\n').filter(l => l.trim()))}
                          placeholder="Activity 1&#10;Activity 2..."
                          rows={3}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mt-4">
                        <input
                          type="checkbox"
                          checked={chapter.active}
                          onChange={(e) => updateField(chapter.id, 'active', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm font-semibold text-spe-gray-700">Published (visible on public page)</span>
                      </label>
                    </div>

                    <p className="text-xs text-spe-gray-500">* Required fields.</p>

                    <div className="flex gap-2 pt-4 border-t border-spe-gray-200">
                      <button
                        onClick={() => saveChapterWithStatus(chapter.id, false)}
                        disabled={saving}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 font-semibold transition"
                      >
                        Save as Draft
                      </button>
                      <button
                        onClick={() => saveChapterWithStatus(chapter.id, true)}
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition"
                      >
                        Publish
                      </button>
                      <button
                        onClick={saveChapters}
                        disabled={saving}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold transition"
                      >
                        {saving ? 'Saving...' : 'Save All'}
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
                        <h3 className="text-lg font-semibold text-spe-gray-900">{chapter.name}</h3>
                        <p className="text-sm text-spe-gray-600 mt-1">{chapter.university}</p>
                        <p className="text-xs text-spe-gray-500">{chapter.location} • Est. {chapter.established}</p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          chapter.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-spe-gray-200 text-spe-gray-700'
                        }`}
                      >
                        {chapter.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-spe-gray-700 mb-4 line-clamp-3">{chapter.description}</p>

                    <div className="flex gap-2 pt-3 border-t border-spe-gray-200">
                      <button
                        onClick={() => setEditingId(chapter.id)}
                        className="flex-1 px-3 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark font-semibold transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(chapter.id)}
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
