'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const sponsors = [
  { logo: '/images/ongc.jpeg' },
  { logo: '/images/reliance.jpeg' },
  { logo: '/images/cairn_india.jpeg' },
  { logo: '/images/schlumberger.jpeg' },
  { logo: '/images/baker_hughes.jpeg' },
  { logo: '/images/halliburton.jpeg' },
  { logo: '/images/sponsers/abc.jpeg'},
  { logo: '/images/sponsers/chevron.jpeg'},
  { logo: '/images/sponsers/bp.jpeg'},
  { logo: '/images/sponsers/geolog.jpeg'},
  { logo: '/images/sponsers/geoservice.jpeg'},
  { logo: '/images/sponsers/lt.jpeg'},
  { logo: '/images/sponsers/oil_india.jpeg'},
  { logo: '/images/sponsers/weatherford.jpeg'},
  { logo: '/images/sponsers/petroinnovate.jpeg' },
  { logo: '/images/sponsers/energy.jpeg' },
  { logo: '/images/sponsers/oe.jpeg' },
  { logo: '/images/sponsers/sko.jpeg' },
  { logo: '/images/sponsers/wellkin.jpeg' },
]

const SPONSORS_PER_ROW = 6
const AUTO_SCROLL_INTERVAL = 3500

export default function FeaturedSponsors() {
  const [currentRow, setCurrentRow] = useState(0)
  const totalRows = Math.ceil(sponsors.length / SPONSORS_PER_ROW)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentRow((prev) => (prev + 1) % totalRows)
    }, AUTO_SCROLL_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [totalRows])

  const goToRow = (row: number) => {
    setCurrentRow(row)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentRow((prev) => (prev + 1) % totalRows)
      }, AUTO_SCROLL_INTERVAL)
    }
  }

  const visibleSponsors = sponsors.slice(
    currentRow * SPONSORS_PER_ROW,
    (currentRow + 1) * SPONSORS_PER_ROW
  )

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#020617] via-[#021024] to-[#020617] overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="absolute -top-10 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[170px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-400/25 mb-4">Partners</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Our Industry Partners
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-base md:text-lg text-sky-100/70 max-w-2xl mx-auto">
            Partnering with leading companies to advance technical knowledge and professional excellence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {visibleSponsors.map((sponsor, index) => (
              <motion.div
                key={`${currentRow}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white/[0.03] rounded-xl p-4 flex items-center justify-center h-28 border border-white/[0.1] hover:border-sky-400/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="relative w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={sponsor.logo}
                    alt="Sponsor Logo"
                    fill
                    className="object-contain p-1"
                    sizes="144px"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 gap-3">
            <button
              aria-label="Previous"
              onClick={() => goToRow((currentRow - 1 + totalRows) % totalRows)}
              className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-sky-500/40 hover:text-white text-sky-200 flex items-center justify-center transition-all duration-300 border border-white/[0.1]"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalRows }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToRow(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentRow === idx ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to row ${idx + 1}`}
                />
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => goToRow((currentRow + 1) % totalRows)}
              className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-sky-500/40 hover:text-white text-sky-200 flex items-center justify-center transition-all duration-300 border border-white/[0.1]"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sky-300 font-semibold hover:text-cyan-300 transition-colors duration-300 group"
          >
            Interested in becoming a sponsor? Contact us
            <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}