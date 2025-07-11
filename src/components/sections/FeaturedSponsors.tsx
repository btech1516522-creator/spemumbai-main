'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

// Sample sponsor data - replace with actual sponsors
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

const SPONSORS_PER_ROW = 6;
const AUTO_SCROLL_INTERVAL = 3000;

export default function FeaturedSponsors() {
  const [currentRow, setCurrentRow] = useState(0);
  const totalRows = Math.ceil(sponsors.length / SPONSORS_PER_ROW);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentRow((prev) => (prev + 1) % totalRows);
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalRows]);

  // Manual navigation
  const goToRow = (row: number) => {
    setCurrentRow(row);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentRow((prev) => (prev + 1) % totalRows);
      }, AUTO_SCROLL_INTERVAL);
    }
  };

  // Get sponsors for current row
  const visibleSponsors = sponsors.slice(
    currentRow * SPONSORS_PER_ROW,
    (currentRow + 1) * SPONSORS_PER_ROW
  );

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
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {visibleSponsors.map((sponsor, index) => (
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
                      alt="Sponsor Logo"
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Navigation Controls */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              aria-label="Previous"
              onClick={() => goToRow((currentRow - 1 + totalRows) % totalRows)}
              className="w-8 h-8 rounded-full bg-spe-navy text-white flex items-center justify-center transition"
              style={{ backgroundColor: "#1e3357", color: "#fff" }}
            >
              &#8592;
            </button>
            {Array.from({ length: totalRows }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToRow(idx)}
                className={`w-3 h-3 rounded-full mx-1 ${currentRow === idx ? 'bg-spe-blue' : 'bg-spe-navy/60'}`}
                aria-label={`Go to row ${idx + 1}`}
                style={{
                  backgroundColor: currentRow === idx ? "#2563eb" : "#1e3357"
                }}
              />
            ))}
            <button
              aria-label="Next"
              onClick={() => goToRow((currentRow + 1) % totalRows)}
              className="w-8 h-8 rounded-full bg-spe-navy text-white flex items-center justify-center transition"
              style={{ backgroundColor: "#1e3357", color: "#fff" }}
            >
              &#8594;
            </button>
          </div>
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