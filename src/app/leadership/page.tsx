'use client'

import { motion } from "framer-motion"
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CommitteeMember from '@/components/sections/CommitteeMember'
import { leadershipTeam } from '@/data/leadership'
import LeadershipCTA from './LeadershipCTA'

export default function Leadership() {
  return (
    <main className="flex flex-col min-h-screen bg-[#081428] text-white">

      <Navigation />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-36">

        {/* ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b2140] via-[#1a4f78] to-[#0b2140]" />

        {/* ocean glow */}
        <div className="absolute top-[-200px] left-[20%] w-[700px] h-[700px] bg-sky-500/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[20%] w-[700px] h-[700px] bg-cyan-400/20 blur-[200px] rounded-full" />

        <div className="container-custom relative z-10 text-center">

          <motion.span
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.6 }}
            className="inline-block px-5 py-2 bg-sky-500/10 backdrop-blur-md rounded-full text-xs font-semibold text-sky-300 mb-6 border border-sky-400/20 tracking-widest uppercase"
          >
            Our Team
          </motion.span>

          <motion.h1
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white"
          >
            Our Leadership
            <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
              Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:.3 }}
            className="text-lg md:text-xl text-sky-100/70 max-w-2xl mx-auto leading-relaxed"
          >
            Meet the visionary professionals guiding the SPE Mumbai Section
            towards innovation and excellence in the global energy industry.
          </motion.p>

        </div>
      </section>


      {/* COMMITTEE SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a1d3a] via-[#14335a] to-[#0a1d3a]">

        <div className="container-custom">

          {/* heading */}
          <div className="text-center mb-16">

            <span className="inline-block text-xs uppercase tracking-[0.3em] text-sky-400 mb-4">
              Executive Committee 2024-25
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Meet Our Leaders
            </h2>

            <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"/>
          </div>


          {/* FEATURED MEMBER */}
          <div className="flex justify-center mb-16">

            <motion.div
              initial={{opacity:0,y:40}}
              whileInView={{opacity:1,y:0}}
              viewport={{ once:true }}
              transition={{ duration:.6 }}
              className="w-full max-w-sm backdrop-blur-xl bg-sky-500/[0.06] border border-sky-400/20 rounded-2xl p-4 shadow-xl shadow-sky-500/10"
            >
              <CommitteeMember
                key={leadershipTeam[0].name}
                member={leadershipTeam[0]}
                index={0}
              />
            </motion.div>

          </div>


          {/* TEAM GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">

            {leadershipTeam.slice(1).map((member, index) => (

              <motion.div
                key={member.name}
                initial={{opacity:0,y:40}}
                whileInView={{opacity:1,y:0}}
                viewport={{ once:true }}
                transition={{ delay:index * .05 }}
                className="group backdrop-blur-xl bg-sky-500/[0.04] border border-sky-400/20 rounded-xl p-3 hover:bg-sky-500/[0.08] transition-all duration-300 hover:scale-[1.05]"
              >

                <CommitteeMember
                  member={member}
                  index={index + 1}
                />

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <LeadershipCTA />

      <Footer />

    </main>
  )
}