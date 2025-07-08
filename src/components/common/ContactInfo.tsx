'use client'

import { motion } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function ContactInfo({ className = '' }: { className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-white flex flex-col items-start ${className}`}
    >
      <h3 className="font-semibold text-lg mb-3 border-b border-white/30 pb-2 inline-block">
        SPE Mumbai Section
      </h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p>Mumbai, Maharashtra</p>
            <p>India</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <EnvelopeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <a 
            href="mailto:info@spemumbai.org" 
            className="hover:text-amber-300 transition-colors duration-200"
          >
            info@spemumbai.org
          </a>
        </div>
      </div>
    </motion.div>
  )
} 