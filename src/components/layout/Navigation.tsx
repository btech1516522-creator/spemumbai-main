'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Events', href: '/events' },
  { name: 'Students', href: '/students' },
  { name: 'Volunteering', href: '/volunteering' },
  { name: 'Reports', href: '/reports' },
  { name: 'Gallery', href: '/gallery' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)
  const adminMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isAdmin = session?.user?.role === 'admin'
  const isAuthenticated = status === 'authenticated'

  // Close admin dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setAdminMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="fixed w-full z-50 bg-[#eaf2fb] shadow-lg transition-all duration-300">
      <div className="container-custom px-0">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center pl-0">
            <div className="relative h-20 w-56">
              <Image 
                src="/images/spe-logo.jpg" 
                alt="SPE Mumbai Section Logo" 
                fill
                sizes="224px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-semibold tracking-wide font-secondary transition-colors duration-200 relative group ${
                  pathname === item.href
                    ? 'text-spe-navy'
                    : 'text-spe-gray-800 hover:text-spe-navy'
                }`}
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-spe-navy transition-all duration-300 group-hover:w-full group-hover:h-0.5"></span>
              </Link>
            ))}
            <a
              href="https://www.spe.org/en/join/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary font-secondary font-semibold tracking-wide ml-2 shadow-sm hover:scale-105 transition-transform"
            >
              Join Now
            </a>

            {/* Three-bar admin menu */}
            <div className="relative ml-2" ref={adminMenuRef}>
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-spe-gray-600 hover:text-spe-navy hover:bg-spe-gray-100 transition-colors focus:outline-none"
                aria-label="Admin menu"
              >
                {adminMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>

              <AnimatePresence>
                {adminMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-spe-gray-200 overflow-hidden z-50"
                  >
                    {isAuthenticated && isAdmin ? (
                      <>
                        <div className="px-4 py-3 bg-spe-gray-50 border-b border-spe-gray-200">
                          <p className="text-xs font-semibold text-spe-gray-500">Signed in as</p>
                          <p className="text-sm font-bold text-spe-navy truncate">{session?.user?.name}</p>
                        </div>
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-spe-navy hover:bg-spe-blue-50 transition-colors"
                          onClick={() => setAdminMenuOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Admin Panel
                        </Link>
                        <button
                          onClick={() => { setAdminMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                          className="flex items-center gap-2 w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-t border-spe-gray-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/auth/login"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-spe-navy hover:bg-spe-blue-50 transition-colors"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Admin Login
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-spe-gray-600 hover:text-spe-navy focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#eaf2fb] shadow-lg"
          >
            <div className="container-custom py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 text-base font-semibold tracking-wide font-secondary rounded transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-spe-navy bg-spe-gray-100'
                      : 'text-spe-gray-600 hover:text-spe-navy hover:bg-spe-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://www.spe.org/en/join/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary block w-full text-center mt-4 font-secondary font-semibold tracking-wide shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Join Now
              </a>

              {/* Mobile Admin Controls */}
              <div className="mt-3 pt-3 border-t border-spe-gray-200">
                {isAuthenticated && isAdmin ? (
                  <div className="space-y-2">
                    <Link
                      href="/admin"
                      className="block py-2 px-3 text-sm font-semibold text-spe-navy bg-spe-blue-50 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                    <button
                      onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }) }}
                      className="block w-full text-left py-2 px-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="block w-full text-center py-2 text-sm font-semibold text-spe-navy border border-spe-navy rounded-lg hover:bg-spe-navy hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}