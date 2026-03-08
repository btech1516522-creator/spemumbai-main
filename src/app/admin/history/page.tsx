'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AuditEntry {
  id: string
  tableName: string
  action: string
  oldData: string | null
  newData: string | null
  changedBy: string
  changedAt: string
}

const TABLE_LABELS: Record<string, string> = {
  Event: 'Events',
  Announcement: 'Announcements',
  LeadershipMember: 'Leadership',
  Report: 'Reports',
  SiteContent: 'Site Content',
}

const TABLE_COLORS: Record<string, string> = {
  Event: 'bg-blue-100 text-blue-700',
  Announcement: 'bg-green-100 text-green-700',
  LeadershipMember: 'bg-purple-100 text-purple-700',
  Report: 'bg-orange-100 text-orange-700',
  SiteContent: 'bg-gray-100 text-gray-700',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function parseData(raw: string | null): unknown {
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return raw }
}

function DataPreview({ raw, label }: { raw: string | null; label: string }) {
  const [open, setOpen] = useState(false)
  const data = parseData(raw)
  if (!data) return <span className="text-gray-400 text-sm italic">—</span>

  // Quick summary line
  let summary = ''
  if (Array.isArray(data)) {
    summary = `${(data as unknown[]).length} item(s)`
  } else if (typeof data === 'object' && data !== null) {
    const d = data as Record<string, unknown>
    summary = d.title as string || d.name as string || d.key as string || JSON.stringify(data).slice(0, 60)
  } else {
    summary = String(data).slice(0, 60)
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-spe-navy underline underline-offset-2 hover:text-spe-gold transition-colors"
      >
        {label}: {summary} {open ? '▲' : '▼'}
      </button>
      {open && (
        <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-700 overflow-auto max-h-64 border border-gray-200 whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default function AdminHistoryPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const url = filter === 'all' ? '/api/audit' : `/api/audit?table=${filter}`
    setLoading(true)
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setLogs(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filter])

  const tables = ['all', 'Event', 'Announcement', 'LeadershipMember', 'Report', 'SiteContent']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-spe-navy">Change History</h1>
        <p className="text-gray-500 text-sm mt-1">
          Every admin update is recorded here. Click any row to see what was changed.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {tables.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              filter === t
                ? 'bg-spe-navy text-white border-spe-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-spe-navy hover:text-spe-navy'
            }`}
          >
            {t === 'all' ? 'All Changes' : TABLE_LABELS[t] ?? t}
          </button>
        ))}
      </div>

      {/* Logs table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-spe-navy border-t-transparent" />
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No changes recorded yet. Start editing content to see history here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TABLE_COLORS[log.tableName] ?? 'bg-gray-100 text-gray-600'}`}>
                    {TABLE_LABELS[log.tableName] ?? log.tableName}
                  </span>
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-2.5 py-0.5 rounded-full font-medium border border-yellow-100">
                    {log.action}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{formatDate(log.changedAt)}</p>
                  <p className="text-xs text-gray-400">{log.changedBy}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-xs font-semibold text-red-500 mb-1.5 uppercase tracking-wide">Previous Data</p>
                  <DataPreview raw={log.oldData} label="View" />
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-xs font-semibold text-green-600 mb-1.5 uppercase tracking-wide">New Data</p>
                  <DataPreview raw={log.newData} label="View" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
