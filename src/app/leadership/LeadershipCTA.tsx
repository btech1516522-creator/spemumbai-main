'use client'

import { motion } from "framer-motion"

export default function LeadershipCTA() {
  return (
    <section className="relative overflow-hidden py-36 bg-[#030712]">

      {/* ANIMATED GRID BACKGROUND */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* MOVING ENERGY GLOWS */}
      <motion.div
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-500/20 blur-[200px] rounded-full"
      />

      <motion.div
        animate={{ x: [100, -100, 100] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 blur-[200px] rounded-full"
      />

      {/* FLOATING PARTICLES */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${5 + i * 5}%`,
            top: `${10 + (i % 5) * 18}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-6">

        {/* MAIN GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="
          max-w-5xl mx-auto text-center
          backdrop-blur-2xl bg-white/[0.05]
          border border-white/10
          rounded-[36px]
          p-20
          shadow-[0_0_160px_rgba(0,120,255,0.35)]
          relative overflow-hidden
          "
        >

          {/* SHIMMER LIGHT */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* BADGE */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block text-blue-400 text-xs tracking-[0.25em] uppercase mb-6"
          >
            SPE Leadership Program
          </motion.span>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8"
          >
            Power the
            <span className="
            block
            bg-gradient-to-r
            from-blue-400
            via-cyan-300
            to-indigo-400
            text-transparent
            bg-clip-text
            animate-pulse
            ">
              Future of Energy
            </span>
          </motion.h2>

          {/* DIVIDER */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-blue-400"/>
            <motion.div
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-blue-400"
            />
            <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-blue-400"/>
          </div>

          {/* DESCRIPTION */}
          <p className="text-blue-100/70 text-xl max-w-3xl mx-auto mb-14 leading-relaxed">
            Join SPE Mumbai and collaborate with visionary leaders shaping the
            global energy landscape. Gain mentorship, build an elite network,
            and lead innovation in petroleum engineering.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            {/* JOIN BUTTON */}
            <motion.a
              href="https://www.spe.org/en/join/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="
              group relative px-12 py-5
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r from-blue-500 to-cyan-400
              overflow-hidden
              shadow-xl shadow-blue-500/30
              "
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition"/>
              <span className="relative flex items-center gap-3 justify-center">

                Join SPE Today

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 group-hover:translate-x-1 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>

              </span>
            </motion.a>

            {/* VOLUNTEER BUTTON */}
            <motion.a
              href="/volunteering"
              whileHover={{ scale: 1.05 }}
              className="
              px-12 py-5
              rounded-xl
              border border-blue-400/30
              text-blue-300
              backdrop-blur-md
              hover:bg-blue-500/10
              transition-all
              "
            >
              Volunteer With Us
            </motion.a>

          </div>

          {/* FOOTER NOTE */}
          <p className="mt-10 text-gray-400 text-sm">
            Free membership for students • Secure SPE registration
          </p>

        </motion.div>
      </div>

      {/* SCANNING LINE */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        animate={{ y: [0, 900, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

    </section>
  )
}
