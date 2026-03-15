'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { leadershipTeam } from '@/data/leadership'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function LeadershipPreview() {
  const previewMembers = leadershipTeam.slice(0, 3)

  return (
    <section className="relative section-padding bg-gradient-to-b from-[#020617] via-[#021024] to-[#020617] overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(56,189,248,0.3) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-20 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-[160px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-400/25 mb-4">Leadership</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Our Leadership Team</h2>
          <div className="section-divider mb-6"></div>
          <p className="text-sky-100/70 max-w-2xl mx-auto">
            Meet the dedicated professionals leading SPE Mumbai Section towards excellence in the oil and gas industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14">
          {previewMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group flex flex-col items-center bg-white/[0.03] rounded-2xl transition-all duration-500 overflow-hidden border border-white/[0.1] backdrop-blur-xl hover:bg-white/[0.05] hover:border-sky-400/30 hover:-translate-y-2"
            >
              {/* Gradient top accent */}
              <div className="w-full h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500" />
              
              {/* Photo */}
              <div className="relative flex items-center justify-center mt-8 mb-5">
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-sky-500/25 to-cyan-400/10 blur-lg group-hover:scale-110 transition-transform duration-500" />
                <div className="w-32 h-32 rounded-full overflow-hidden border-[3px] border-white/50 shadow-lg bg-slate-900/40 relative z-10 ring-2 ring-sky-400/30">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-cyan-400/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-sky-300">{member.name[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col items-center px-6 pb-8 text-center">
                <h3 className="text-lg font-bold text-sky-100 mb-1 tracking-tight">{member.name}</h3>
                <p className="text-sm font-semibold text-sky-300 mb-1">{member.position}</p>
                {member.organization && (
                  <p className="text-xs text-sky-100/60 mb-3">{member.organization}</p>
                )}
                {member.bio && (
                  <p className="text-xs text-sky-100/65 leading-relaxed line-clamp-3">{member.bio}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/leadership" className="btn-gradient inline-flex items-center gap-2">
            View All Committee Members
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}