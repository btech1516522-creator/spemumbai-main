'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface VolunteerRole {
  id: string
  title: string
  category: string
  description: string
  responsibilities: string
  timeCommitment: string
  location: string
  teamWork: string
  skills: string
  benefits: string
  sortOrder: number
  active: boolean
}

const categories = ['education', 'events', 'outreach', 'mentoring', 'other']

export default function VolunteeringManagement() {
  const [roles, setRoles] = useState<VolunteerRole[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/content?type=volunteering')
      const data = await res.json()
      if (Array.isArray(data)) {
        setRoles(data)
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const saveRoles = async () => {
    const nextErrors = validateRoles(roles)
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
        body: JSON.stringify({ type: 'volunteering', data: roles }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Volunteer roles saved successfully!' })
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

  const saveRoleWithStatus = async (id: string, active: boolean) => {
    const updated = roles.map((role) => (role.id === id ? { ...role, active } : role))
    const nextErrors = validateRoles(updated)
    if (Object.keys(nextErrors).length > 0) {
      const [firstInvalidId] = Object.keys(nextErrors)
      setValidationErrors(nextErrors)
      setEditingId(firstInvalidId)
      setMessage({ type: 'error', text: nextErrors[firstInvalidId][0] })
      return
    }

    setRoles(updated)

    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'volunteering', data: updated }),
      })

      if (res.ok) {
        setMessage({
          type: 'success',
          text: active ? 'Role published successfully!' : 'Role saved as draft successfully!',
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
    const newRole: VolunteerRole = {
      id: `temp-${Date.now()}`,
      title: '',
      category: 'education',
      description: '',
      responsibilities: '',
      timeCommitment: '',
      location: '',
      teamWork: '',
      skills: '',
      benefits: '',
      sortOrder: roles.length,
      active: true,
    }
    setRoles([...roles, newRole])
    setEditingId(newRole.id)
  }

  const updateField = (id: string, field: keyof VolunteerRole, value: any) => {
    setValidationErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
    setRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, [field]: value } : role))
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this volunteer role?')) return
    const updated = roles.filter((role) => role.id !== id)
    setRoles(updated)

    setSaving(true)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'volunteering', data: updated }),
      })
      setMessage({ type: 'success', text: 'Role deleted' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' })
    } finally {
      setSaving(false)
    }
  }

  const getRoleErrors = (role: VolunteerRole) => {
    const errors: string[] = []

    if (!role.title.trim()) errors.push('Role title is required.')
    if (!role.category.trim()) errors.push('Role category is required.')
    if (!role.description.trim()) errors.push('Description is required.')
    if (!role.responsibilities.trim()) errors.push('Responsibilities are required.')
    if (!role.timeCommitment.trim()) errors.push('Time commitment is required.')
    if (!role.location.trim()) errors.push('Location is required.')

    return errors
  }

  const validateRoles = (rows: VolunteerRole[]) => {
    return rows.reduce<Record<string, string[]>>((acc, role) => {
      const errors = getRoleErrors(role)
      if (errors.length > 0) {
        acc[role.id] = errors
      }
      return acc
    }, {})
  }

  const filteredRoles = roles.filter((role) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      !term ||
      [role.title, role.category, role.description, role.location, role.skills]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && role.active) ||
      (statusFilter === 'inactive' && !role.active)

    const matchesCategory = categoryFilter === 'all' || role.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-spe-navy mb-4"></div>
          <p className="text-spe-gray-600">Loading volunteer roles...</p>
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
              <h1 className="text-3xl font-bold text-spe-gray-900">Volunteer Roles</h1>
              <p className="text-spe-gray-600 mt-1">Manage volunteer opportunities and programs</p>
            </div>
            <button
              onClick={handleAddNew}
              disabled={saving}
              className="px-4 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark disabled:opacity-50 font-semibold transition"
            >
              + New Role
            </button>
          </div>
        </motion.div>

        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-spe-gray-200 bg-spe-gray-50 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, category, description, location, or skills"
              className="w-full lg:max-w-md rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
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
          <p className="text-sm text-spe-gray-500">Showing {filteredRoles.length} of {roles.length} roles</p>
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

        {/* Roles List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {roles.length === 0 ? (
            <div className="text-center py-12 bg-spe-gray-50 rounded-lg border border-spe-gray-200">
              <p className="text-spe-gray-500 text-lg">No volunteer roles yet. Create one to get started!</p>
            </div>
          ) : filteredRoles.length === 0 ? (
            <div className="text-center py-12 bg-spe-gray-50 rounded-lg border border-spe-gray-200">
              <p className="text-spe-gray-500 text-lg">No volunteer roles match your current filters.</p>
            </div>
          ) : (
            filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-spe-gray-200 rounded-lg hover:shadow-md transition"
              >
                {editingId === role.id ? (
                  // Edit Mode
                  <div className="p-6 space-y-4">
                    {validationErrors[role.id] && validationErrors[role.id].length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {validationErrors[role.id].map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Role Title *</label>
                        <input
                          type="text"
                          value={role.title}
                          onChange={(e) => updateField(role.id, 'title', e.target.value)}
                          placeholder="Role title..."
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Category *</label>
                        <select
                          value={role.category}
                          onChange={(e) => updateField(role.id, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="capitalize">
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Description *</label>
                      <textarea
                        value={role.description}
                        onChange={(e) => updateField(role.id, 'description', e.target.value)}
                        placeholder="Role description..."
                        rows={2}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Responsibilities *</label>
                      <textarea
                        value={role.responsibilities}
                        onChange={(e) => updateField(role.id, 'responsibilities', e.target.value)}
                        placeholder="Key responsibilities..."
                        rows={3}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Time Commitment *</label>
                        <textarea
                          value={role.timeCommitment}
                          onChange={(e) => updateField(role.id, 'timeCommitment', e.target.value)}
                          placeholder="Time requirements..."
                          rows={2}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Location *</label>
                        <textarea
                          value={role.location}
                          onChange={(e) => updateField(role.id, 'location', e.target.value)}
                          placeholder="Where the role operates..."
                          rows={2}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Team Work</label>
                        <textarea
                          value={role.teamWork}
                          onChange={(e) => updateField(role.id, 'teamWork', e.target.value)}
                          placeholder="Team structure and collaboration..."
                          rows={2}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Skills Required</label>
                        <textarea
                          value={role.skills}
                          onChange={(e) => updateField(role.id, 'skills', e.target.value)}
                          placeholder="Required and preferred skills..."
                          rows={2}
                          className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Benefits</label>
                      <textarea
                        value={role.benefits}
                        onChange={(e) => updateField(role.id, 'benefits', e.target.value)}
                        placeholder="Benefits of volunteering in this role..."
                        rows={2}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={role.active}
                        onChange={(e) => updateField(role.id, 'active', e.target.checked)}
                        id={`active-${role.id}`}
                        className="rounded"
                      />
                      <label htmlFor={`active-${role.id}`} className="text-sm font-semibold text-spe-gray-700">
                        Published (visible on public page)
                      </label>
                    </div>

                    <p className="text-xs text-spe-gray-500">* Required fields.</p>

                    <div className="flex gap-2 pt-4 border-t border-spe-gray-200">
                      <button
                        onClick={() => saveRoleWithStatus(role.id, false)}
                        disabled={saving}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 font-semibold transition"
                      >
                        Save as Draft
                      </button>
                      <button
                        onClick={() => saveRoleWithStatus(role.id, true)}
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition"
                      >
                        Publish
                      </button>
                      <button
                        onClick={saveRoles}
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
                        <h3 className="text-lg font-semibold text-spe-gray-900">{role.title}</h3>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                            {role.category}
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              role.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-spe-gray-200 text-spe-gray-700'
                            }`}
                          >
                            {role.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-spe-gray-700 mb-4 line-clamp-3">{role.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-spe-gray-600 mb-4">
                      <p><strong>Location:</strong> {role.location.substring(0, 50)}...</p>
                      <p><strong>Time:</strong> {role.timeCommitment.substring(0, 50)}...</p>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-spe-gray-200">
                      <button
                        onClick={() => setEditingId(role.id)}
                        className="flex-1 px-3 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark font-semibold transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
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
