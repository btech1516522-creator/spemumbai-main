'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useRole } from '@/hooks/useRole'
import { RoleBadge } from '@/components/auth/RoleGuard'
import { motion, AnimatePresence } from 'framer-motion'

const adminNav = [
  { name: 'Overview', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Dashboard Graphs', href: '/admin/dashboard', icon: 'M3 3v18h18M18 17V9M13 17V5M8 17v-3' },
  { name: 'Content', href: '/admin/content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { name: 'Announcements', href: '/admin/announcements', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { name: 'Events', href: '/admin/events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Leadership', href: '/admin/leadership', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Students', href: '/admin/students', icon: 'M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.5S6.5 26.747 12 26.747s10-4.5 10-10.247S17.5 6.253 12 6.253zm0 0C17.5 6.253 22 10.753 22 16.5s-4.5 10.247-10 10.247S2 22.253 2 16.5 6.5 6.253 12 6.253z' },
  { name: 'Volunteering', href: '/admin/volunteering', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { name: 'Reports', href: '/admin/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Gallery', href: '/admin/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'History', href: '/admin/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAdmin, isLoading } = useRole()

  // Change this value to 'subtle', 'medium', or 'strong' to tune glass effect intensity.
  const glassMode = 'strong' as 'subtle' | 'medium' | 'strong'
  const glassShellClass =
    glassMode === 'subtle'
      ? 'admin-glass-subtle'
      : glassMode === 'medium'
        ? 'admin-glass-medium'
        : 'admin-glass-strong'
  const glassSidebarClass =
    glassMode === 'subtle'
      ? 'admin-glass-dark-subtle'
      : glassMode === 'medium'
        ? 'admin-glass-dark-medium'
        : 'admin-glass-dark-strong'
  const activeNavClass =
    glassMode === 'subtle'
      ? 'bg-white/70 text-spe-navy ring-1 ring-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]'
      : glassMode === 'medium'
        ? 'bg-white/75 text-spe-navy ring-1 ring-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_0_12px_rgba(59,130,246,0.15)]'
        : 'bg-white/82 text-spe-navy ring-1 ring-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_0_18px_rgba(59,130,246,0.18)]'

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spe-blue-50 via-white to-spe-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-spe-navy border-t-transparent"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Middleware handles redirect
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-spe-blue-50 via-white to-spe-gray-100 flex">
      <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-spe-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-spe-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-spe-blue-100/50 blur-3xl" />

      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-4 lg:left-4 lg:rounded-3xl z-20 ${glassSidebarClass}`}>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="px-5 mb-6">
            <Link href="/" className="text-spe-navy font-bold text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              SPE Admin
            </Link>
            <p className="text-spe-navy/70 text-xs mt-1">Mumbai Section Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5">
            {adminNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`admin-nav-pill flex items-center gap-3 ${
                    isActive
                      ? activeNavClass
                      : 'text-spe-navy/80 hover:text-spe-navy hover:bg-white/45'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="px-4 mt-auto">
            <div className="bg-white/55 rounded-2xl p-3 mb-3 border border-white/70">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-spe-gold flex items-center justify-center text-spe-navy font-bold text-sm">
                  {user?.name?.[0] || 'A'}
                </div>
                <div>
                  <p className="text-spe-navy text-sm font-medium">{user?.name}</p>
                  <p className="text-spe-navy/70 text-xs">{user?.email}</p>
                </div>
              </div>
              <RoleBadge />
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-spe-navy/85 hover:text-spe-navy bg-white/55 hover:bg-white/80 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 z-50 w-72 lg:hidden border-r border-white/25 ${glassSidebarClass}`}
          >
            <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-between px-4 mb-6">
                <Link href="/" className="text-spe-navy font-bold text-lg">SPE Admin</Link>
                <button onClick={() => setSidebarOpen(false)} className="text-spe-navy/70 hover:text-spe-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 px-3 space-y-1">
                {adminNav.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? activeNavClass
                          : 'text-spe-navy/80 hover:bg-white/45 hover:text-spe-navy'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="px-3 mt-auto">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-spe-navy/80 hover:text-spe-navy hover:bg-white/45 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-[19rem] flex-1 flex flex-col relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
          <div className={`${glassShellClass} rounded-2xl`}>
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-spe-gray-600 hover:text-spe-navy"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-spe-navy hover:text-spe-blue-600 font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </Link>
            </div>
          </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className={`${glassShellClass} rounded-3xl p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-8rem)]`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
