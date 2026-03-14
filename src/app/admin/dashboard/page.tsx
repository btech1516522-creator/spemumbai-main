'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MultiImageUploadField from '@/components/admin/MultiImageUploadField'

type DashboardGraph = {
  src: string
  title: string
  caption: string
  active: boolean
}

export default function DashboardGraphsManagement() {
  const [graphs, setGraphs] = useState<DashboardGraph[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    const fetchGraphs = async () => {
      try {
        const res = await fetch('/api/content?type=dashboardGraphs')
        const data = await res.json()
        if (Array.isArray(data)) {
          setGraphs(
            data
              .filter((item): item is DashboardGraph => !!item && typeof item === 'object' && typeof item.src === 'string')
              .map((item, index) => ({
                src: item.src,
                title: item.title?.trim() || `Performance Graph ${index + 1}`,
                caption: item.caption ?? '',
                active: item.active ?? true,
              }))
          )
        }
      } catch {
        // Keep empty state when request fails.
      } finally {
        setLoading(false)
      }
    }

    fetchGraphs()
  }, [])

  const saveGraphs = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'dashboardGraphs', data: graphs }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Dashboard graphs saved successfully!' })
      } else {
        const err = await res.json()
        setMessage({ type: 'error', text: err.error || 'Failed to save dashboard graphs' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error while saving' })
    } finally {
      setSaving(false)
    }
  }

  const handleImageListChange = (paths: string[]) => {
    setGraphs((prev) =>
      paths.map((src, index) => {
        const existing = prev.find((item) => item.src === src)
        return {
          src,
          title: existing?.title || `Performance Graph ${index + 1}`,
          caption: existing?.caption || '',
          active: existing?.active ?? true,
        }
      })
    )
  }

  const updateGraph = (index: number, field: keyof DashboardGraph, value: string | boolean) => {
    setGraphs((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-spe-navy mb-4"></div>
          <p className="text-spe-gray-600">Loading dashboard graphs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-spe-gray-900">Dashboard Graphs</h1>
        <p className="text-spe-gray-600 mt-1">
          Add, remove, and reorder graphs shown on the public Dashboard page.
        </p>
      </div>

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

      <div className="bg-white border border-spe-gray-200 rounded-xl p-6 shadow-sm">
        <MultiImageUploadField
          label="Graph Images"
          images={graphs.map((g) => g.src)}
          onChange={handleImageListChange}
        />

        {graphs.length > 0 && (
          <div className="mt-6 space-y-4">
            {graphs.map((graph, index) => (
              <div key={`${graph.src}-${index}`} className="border border-spe-gray-200 rounded-lg p-4 bg-spe-gray-50">
                <p className="text-sm font-semibold text-spe-gray-700 mb-3">Graph {index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-spe-gray-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={graph.title}
                      onChange={(e) => updateGraph(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                      placeholder={`Performance Graph ${index + 1}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-spe-gray-600 mb-1">Caption (optional)</label>
                    <input
                      type="text"
                      value={graph.caption}
                      onChange={(e) => updateGraph(index, 'caption', e.target.value)}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spe-navy text-sm"
                      placeholder="Short description shown under expanded chart"
                    />
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    checked={graph.active}
                    onChange={(e) => updateGraph(index, 'active', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs font-semibold text-spe-gray-700">Published on public dashboard</span>
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-spe-gray-200 flex items-center justify-between">
          <p className="text-sm text-spe-gray-500">
            Total graphs: <span className="font-semibold text-spe-gray-700">{graphs.length}</span>
          </p>
          <button
            onClick={saveGraphs}
            disabled={saving}
            className="px-5 py-2.5 bg-spe-navy text-white rounded-lg hover:bg-spe-navy-dark disabled:opacity-50 font-semibold transition"
          >
            {saving ? 'Saving...' : 'Save Dashboard Graphs'}
          </button>
        </div>
      </div>
    </div>
  )
}
