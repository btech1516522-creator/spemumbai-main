'use client'

import { useSession } from 'next-auth/react'
import type { UserRole } from '@/lib/auth'

/**
 * Hook to check if the current user has a specific role
 */
export function useRole() {
  const { data: session, status } = useSession()

  const isAdmin = session?.user?.role === 'admin'
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  const hasRole = (role: UserRole) => session?.user?.role === role

  return {
    session,
    status,
    isAdmin,
    isAuthenticated,
    isLoading,
    hasRole,
    role: session?.user?.role,
    user: session?.user,
  }
}
