'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PhotoIcon, ArrowTopRightOnSquareIcon, SparklesIcon } from '@heroicons/react/24/outline'

// Example event data
const galleryEvents = [
  {
    slug: 'techconnect6',
    title: '#TechConnect: AI: A Tool For Defense And A Weapon For Cyber Attack',
    date: '16 June 2025',
    cover: '/images/gallery5/photo2.jpeg',
  },
  {
    slug: 'techconnect4',
    title: '#TechConnect: On Hydraulic Fracturing',
    date: '13 May 2025',
    cover: '/images/gallery4/img1.jpg',
  },
  {
    slug: 'techconnect1', 
    title: 'Industry Academia Interaction ',
    date: '05 April 2025',
    cover: '/images/gallery1/img1.jpeg',
  },
  {
    slug: 'techconnect2',
    title: 'A Night of Insights & Celebrations!',
    date: '17 March 2025',
    cover: '/images/gallery2/img1.jpeg',
  },
  {
    slug: 'techconnect3',
    title: '#TechConnect: An Engaging & Impactful Session!',
    date: 'February 2025',
    cover: '/images/gallery3/img1.jpeg',
  },
  {
    slug: 'techconnect5',
    title: `#TechConnect: The Future of Energy and The Role of SPE in Shaping the Industry's Trajectory`,
    date: '30 April 2024',
    cover: '/images/student-chapters/ig1.jpg',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function Gallery() {
  return (
    <main className="min-h-screen flex flex-col bg-[#081428] text-white selection:bg-sky-500/30">
      <Navigation />

      <div className="flex-grow pt-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
          {/* Background Gradients & Grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3a] via-[#153c66] to-[#0a1d3a]" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

          {/* Glow Lights */}
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container-custom relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto flex flex-col items-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-300 border border-sky-400/30 rounded-full text-xs font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md">
                <PhotoIcon className="w-4 h-4" />
                Media Archive
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                Photo 
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text mt-2">
                  Gallery
                </span>
              </h1>

              <p className="text-lg md:text-xl text-sky-100/70 leading-relaxed font-light">
                Explore memorable moments, technical sessions, and networking events from the SPE Mumbai community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* GALLERY GRID */}
        <section className="py-20 relative bg-[#081428]">
          {/* Subtle separator line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

          <div className="container-custom mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {galleryEvents.map((event) => (
                <motion.div
                  key={event.slug}
                  variants={fadeUp}
                  className="group relative flex flex-col bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-sky-400/30 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_rgba(56,189,248,0.1)]"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14335a]">
                    {/* Skeleton loading gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent animate-pulse" />
                    
                    <Image
                      src={event.cover}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-transparent to-transparent opacity-80 z-10" />
                    
                    {/* Glassmorphic hover overlay */}
                    <div className="absolute inset-0 bg-sky-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
                        <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm z-30">
                      <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">{event.date}</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow relative z-30">
                    <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-sky-300 transition-colors leading-snug">
                      {event.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-white/[0.05]">
                      <Link
                        href={`/gallery/${event.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        View Album
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden bg-[#081428]">
          {/* Animated Glow Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 blur-[200px] rounded-full pointer-events-none"
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-cyan-400/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                }}
                animate={{ 
                  y: [0, -40, 0], 
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 4, 
                  repeat: Infinity,
                  delay: Math.random() * 2 
                }}
              />
            ))}
          </div>

          <div className="container-custom relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] border-t-white/[0.15] p-12 md:p-20 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-sky-200 border border-white/10 rounded-full text-xs tracking-[0.2em] uppercase mb-6">
                <SparklesIcon className="w-3 h-3" />
                Be Part of the Story
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Create 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300"> Memories </span>
                With Us
              </h2>

              <p className="text-sky-100/70 mb-10 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Join SPE Mumbai and be part of unforgettable events, workshops, and networking sessions that create lasting professional connections.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
                <motion.a
                  href="https://www.spe.org/en/join/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all"
                >
                  Join SPE Today
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>

                <motion.a
                  href="/events"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl font-medium text-lg border border-sky-400/30 text-sky-300 flex items-center gap-2 transition-all"
                >
                  Browse Events
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
      
      <Footer />
    </main>
  )
}