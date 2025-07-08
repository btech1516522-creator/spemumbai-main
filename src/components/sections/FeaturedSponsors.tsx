'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Sample sponsor data - replace with actual sponsors
const sponsors = [
  { name: 'ONGC', logo: '/images/ongc.jpeg' },
  { name: 'Reliance Industries', logo: '/images/reliance.jpeg' },
  { name: 'Cairn India', logo: '/images/cairn_india.jpeg' },
  { name: 'Schlumberger', logo: '/images/schlumberger.jpeg' },
  { name: 'Baker Hughes', logo: '/images/baker_hughes.jpeg' },
  { name: 'Halliburton', logo: '/images/halliburton.jpeg' },
]

export default function FeaturedSponsors() {
  return (
    <section className="py-16 bg-[#f4f8fb]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold font-secondary text-gradient bg-gradient-to-r from-spe-navy via-spe-blue to-spe-navy bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Our Partners & Sponsors
          </h2>
          <p className="text-base md:text-lg font-medium font-primary text-spe-gray-700 max-w-3xl mx-auto mb-2">
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
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-36 hover:shadow-lg transition-shadow group"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} Logo`}
                    fill
                    className="object-contain"
                    sizes="144px"
                  />
                </div>
              </div>
              <span className="mt-4 text-center w-full text-sm md:text-base font-semibold font-secondary text-spe-navy group-hover:text-spe-blue transition-colors duration-300">
                {sponsor.name}
              </span>
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
            className="inline-block text-base md:text-lg font-bold font-secondary underline underline-offset-4 decoration-2 text-spe-navy"
          >
            Interested in becoming a sponsor? Contact us →
          </a>
        </motion.div>
      </div>
    </section>
  )
}