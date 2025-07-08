'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { leadershipTeam } from '@/data/leadership'
import CommitteeMember from './CommitteeMember'

export default function LeadershipPreview() {
  // Get only the first 3 members for the preview
  const previewMembers = leadershipTeam.slice(0, 3)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-spe-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals leading SPE Mumbai Section towards excellence in the oil and gas industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {previewMembers.map((member, index) => (
            <CommitteeMember
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/leadership" className="btn-primary">
            View All Committee Members
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 