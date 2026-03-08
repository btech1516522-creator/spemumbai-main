'use client'

import { useRole } from '@/hooks/useRole'
import type { UserRole } from '@/lib/auth'

interface AdminOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requiredRole?: UserRole
}

/**
 * Wrapper component that only renders children if the user is an admin.
 * Non-admin users see nothing (or the fallback).
 */
export function AdminOnly({ children, fallback = null, requiredRole = 'admin' }: AdminOnlyProps) {
  const { hasRole, isLoading } = useRole()

  if (isLoading) return null
  if (!hasRole(requiredRole)) return <>{fallback}</>

  return <>{children}</>
}

/**
 * A floating edit button that only appears for admins.
 */
export function AdminEditButton({
  onClick,
  label = 'Edit',
  className = '',
}: {
  onClick: () => void
  label?: string
  className?: string
}) {
  const { isAdmin, isLoading } = useRole()

  if (isLoading || !isAdmin) return null

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md 
        bg-spe-navy text-white hover:bg-spe-blue-600 transition-colors shadow-sm
        focus:outline-none focus:ring-2 focus:ring-spe-navy focus:ring-offset-1 ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
      {label}
    </button>
  )
}

/**
 * A badge showing the user's current role.
 */
export function RoleBadge() {
  const { role, isAuthenticated, isLoading } = useRole()

  if (isLoading || !isAuthenticated) return null

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-100 text-red-800 border-red-200">
      Admin
    </span>
  )
}
