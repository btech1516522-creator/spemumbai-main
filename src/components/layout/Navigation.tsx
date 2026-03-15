'use client'

import { useState, useEffect } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/88 backdrop-blur-2xl border-b border-white/50 shadow-[0_12px_40px_rgba(15,23,42,0.14)]'
          : 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_6px_30px_rgba(15,23,42,0.08)]'
      }`}
    >
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-spe-navy via-spe-blue-400 to-spe-accent opacity-80" />
      <motion.div
        className="absolute top-0 -left-1/4 w-1/3 h-full pointer-events-none"
        animate={{ x: ['-20%', '320%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
      />

      <div className="container-custom" style={{ perspective: 1200 }}>
        <div className="flex items-center h-20">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* Animated logo mark */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: 1, rotateX: 8, rotateY: -8 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex-shrink-0"
            >
              {/* Pulse ring behind logo */}
              <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-spe-blue-400/20 to-spe-accent/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-2 ring-spe-navy/10 group-hover:ring-spe-blue-400/40 transition-all duration-300 shadow-[0_6px_20px_rgba(30,64,175,0.2)]">
                <Image src="/images/spe-logo.jpg" alt="SPE Logo" fill className="object-cover" priority />
              </div>
            </motion.div>
            {/* Text branding */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col leading-tight"
            >
              <span className="text-base font-extrabold text-spe-navy tracking-tight group-hover:text-spe-blue-500 transition-colors duration-300">SPE Mumbai</span>
              <span className="text-[10px] font-semibold text-spe-gray-400 tracking-widest uppercase">Section</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-1 flex-1 bg-white/45 backdrop-blur-md border border-white/60 rounded-2xl py-2 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_6px_20px_rgba(15,23,42,0.06)]">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div key={item.name} whileHover={{ y: -2, scale: 1.02, rotateX: 4 }} transition={{ type: 'spring', stiffness: 350, damping: 25 }}>
                  <Link href={item.href}
                    className="relative px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide font-secondary transition-all duration-200 group inline-flex">
                    {isActive && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 bg-gradient-to-b from-white to-spe-blue-50 rounded-lg shadow-[0_6px_14px_rgba(37,99,235,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-spe-navy' : 'text-spe-gray-500 group-hover:text-spe-navy'}`}>
                      {item.name}
                    </span>
                    {!isActive && (
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-spe-navy to-spe-blue-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                  </Link>
                </motion.div>
              )
            })}
            <motion.a
              href="/join"
              className="group/join relative btn-gradient ml-4 text-sm border border-white/30 shadow-[0_10px_24px_rgba(37,99,235,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]"
              whileHover={{ scale: 1.05, y: -2, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 10px 24px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.3)',
                  '0 14px 30px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.45)',
                  '0 10px 24px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.3)',
                ],
              }}
              transition={{
                boxShadow: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover/join:left-[130%] transition-all duration-700 ease-out" />
              </span>
              <span className="relative z-10 flex items-center gap-1.5">
                Join Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover/join:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-md border border-white/60 text-spe-gray-600 hover:text-spe-navy hover:bg-spe-blue-50 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <XMarkIcon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Bars3Icon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-xl border-t border-spe-gray-100">
            <div className="container-custom py-4 space-y-1">
              {navigation.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link href={item.href}
                      className={`flex items-center gap-3 py-3 px-4 text-base font-semibold rounded-xl transition-all duration-200 ${
                        isActive ? 'text-spe-navy bg-spe-blue-50' : 'text-spe-gray-600 hover:text-spe-navy hover:bg-spe-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}>
                      {isActive && <span className="w-1.5 h-1.5 bg-spe-navy rounded-full" />}
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <a href="/join"
                  className="group/join relative btn-gradient block w-full text-center mt-4 text-sm overflow-hidden" onClick={() => setIsOpen(false)}>
                  <span className="absolute inset-0 overflow-hidden rounded-xl">
                    <span className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover/join:left-[130%] transition-all duration-700 ease-out" />
                  </span>
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    Join Now
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}