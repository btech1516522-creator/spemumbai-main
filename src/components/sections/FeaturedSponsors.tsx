'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Sample sponsor data - replace with actual sponsors
const sponsors = [
  { logo: '/images/ongc.jpeg' },
  { logo: '/images/reliance.jpeg' },
  { logo: '/images/cairn_india.jpeg' },
  { logo: '/images/schlumberger.jpeg' },
  { logo: '/images/baker_hughes.jpeg' },
  { logo: '/images/halliburton.jpeg' },
  { logo: '/images/sponsers/abc.jpeg'},
  { logo: '/images/sponsers/aramco.jpeg'},
  { logo: '/images/sponsers/chevron.jpeg'},
  { logo: '/images/sponsers/bp.jpeg'},
  { logo: '/images/sponsers/china.jpeg'},
  { logo: '/images/sponsers/exlog.jpeg'},
  { logo: '/images/sponsers/geolog.jpeg'},
  { logo: '/images/sponsers/geoservice.jpeg'},
  { logo: '/images/sponsers/kuwait.jpeg'},
  { logo: '/images/sponsers/lt.jpeg'},
  { logo: '/images/sponsers/oil_india.jpeg'},
  { logo: '/images/sponsers/qatar.jpeg'},
  { logo: '/images/sponsers/sinopec.jpeg'},
  { logo: '/images/sponsers/weatherford.jpeg'},
  { logo: '/images/sponsers/innovate.jpeg' },
  { logo: '/images/sponsers/energy.jpeg' }
  
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
            Our Industry Partners
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