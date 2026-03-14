'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageUploadField from '@/components/admin/ImageUploadField'

interface LeaderMember {
  id: string
  name: string
  position: string
  organization: string
  bio: string
  linkedin?: string
  image?: string
}

export default function LeadershipManagement() {
  const [members, setMembers] = useState<LeaderMember[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    fetch('/api/content?type=leadership')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data)
        } else {
          // Load defaults from the static data
          setMembers([])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const saveMembers = async () => {
    const nextErrors = validateMembers(members)
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
        body: JSON.stringify({ type: 'leadership', data: members }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Leadership team saved successfully!' })
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

  const addMember = () => {
    const newMember: LeaderMember = {
      id: Date.now().toString(),
      name: '',
      position: '',
      organization: '',
      bio: '',
      linkedin: '',
      image: '',
    }
    setMembers([...members, newMember])
    setEditingId(newMember.id)
  }

  const updateMember = (id: string, field: string, value: string) => {
    setValidationErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
    setMembers(members.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const removeMember = (id: string) => {
    if (confirm('Remove this member?')) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const getMemberErrors = (member: LeaderMember) => {
    const errors: string[] = []

    if (!member.name.trim()) errors.push('Member name is required.')
    if (!member.position.trim()) errors.push('Position is required.')
    if (!member.organization.trim()) errors.push('Organization is required.')
    if (!member.bio.trim()) errors.push('Bio is required.')
    if (member.linkedin && member.linkedin.trim() && !isValidUrl(member.linkedin.trim())) {
      errors.push('LinkedIn URL must be a valid URL.')
    }

    return errors
  }

  const validateMembers = (rows: LeaderMember[]) => {
    return rows.reduce<Record<string, string[]>>((acc, member) => {
      const errors = getMemberErrors(member)
      if (errors.length > 0) {
        acc[member.id] = errors
      }
      return acc
    }, {})
  }

  const filteredMembers = members.filter((member) => {
    const term = searchTerm.trim().toLowerCase()
    return (
      !term ||
      [member.name, member.position, member.organization, member.bio, member.linkedin ?? '']
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    )
  })

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
          <h1 className="text-2xl font-bold text-spe-navy">Leadership Management</h1>
          <p className="text-spe-gray-600 mt-1">Manage committee members and their details.</p>
        </div>
        <button onClick={addMember} className="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Member
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-lg border border-spe-gray-200 bg-spe-gray-50 p-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, position, organization, bio, or LinkedIn"
          className="w-full md:max-w-md rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
        />
        <p className="text-sm text-spe-gray-500">Showing {filteredMembers.length} of {members.length} members</p>
      </div>

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

      {members.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-spe-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-spe-gray-500 mb-2">No leadership members added yet.</p>
          <p className="text-spe-gray-400 text-sm">Click &quot;Add Member&quot; to start managing the leadership team.</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-12 text-center">
          <p className="text-spe-gray-500">No leadership members match your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-spe-gray-100 overflow-hidden"
            >
              {editingId === member.id ? (
                <div className="p-5 space-y-4">
                  {validationErrors[member.id] && validationErrors[member.id].length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {validationErrors[member.id].map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="Full name..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Position *</label>
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => updateMember(member.id, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="Position title..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Organization *</label>
                      <input
                        type="text"
                        value={member.organization}
                        onChange={(e) => updateMember(member.id, 'organization', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="Organization..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={member.linkedin || ''}
                        onChange={(e) => updateMember(member.id, 'linkedin', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Bio *</label>
                    <textarea
                      value={member.bio}
                      onChange={(e) => updateMember(member.id, 'bio', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                      placeholder="Short bio..."
                    />
                  </div>
                  <div>
                    <ImageUploadField
                      label="Profile Photo"
                      value={member.image || ''}
                      onChange={(path) => updateMember(member.id, 'image', path)}
                      placeholder="No photo"
                    />
                  </div>
                  <p className="text-xs text-spe-gray-500">* Required fields.</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={saveMembers}
                      disabled={saving}
                      className="px-4 py-1.5 text-sm font-medium text-white bg-spe-navy border border-spe-navy rounded-lg hover:bg-spe-blue-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="px-4 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-spe-blue-100 flex items-center justify-center text-spe-navy font-bold text-sm flex-shrink-0">
                      {member.name ? member.name[0] : '?'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-spe-navy">{member.name || 'Unnamed Member'}</h3>
                      <p className="text-xs text-spe-gray-500">
                        {member.position || 'No position'} {member.organization ? `| ${member.organization}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingId(member.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-spe-navy border border-spe-navy rounded-lg hover:bg-spe-navy hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}


    </div>
  )
}
