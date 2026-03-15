'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CelebrationSticker from './CelebrationSticker'

const heroStats = [
  { value: '156,000+', label: 'Members Worldwide' },
  { value: '154', label: 'Countries' },
  { value: '72,000+', label: 'Student Members' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden">
      {/* Branded Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001233]/95 via-spe-navy/85 to-[#1a3fb8]/70 z-10" />
        <motion.div
          className="absolute inset-0 z-10"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle at 70% 20%, rgba(56,189,248,0.18), transparent 45%)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_70%_75%,rgba(59,130,246,0.2),transparent_45%)]" />
        <motion.div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url("/images/spe-logo.jpg")' }}
          animate={{ opacity: [0.12, 0.2, 0.12], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-12 right-8 w-44 h-44 rounded-full bg-center bg-cover border border-sky-300/20"
          style={{ backgroundImage: 'url("/images/spe-logo.jpg")' }}
          animate={{ opacity: [0.15, 0.25, 0.15], y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-36 h-36 rounded-full bg-center bg-cover border border-sky-300/20"
          style={{ backgroundImage: 'url("/images/spe-logo.jpg")' }}
          animate={{ opacity: [0.1, 0.2, 0.1], y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020617]/75 via-transparent to-transparent" />
      </div>

      {/* Animated decorative blobs */}
      <div className="absolute inset-0 z-[5] overflow-hidden">
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-400/6 rounded-full blur-[120px] animate-blob-delay" />
        <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-spe-accent/5 rounded-full blur-[80px] animate-float-slow" />
        <motion.div
          className="absolute -top-20 -left-1/3 w-[160%] h-32 rotate-[10deg]"
          animate={{ x: ['-10%', '10%', '-10%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.10) 40%, rgba(56,189,248,0.16) 50%, rgba(125,211,252,0.10) 60%, transparent 100%)' }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <CelebrationSticker />

      {/* Content */}
      <div className="container-custom relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-4 md:px-6"
        >
          <div className="max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 mb-8 border border-white/20"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Society of Petroleum Engineers - Mumbai Section
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-white leading-[1.1] tracking-tight"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              Advancing the Oil &amp; Gas{' '}
              <span className="relative inline-block">
                Industry
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M2 8C30 3 70 2 100 5C130 8 170 4 198 7"
                    stroke="url(#hero-underline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="hero-underline" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#60A5FA" />
                      <stop offset="1" stopColor="#3B82F6" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              In India
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl mb-12 text-blue-100/85 leading-relaxed max-w-2xl mx-auto"
            >
              Join the Society of Petroleum Engineers Mumbai Section to connect, learn, and grow with industry professionals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://www.spe.org/en/join/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-9 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ['0 0 0 0 rgba(59,130,246,0)', '0 0 0 8px rgba(59,130,246,0.18)', '0 0 0 0 rgba(59,130,246,0)'] }}
                transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                  Become a Member
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </motion.a>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/events" className="group relative px-9 py-4 rounded-2xl font-bold text-white border border-white/25 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 inline-flex">
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  Upcoming Events
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-6 flex items-center justify-center gap-2 text-xs text-blue-100/70"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
              Trusted by professionals and students across India
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="stat-card group border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <span className="block text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-blue-200/60 text-xs font-semibold uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-blue-200/40 text-2xs uppercase tracking-[0.3em] font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop' }}
            className="w-1 h-1 bg-white/60 rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </section>
  )
} 