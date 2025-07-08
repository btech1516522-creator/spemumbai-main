'use client'

import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function CelebrationSticker() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-[90px] right-4 lg:top-[140px] lg:right-12 xl:top-[210px] xl:right-40 z-20"
    >
      <div className="flex flex-col items-end gap-3">
        {/* Contact info card with white text */}
        {/*
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-spe-navy/80 to-spe-navy/95 p-4 rounded-lg shadow-lg backdrop-blur-sm text-white max-w-[200px] text-right"
        >
          <h4 className="font-semibold text-base border-b border-white/20 pb-1 mb-2 inline-block">
            SPE Mumbai Section
          </h4>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-end gap-1.5">
              <div className="text-xs text-right">
                <p>Mumbai, Maharashtra</p>
                <p>India</p>
              </div>
              <MapPinIcon className="h-4 w-4 flex-shrink-0 text-amber-300" />
            </div>
            
            <div className="flex items-center justify-end gap-1.5">
              <a 
                href="mailto:info@spemumbai.org" 
                className="text-xs hover:text-amber-300 transition-colors duration-200"
              >
                info@spemumbai.org
              </a>
              <EnvelopeIcon className="h-4 w-4 flex-shrink-0 text-amber-300" />
            </div>
          </div>
        </motion.div>
        */}
        {/* Celebration badge */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full shadow-xl overflow-hidden border-2 border-amber-300 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          {/* Background sparkle pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full" />
            <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full" />
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full" />
          </div>

          {/* Sparkle Icon */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-1 -right-1 text-amber-300 drop-shadow-md"
          >
            <SparklesIcon className="w-10 h-10" />
          </motion.div>

          {/* Circular decoration */}
          <div className="absolute inset-3 rounded-full border border-white/30" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-0 leading-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                35
              </div>
              <div className="text-sm md:text-base font-medium text-white/90 leading-tight tracking-wide">
                YEARS OF<br/>EXCELLENCE
              </div>
              <div className="mt-1 text-xs text-white/80 font-light">
                1989-2024
              </div>
            </motion.div>
          </div>

          {/* Pulsing ring effect */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute -inset-1 rounded-full border-2 border-amber-300/50"
          />
        </div>
      </div>
    </motion.div>
  )
}