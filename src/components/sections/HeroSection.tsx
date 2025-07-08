'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CelebrationSticker from './CelebrationSticker'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-spe-navy/80 to-spe-navy/70 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
          style={{
            backgroundImage: 'url("/images/hero-bg.jpeg")',
          }}
        />
      </div>

      {/* 35 Years Celebration Sticker */}
      <CelebrationSticker />

      {/* Content */}
      <div className="container-custom relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative px-4 md:px-6"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-spe-gray-100 drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Advancing the Oil and Gas Industry In India
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-spe-gray-200">
              Join the Society of Petroleum Engineers Mumbai Section to connect, learn, and grow with industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.spe.org/en/join/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                Become a Member
              </a>
              <Link href="/events" className="btn-secondary">
                Upcoming Events
              </Link>
            </div>
          </div>

          {/* SPE Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 transform transition-transform hover:scale-105">
              <span className="block text-4xl font-bold text-white mb-2">156,000+</span>
              <span className="text-spe-gray-200">Members Worldwide</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 transform transition-transform hover:scale-105">
              <span className="block text-4xl font-bold text-white mb-2">154</span>
              <span className="text-spe-gray-200">Countries</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 transform transition-transform hover:scale-105">
              <span className="block text-4xl font-bold text-white mb-2">72,000+</span>
              <span className="text-spe-gray-200">Student Members</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-2">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </section>
  )
} 