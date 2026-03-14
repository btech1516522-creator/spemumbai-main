'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface AuditEntry {
  id: string
  tableName: string
  recordId: string | null
  action: string
  oldData: string | null
  changedBy: string
  changedAt: string
  restored?: boolean
  restoredAt?: string | null
  restoredBy?: string | null
}

const TABLE_LABELS: Record<string, string> = {
  Event: 'Events',
  Announcement: 'Announcements',
  LeadershipMember: 'Leadership',
  Report: 'Reports',
  GalleryEvent: 'Gallery',
  GalleryImage: 'Gallery Images',
}

function parseObject(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null
    return value
  } catch {
    return null
  }
}

function getRecordTitle(log: AuditEntry): string {
  const item = parseObject(log.oldData)
  if (!item) return 'Deleted item'

  const title = item.title
  const name = item.name
  const slug = item.slug
  const key = item.key

  if (typeof title === 'string' && title.trim()) return title
  if (typeof name === 'string' && name.trim()) return name
  if (typeof slug === 'string' && slug.trim()) return slug
  if (typeof key === 'string' && key.trim()) return key

  return 'Deleted item'
}

function getSummary(log: AuditEntry): string {
  const item = parseObject(log.oldData)
  if (!item) return 'No preview available.'

  const table = log.tableName

  if (table === 'Event') {
    return `${String(item.date ?? 'No date')} · ${String(item.location ?? 'No location')}`
  }

  if (table === 'Report') {
    return `${String(item.pdfUrl ?? 'No PDF')} · ${String(item.description ?? '').slice(0, 80)}`
  }

  if (table === 'LeadershipMember') {
    return `${String(item.position ?? 'No position')} · ${String(item.organization ?? 'No organization')}`
  }

  if (table === 'Announcement') {
    return `${String(item.date ?? 'No date')} · ${String(item.content ?? '').slice(0, 80)}`
  }

  if (table === 'GalleryEvent') {
    return `${String(item.date ?? 'No date')} · ${String(item.slug ?? 'No slug')}`
  }

  if (table === 'GalleryImage') {
    return `${String(item.galleryTitle ?? 'Gallery')} · Deleted image`
  }

  return 'Deleted record snapshot available.'
}

function hasDirectFile(log: AuditEntry): boolean {
  const item = parseObject(log.oldData)
  if (!item) return false

  return (
    typeof item.fileUrl === 'string' ||
    typeof item.pdfUrl === 'string' ||
    typeof item.image === 'string' ||
    typeof item.coverImage === 'string'
  )
}

function getDirectFileUrl(log: AuditEntry): string | null {
  const item = parseObject(log.oldData)
  if (!item) return null

  const fileUrl =
    typeof item.fileUrl === 'string'
      ? item.fileUrl
      : typeof item.pdfUrl === 'string'
        ? item.pdfUrl
        : typeof item.image === 'string'
          ? item.image
          : typeof item.coverImage === 'string'
            ? item.coverImage
            : null

  return fileUrl || null
}

function isImageFileUrl(url: string | null): boolean {
  if (!url) return false
  const clean = url.toLowerCase().split('?')[0]
  return clean.endsWith('.jpg') || clean.endsWith('.jpeg') || clean.endsWith('.png') || clean.endsWith('.webp') || clean.endsWith('.gif') || clean.endsWith('.avif')
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function downloadSnapshot(log: AuditEntry) {
  if (!log.oldData) return

  const payload = {
    table: log.tableName,
    action: log.action,
    deletedBy: log.changedBy,
    deletedAt: log.changedAt,
    data: JSON.parse(log.oldData),
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const safeName = getRecordTitle(log).replace(/[^a-z0-9_-]+/gi, '-').slice(0, 50)

  anchor.href = url
  anchor.download = `${log.tableName}-${safeName || 'deleted-item'}-${new Date(log.changedAt).getTime()}.json`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export default function AdminHistoryPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [restoreFilter, setRestoreFilter] = useState<'all' | 'restorable' | 'restored'>('all')
  const [restoring, setRestoring] = useState<string | null>(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  const tables = useMemo(() => ['all', 'Event', 'Announcement', 'LeadershipMember', 'Report', 'GalleryEvent', 'GalleryImage'], [])

  const fetchLogs = (tableFilter: string) => {
    setLoading(true)

    const url =
      tableFilter === 'all'
        ? '/api/audit?action=DELETE'
        : `/api/audit?action=DELETE&table=${tableFilter}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLogs(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchLogs(filter)
  }, [filter])

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      !term ||
      [getRecordTitle(log), getSummary(log), log.changedBy, log.tableName]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))

    const matchesRestore =
      restoreFilter === 'all' ||
      (restoreFilter === 'restored' && !!log.restored) ||
      (restoreFilter === 'restorable' && !log.restored)

    return matchesSearch && matchesRestore
  })

  const handleRestore = async (log: AuditEntry) => {
    if (!log.oldData) return

    if (!confirm(`Restore deleted item "${getRecordTitle(log)}"?`)) return

    setRestoring(log.id)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logId: log.id }),
      })

      const json = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: json.error || 'Restore failed' })
      } else {
        setMessage({ type: 'success', text: 'Deleted item restored successfully.' })
        fetchLogs(filter)
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error while restoring.' })
    } finally {
      setRestoring(null)
      setTimeout(() => setMessage({ type: '', text: '' }), 4000)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-spe-navy">Deleted Data History</h1>
        <p className="text-sm text-gray-500 mt-1">
          Only deleted records are shown here. You can restore any item or download its snapshot.
        </p>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="flex flex-wrap gap-2">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => setFilter(table)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              filter === table
                ? 'bg-spe-navy text-white border-spe-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-spe-navy hover:text-spe-navy'
            }`}
          >
            {table === 'all' ? 'All Deleted' : TABLE_LABELS[table] ?? table}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item title, summary, deleted by, or table"
            className="w-full md:max-w-md rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
          />
          <select
            value={restoreFilter}
            onChange={(e) => setRestoreFilter(e.target.value as 'all' | 'restorable' | 'restored')}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-spe-navy"
          >
            <option value="all">All history states</option>
            <option value="restorable">Not yet restored</option>
            <option value="restored">Restored only</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">Showing {filteredLogs.length} of {logs.length} deleted records</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-spe-navy border-t-transparent" />
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-500">
          No deleted records match the current filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLogs.map((log, index) => {
            const fileUrl = getDirectFileUrl(log)
            const showImagePreview = isImageFileUrl(fileUrl)

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {showImagePreview && fileUrl && (
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                        <img
                          src={fileUrl}
                          alt="Deleted file preview"
                          className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                        />
                      </a>
                    )}

                    <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {TABLE_LABELS[log.tableName] ?? log.tableName}
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 mt-1">{getRecordTitle(log)}</h3>
                  <p className="text-sm text-gray-500 mt-1">{getSummary(log)}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Deleted on {formatDate(log.changedAt)} by {log.changedBy}
                  </p>
                  {log.restored && log.restoredAt && (
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      Restored on {formatDate(log.restoredAt)} by {log.restoredBy || 'admin'}
                    </p>
                  )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                  {hasDirectFile(log) ? (
                    <a
                      href={`/api/audit/download?logId=${encodeURIComponent(log.id)}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Download File
                    </a>
                  ) : (
                    <button
                      onClick={() => downloadSnapshot(log)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Download JSON
                    </button>
                  )}
                  {log.restored ? (
                    <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-100 text-green-700 border border-green-200">
                      Restored
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRestore(log)}
                      disabled={restoring === log.id}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {restoring === log.id ? 'Restoring...' : 'Restore'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      )}
    </div>
  )
}
