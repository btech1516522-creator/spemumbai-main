'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { UserPlusIcon, UserGroupIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#27477f] to-[#6a9be0] text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Join SPE Mumbai?</h2>
          <p className="text-xl text-spe-gray-200 max-w-3xl mx-auto">
            Gain access to exclusive events, networking opportunities, and technical resources unique to SPE Mumbai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
          >
            <UserGroupIcon className="h-12 w-12 mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">Networking</h3>
            <p className="text-spe-gray-200">
              Connect with industry professionals, executives, and technical experts in the oil and gas sector.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
          >
            <AcademicCapIcon className="h-12 w-12 mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">Knowledge Sharing</h3>
            <p className="text-spe-gray-200">
              Access technical resources, journals, and educational materials to stay at the forefront of industry developments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
          >
            <GlobeAltIcon className="h-12 w-12 mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">Global Community</h3>
            <p className="text-spe-gray-200">
              Be part of a global network spanning 154 countries with opportunities to collaborate internationally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
          >
            <UserPlusIcon className="h-12 w-12 mb-4 text-white" />
            <h3 className="text-xl font-bold mb-2">Professional Growth</h3>
            <p className="text-spe-gray-200">
              Enhance your career through leadership opportunities, workshops, and professional development events.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <a 
            href="https://www.spe.org/en/join/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-spe-navy font-bold py-3 px-8 rounded-lg hover:bg-spe-gray-100 transition-colors duration-300"
          >
            Join SPE Today
          </a>
        </motion.div>
      </div>
    </section>
  )
}