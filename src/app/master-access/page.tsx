'use client'

import { Suspense, useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        const session = await getSession()
        const role = (session?.user as { role?: string })?.role
        const destination = callbackUrl !== '/' ? callbackUrl : role === 'admin' ? '/admin' : '/'
        router.push(destination)
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spe-blue-50 to-spe-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-spe-navy to-spe-blue-500 px-8 py-6 text-center">
            <Link href="/" className="inline-block mb-3">
              <div className="relative h-16 w-48 mx-auto bg-white rounded-lg p-1">
                <Image
                  src="/images/spe-logo.jpg"
                  alt="SPE Mumbai Section"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <h1 className="text-xl font-bold text-white">Portal Access</h1>
            <p className="text-blue-200 text-sm mt-1">
              Manage SPE Mumbai Section
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 
                  focus:ring-2 focus:ring-spe-navy focus:border-spe-navy transition-colors
                  placeholder:text-spe-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 
                  focus:ring-2 focus:ring-spe-navy focus:border-spe-navy transition-colors
                  placeholder:text-spe-gray-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-center flex items-center justify-center gap-2 
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-sm text-spe-navy hover:text-spe-blue-600 font-medium">
                &larr; Back to Home
              </Link>
            </div>
          </form>

          {/* Info Section */}
          <div className="bg-spe-gray-50 px-8 py-4 border-t border-spe-gray-200">
            <p className="text-xs text-spe-gray-600 text-center font-medium">
              Admin portal for managing website content and events
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function MasterAccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spe-blue-50 to-spe-blue-100">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-spe-navy border-t-transparent"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
