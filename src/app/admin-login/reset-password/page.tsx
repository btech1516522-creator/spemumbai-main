'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, action: 'verify' }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Verification successful. Please enter your new password.' })
        setStep('reset')
      } else {
        setMessage({ type: 'error', text: data.error || 'Email not found or verification failed' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!formData.newPassword.trim()) {
      setMessage({ type: 'error', text: 'Please enter a new password' })
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
          action: 'reset',
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Password reset successfully!' })
        setTimeout(() => {
          router.push('/admin-login')
        }, 2000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reset password' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
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
            <h1 className="text-xl font-bold text-white">Reset Password</h1>
            <p className="text-blue-200 text-sm mt-1">
              {step === 'email' ? 'Enter your admin email' : 'Create a new password'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={step === 'email' ? handleEmailSubmit : handleResetSubmit} className="p-8 space-y-5">
            {message.text && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 flex-shrink-0 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor">
                  {message.type === 'success' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  )}
                </svg>
                {message.text}
              </motion.div>
            )}

            {step === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
                  Admin Email Address
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
                  placeholder="admin@spemumbai.org"
                />
                <p className="text-xs text-spe-gray-500 mt-2">Enter the email address associated with your admin account</p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 
                      focus:ring-2 focus:ring-spe-navy focus:border-spe-navy transition-colors
                      placeholder:text-spe-gray-400"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-spe-gray-500 mt-2">At least 6 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-spe-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 
                      focus:ring-2 focus:ring-spe-navy focus:border-spe-navy transition-colors
                      placeholder:text-spe-gray-400"
                    placeholder="Confirm new password"
                  />
                </div>
              </>
            )}

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
                  Processing...
                </>
              ) : step === 'email' ? (
                'Continue'
              ) : (
                'Reset Password'
              )}
            </button>

            <div className="text-center pt-2">
              <Link href="/admin-login" className="text-sm text-spe-navy hover:text-spe-blue-600 font-medium">
                &larr; Back to Login
              </Link>
            </div>
          </form>

          {/* Info Section */}
          <div className="bg-spe-gray-50 px-8 py-4 border-t border-spe-gray-200">
            <p className="text-xs text-spe-gray-600 text-center font-medium">
              {step === 'email' ? 'Verify your email to reset your password' : 'Enter your new password below'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
