'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Sample sponsor data - replace with actual sponsors
const sponsors = [
  { name: 'ONGC', logo: '/images/placeholder-logo.png' },
  { name: 'Reliance Industries', logo: '/images/placeholder-logo.png' },
  { name: 'Cairn India', logo: '/images/placeholder-logo.png' },
  { name: 'Schlumberger', logo: '/images/placeholder-logo.png' },
  { name: 'Baker Hughes', logo: '/images/placeholder-logo.png' },
  { name: 'Halliburton', logo: '/images/placeholder-logo.png' },
]

export default function FeaturedSponsors() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-spe-navy mb-4">Our Partners & Sponsors</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We are proud to partner with leading companies in the oil and gas industry who support our mission 
            to advance technical knowledge and professional excellence.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center h-32 hover:shadow-lg transition-shadow group"
            >
              <div className="relative w-full h-full opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a 
            href="/contact" 
            className="inline-block text-spe-blue font-medium hover:text-spe-navy transition-colors duration-300"
          >
            Interested in becoming a sponsor? Contact us →
          </a>
        </motion.div>
      </div>
    </section>
  )
} 