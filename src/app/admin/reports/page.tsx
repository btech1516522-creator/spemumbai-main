'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageUploadField from '@/components/admin/ImageUploadField'
import PdfUploadField from '@/components/admin/PdfUploadField'

interface Report {
  id: string
  title: string
  coverImage: string
  pdfUrl: string
  description: string
  active: boolean
}

export default function ReportsManagement() {
  const [reports, setReports] = useState<Report[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  useEffect(() => {
    fetch('/api/content?type=reports')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReports(data)
        } else {
          setReports([])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const saveReports = async () => {
    const nextErrors = validateReports(reports)
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
        body: JSON.stringify({ type: 'reports', data: reports }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Reports saved successfully!' })
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

  const addReport = () => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: '',
      coverImage: '',
      pdfUrl: '',
      description: '',
      active: true,
    }
    setReports([newReport, ...reports])
    setEditingId(newReport.id)
  }

  const updateReport = (id: string, field: string, value: string | boolean) => {
    setValidationErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
    setReports(reports.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const removeReport = (id: string) => {
    if (confirm('Remove this report?')) {
      setReports(reports.filter((r) => r.id !== id))
    }
  }

  const isValidFileLink = (value: string) => {
    if (!value) return false
    if (value.startsWith('/')) return true
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const getReportErrors = (report: Report) => {
    const errors: string[] = []

    if (!report.title.trim()) errors.push('Report title is required.')
    if (!report.pdfUrl.trim()) {
      errors.push('PDF file is required.')
    } else if (!isValidFileLink(report.pdfUrl.trim())) {
      errors.push('PDF link must be a valid URL or uploaded file path.')
    }
    if (!report.description.trim()) errors.push('Description is required.')

    return errors
  }

  const validateReports = (rows: Report[]) => {
    return rows.reduce<Record<string, string[]>>((acc, report) => {
      const errors = getReportErrors(report)
      if (errors.length > 0) {
        acc[report.id] = errors
      }
      return acc
    }, {})
  }

  const filteredReports = reports.filter((report) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      !term ||
      [report.title, report.description, report.pdfUrl]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && report.active) ||
      (statusFilter === 'inactive' && !report.active)

    return matchesSearch && matchesStatus
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
          <h1 className="text-2xl font-bold text-spe-navy">Reports Management</h1>
          <p className="text-spe-gray-600 mt-1">Manage downloadable reports and publications.</p>
        </div>
        <button onClick={addReport} className="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Report
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-lg border border-spe-gray-200 bg-spe-gray-50 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, description, or PDF path"
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
        <p className="text-sm text-spe-gray-500">Showing {filteredReports.length} of {reports.length} reports</p>
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

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-spe-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-spe-gray-500">No reports yet. Click &quot;Add Report&quot; to create one.</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-12 text-center">
          <p className="text-spe-gray-500">No reports match your current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-spe-gray-100 overflow-hidden"
            >
              {editingId === report.id ? (
                <div className="p-5 space-y-4">
                  {validationErrors[report.id] && validationErrors[report.id].length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {validationErrors[report.id].map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Title *</label>
                      <input
                        type="text"
                        value={report.title}
                        onChange={(e) => updateReport(report.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="Report title..."
                      />
                    </div>
                    <div>
                      <PdfUploadField
                        label="PDF File *"
                        value={report.pdfUrl}
                        onChange={(path) => updateReport(report.id, 'pdfUrl', path)}
                        placeholder="No PDF selected"
                      />
                    </div>
                  </div>
                  <div>
                    <ImageUploadField
                      label="Cover Image"
                      value={report.coverImage}
                      onChange={(path) => updateReport(report.id, 'coverImage', path)}
                      placeholder="No cover image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Description *</label>
                    <textarea
                      value={report.description}
                      onChange={(e) => updateReport(report.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                      placeholder="Brief description..."
                    />
                  </div>
                  <p className="text-xs text-spe-gray-500">* Required fields.</p>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={report.active}
                        onChange={(e) => updateReport(report.id, 'active', e.target.checked)}
                        className="rounded border-spe-gray-300 text-spe-navy focus:ring-spe-navy"
                      />
                      Active
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={saveReports}
                        disabled={saving}
                        className="px-4 py-1.5 text-sm font-medium text-white bg-spe-navy border border-spe-navy rounded-lg hover:bg-spe-blue-700 disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => removeReport(report.id)}
                        className="px-4 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${report.active ? 'bg-green-400' : 'bg-spe-gray-300'}`} />
                    <div>
                      <h3 className="font-semibold text-spe-navy">{report.title || 'Untitled Report'}</h3>
                      <div className="flex items-center gap-3 text-xs text-spe-gray-500 mt-1">
                        <span>{report.pdfUrl || 'No PDF linked'}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${report.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {report.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingId(report.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-spe-navy border border-spe-navy rounded-lg hover:bg-spe-navy hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => removeReport(report.id)}
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
