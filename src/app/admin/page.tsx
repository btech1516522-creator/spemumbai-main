'use client'

import { useEffect, useState } from 'react'
import { useRole } from '@/hooks/useRole'
import { motion } from 'framer-motion'

interface ContentData {
  heroTitle?: string
  heroSubtitle?: string
  announcements?: Array<{
    id: string
    title: string
    content: string
    date: string
    active: boolean
  }>
  events?: Array<{
    id: string
    title: string
    date: string
    location: string
    description: string
    active: boolean
  }>
  lastUpdated?: string
  updatedBy?: string
}

export default function AdminOverview() {
  const { user } = useRole()
  const [content, setContent] = useState<ContentData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const stats = [
    {
      label: 'Active Events',
      value: content.events?.filter((e) => e.active).length || 0,
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Announcements',
      value: content.announcements?.filter((a) => a.active).length || 0,
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Your Role',
      value: 'Admin',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'Last Updated',
      value: content.lastUpdated
        ? new Date(content.lastUpdated).toLocaleDateString()
        : 'Never',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ]

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-spe-navy">
          Welcome back, {user?.name || 'Admin'}!
        </h1>
        <p className="text-spe-gray-600 mt-1">
          Here&apos;s an overview of your SPE Mumbai Section management panel.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm animate-pulse">
              <div className="h-16 bg-spe-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-spe-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-spe-gray-500 font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-spe-navy">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-spe-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Edit Content', href: '/admin/content', desc: 'Update hero section & announcements' },
            { label: 'Manage Events', href: '/admin/events', desc: 'Add or edit events' },
            { label: 'Update Leadership', href: '/admin/leadership', desc: 'Modify team members' },
            { label: 'Manage Reports', href: '/admin/reports', desc: 'Upload or edit reports' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="block p-4 rounded-lg border border-spe-gray-200 hover:border-spe-navy hover:shadow-md transition-all"
            >
              <p className="font-semibold text-spe-navy text-sm">{action.label}</p>
              <p className="text-xs text-spe-gray-500 mt-1">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Admin Permissions */}
      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6">
        <h2 className="text-lg font-bold text-spe-navy mb-4">Admin Permissions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-spe-gray-200">
                <th className="text-left py-3 px-4 text-spe-gray-600 font-semibold">Permission</th>
                <th className="text-center py-3 px-4 text-spe-gray-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-spe-gray-100">
              {[
                'View all pages',
                'Access Admin Panel',
                'Edit content & announcements',
                'Manage events',
                'Update leadership info',
                'Manage reports',
              ].map((perm) => (
                <tr key={perm}>
                  <td className="py-2.5 px-4 text-spe-gray-700">{perm}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="text-green-500 font-bold">&#10003;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
