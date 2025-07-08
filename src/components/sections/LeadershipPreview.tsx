'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { leadershipTeam } from '@/data/leadership'
import CommitteeMember from './CommitteeMember'

export default function LeadershipPreview() {
  // Get only the first 3 members for the preview
  const previewMembers = leadershipTeam.slice(0, 3)

  return (
    <section className="section-padding bg-[#f2f7fd]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-spe-gray-800 max-w-2xl mx-auto">
            Meet the dedicated professionals leading SPE Mumbai Section towards excellence in the oil and gas industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-16">
          {previewMembers.map((member, index) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-0 overflow-hidden group border border-spe-blue/20"
            >
              {/* Photo with circular frame, border, and subtle gradient ring */}
              <div className="relative flex items-center justify-center mt-8 mb-5">
                <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-spe-blue/20 to-spe-navy/10 blur-sm"></div>
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-spe-blue shadow-lg bg-[#f2f7fd] flex items-center justify-center relative z-10">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-spe-gray-200 flex items-center justify-center text-spe-gray-400">
                      <span className="text-4xl font-bold">{member.name[0]}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Text content */}
              <div className="flex flex-col items-center px-8 pb-8">
                <h3 className="text-lg md:text-xl font-extrabold font-secondary text-spe-navy mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-base md:text-lg font-semibold font-primary text-spe-blue mb-1">
                  {member.position}
                </p>
                {member.company && (
                  <p className="text-sm md:text-base font-medium text-spe-gray-800 mb-2">
                    {member.company}
                  </p>
                )}
                {member.bio && (
                  <p className="text-xs md:text-sm font-normal text-spe-gray-700 text-center leading-snug line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
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