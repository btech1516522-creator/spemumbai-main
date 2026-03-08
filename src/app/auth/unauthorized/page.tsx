'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spe-blue-50 to-spe-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md mx-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-spe-navy mb-3">Access Denied</h1>
          <p className="text-spe-gray-600 mb-6">
            You don&apos;t have permission to access this page. Admin privileges are required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary text-center">
              Go Home
            </Link>
            <Link href="/auth/login" className="btn-secondary text-center">
              Sign In as Admin
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
