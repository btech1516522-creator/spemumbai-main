'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import FeaturedEvents from '@/components/sections/FeaturedEvents'
import { motion } from 'framer-motion'

// Framer Motion Variants for staggered hero text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Events() {
  return (
    <main className="flex flex-col min-h-screen bg-[#081428] text-white selection:bg-sky-500/30">
      
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-40 pb-32 lg:pt-48 lg:pb-40">
        
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3a] via-[#153c66] to-[#0a1d3a]" />
        
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf810_1px,transparent_1px),linear-gradient(to_bottom,#38bdf810_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Glow Lights */}
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10 mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-300 border border-sky-400/30 rounded-full text-xs font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Events & Programs
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
              Discover <br className="hidden md:block" />
              <span className="inline-block bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-500 text-transparent bg-clip-text pb-2">
                What’s Next
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-sky-100/70 leading-relaxed max-w-2xl font-light">
              Explore upcoming conferences, workshops, and networking sessions designed
              to fuel innovation and connect energy professionals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="py-24 relative z-20 bg-[#081428]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        
        <div className="container-custom mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-sky-400 mb-4">
              Upcoming
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Featured Programs
            </h2>
            <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
          </div>

          <FeaturedEvents showAll={true} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 overflow-hidden bg-[#081428]">
        
        {/* Animated Glow Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-sky-500/20 blur-[180px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none"
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-sky-400/40"
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="
              max-w-4xl mx-auto text-center
              backdrop-blur-xl
              bg-white/[0.03]
              border border-white/[0.08]
              border-t-white/[0.15]
              p-12 md:p-20 rounded-[2.5rem]
              shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_80px_rgba(56,189,248,0.1)]
            "
          >
            <span className="text-sky-300 font-medium text-xs tracking-[0.3em] uppercase">
              Join The Community
            </span>

            <h2 className="text-4xl md:text-6xl font-extrabold mt-6 mb-8 tracking-tight">
              Never Miss an
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text mt-2">
                Event Again
              </span>
            </h2>

            <p className="text-sky-100/70 mb-12 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Join SPE Mumbai to get priority access to conferences, workshops,
              and exclusive networking sessions with global energy professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <motion.a
                href="https://www.spe.org/en/join/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="
                  group flex items-center gap-3
                  px-8 py-4
                  rounded-2xl
                  font-semibold text-lg
                  bg-gradient-to-r from-sky-500 to-cyan-400
                  text-white
                  shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40
                  transition-all duration-300
                "
              >
                Join SPE Today
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="
                  px-8 py-4
                  rounded-2xl
                  font-medium text-lg
                  border border-sky-400/30
                  text-sky-300
                  transition-all duration-300
                "
              >
                Contact Us
              </motion.a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-sky-200/50 text-sm">
              <svg className="w-4 h-4 text-sky-400/70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free membership for students</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Secure SPE registration</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}