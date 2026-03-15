'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

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
  const pathname = usePathname()

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}