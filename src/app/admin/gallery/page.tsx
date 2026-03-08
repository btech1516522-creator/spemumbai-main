'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageUploadField from '@/components/admin/ImageUploadField'
import MultiImageUploadField from '@/components/admin/MultiImageUploadField'

interface GalleryEvent {
  id: string
  slug: string
  title: string
  date: string
  coverImage: string
  images: string // JSON string
  active: boolean
  sortOrder: number
}

interface GalleryEventForm {
  id: string
  slug: string
  title: string
  date: string
  coverImage: string
  imagesList: string[] // parsed array for editing
  active: boolean
}

function toForm(g: GalleryEvent): GalleryEventForm {
  let imagesList: string[] = []
  try { imagesList = JSON.parse(g.images) } catch {}
  return { id: g.id, slug: g.slug, title: g.title, date: g.date, coverImage: g.coverImage, imagesList, active: g.active }
}

function fromForm(f: GalleryEventForm): Omit<GalleryEvent, 'sortOrder'> {
  return { id: f.id, slug: f.slug, title: f.title, date: f.date, coverImage: f.coverImage, images: JSON.stringify(f.imagesList.filter(Boolean)), active: f.active }
}

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState<GalleryEventForm[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/content?type=gallery')
      .then((r) => r.json())
      .then((data: GalleryEvent[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleries(data.map(toForm))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const saveAll = async (updatedList?: GalleryEventForm[]) => {
    const list = updatedList ?? galleries
    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'gallery', data: list.map((f) => ({ ...fromForm(f), images: JSON.parse(fromForm(f).images) })) }),
      })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Gallery saved successfully!' })
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

  const addGallery = () => {
    const newG: GalleryEventForm = {
      id: Date.now().toString(),
      slug: '',
      title: '',
      date: '',
      coverImage: '',
      imagesList: [],
      active: true,
    }
    setGalleries([newG, ...galleries])
    setEditingId(newG.id)
  }

  const update = (id: string, field: keyof GalleryEventForm, value: string | boolean | string[]) => {
    setGalleries(galleries.map((g) => (g.id === id ? { ...g, [field]: value } : g)))
  }

  const removeGallery = (id: string) => {
    if (confirm('Delete this gallery event?')) {
      const updated = galleries.filter((g) => g.id !== id)
      setGalleries(updated)
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
          <h1 className="text-2xl font-bold text-spe-navy">Gallery Management</h1>
          <p className="text-spe-gray-600 mt-1">Manage gallery events and their photos.</p>
        </div>
        <button onClick={addGallery} className="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Gallery
        </button>
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

      {galleries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-spe-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-spe-gray-500 mb-2">No gallery events yet.</p>
          <p className="text-spe-gray-400 text-sm">Click &quot;Add Gallery&quot; to add your first event gallery.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-spe-gray-100 overflow-hidden"
            >
              {editingId === gallery.id ? (
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={gallery.title}
                        onChange={(e) => update(gallery.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="Gallery event title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Slug (URL key)</label>
                      <input
                        type="text"
                        value={gallery.slug}
                        onChange={(e) => update(gallery.id, 'slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="e.g. techconnect6"
                      />
                      <p className="text-xs text-spe-gray-400 mt-1">Used in URL: /gallery/<strong>{gallery.slug || 'slug'}</strong></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={gallery.date}
                        onChange={(e) => update(gallery.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-spe-navy"
                        placeholder="e.g. 16 June 2025"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id={`active-${gallery.id}`}
                        checked={gallery.active}
                        onChange={(e) => update(gallery.id, 'active', e.target.checked)}
                        className="h-4 w-4 text-spe-navy border-spe-gray-300 rounded"
                      />
                      <label htmlFor={`active-${gallery.id}`} className="text-sm font-medium text-spe-gray-700">Active (visible on site)</label>
                    </div>
                  </div>
                  <ImageUploadField
                    label="Cover Image"
                    value={gallery.coverImage}
                    onChange={(path) => update(gallery.id, 'coverImage', path)}
                    placeholder="No cover image"
                  />
                  <MultiImageUploadField
                    label="Gallery Photos"
                    images={gallery.imagesList}
                    onChange={(paths) => update(gallery.id, 'imagesList', paths)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveAll()}
                      disabled={saving}
                      className="px-4 py-1.5 text-sm font-medium text-white bg-spe-navy border border-spe-navy rounded-lg hover:bg-spe-blue-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => removeGallery(gallery.id)}
                      className="px-4 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {gallery.coverImage ? (
                      <img src={gallery.coverImage} alt={gallery.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-spe-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-spe-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-spe-navy line-clamp-1">{gallery.title || 'Untitled Gallery'}</h3>
                      <div className="flex items-center gap-3 text-xs text-spe-gray-500 mt-0.5">
                        <span>{gallery.date || 'No date'}</span>
                        <span>| {gallery.imagesList.filter(Boolean).length} photo(s)</span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${gallery.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {gallery.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingId(gallery.id)}
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
