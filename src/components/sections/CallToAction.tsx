'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { UserPlusIcon, UserGroupIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const benefits = [
  {
    icon: UserGroupIcon,
    title: 'Networking',
    desc: 'Connect with industry professionals, executives, and technical experts in the oil and gas sector.',
    stat: '156K+',
    statLabel: 'Members',
    gradient: 'from-blue-400 to-cyan-300',
  },
  {
    icon: AcademicCapIcon,
    title: 'Knowledge Sharing',
    desc: 'Access technical resources, journals, and educational materials at the forefront of the industry.',
    stat: '1000+',
    statLabel: 'Publications',
    gradient: 'from-violet-400 to-blue-400',
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Community',
    desc: 'Be part of a global network spanning 154 countries with international collaboration opportunities.',
    stat: '154',
    statLabel: 'Countries',
    gradient: 'from-emerald-400 to-teal-300',
  },
  {
    icon: UserPlusIcon,
    title: 'Professional Growth',
    desc: 'Enhance your career through leadership opportunities, workshops, and professional development.',
    stat: '200+',
    statLabel: 'Annual Events',
    gradient: 'from-amber-400 to-orange-300',
  },
]

/* Floating particles */
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}))

/* Animated number counter */
function Counter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const num = parseInt(target.replace(/[^0-9]/g, ''))
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.floor(v).toLocaleString())

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(motionVal, num, { duration: 2, ease: 'easeOut' })
    return () => ctrl.stop()
  }, [inView, motionVal, num])

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function CallToAction() {
  return (
    <section className="cta-section-dark">
      {/* ── Decorative Layer ── */}
      {/* Animated blobs */}
      <div className="absolute top-0 left-[5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] animate-blob" />
      <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] bg-indigo-400/8 rounded-full blur-[120px] animate-blob-delay" />
      {/* Spotlight */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full animate-spotlight" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Orbiting rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/[0.04]">
        <div className="animate-orbit" style={{ '--orbit-r': '140px', '--orbit-dur': '18s' } as React.CSSProperties}>
          <div className="w-2 h-2 rounded-full bg-blue-400/60" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/[0.03]">
        <div className="animate-orbit" style={{ '--orbit-r': '225px', '--orbit-dur': '28s' } as React.CSSProperties}>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-custom relative z-10 text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="badge-hero text-xs mb-5 inline-block"
          >
            Why SPE Mumbai
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-white">
            Unlock Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Potential</span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/40 to-cyan-400/30 rounded-full -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400/60 rounded-full" />
            <div className="w-3 h-3 rounded-full border-2 border-blue-400/60 animate-pulse" />
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-400/60 rounded-full" />
          </div>

          <p className="text-lg text-blue-100/75 max-w-2xl mx-auto leading-relaxed">
            Join a global community of energy professionals. Access world-class resources, build meaningful connections, and accelerate your career.
          </p>
        </motion.div>

        {/* Showcase panel inspired by SPE-style membership banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase text-sky-300 border border-sky-400/30 bg-sky-500/10 mb-5">
                SPE Membership
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5 text-white">
                Join the Global
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
                  Community Driving Innovation
                </span>
              </h3>
              <p className="text-blue-100/75 text-lg leading-relaxed max-w-xl mb-8">
                SPE membership provides a worldwide network that fuels knowledge sharing, collaboration, and professional growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://www.spe.org/en/join/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-900/30"
                >
                  Join SPE
                </motion.a>
                <motion.a
                  href="/join"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl border border-amber-300/40 bg-amber-300/90 text-slate-900 font-semibold"
                >
                  Renew Your Membership
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, rotateY: -4 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              className="relative"
              style={{ perspective: 1200 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.35)] bg-slate-900/40">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/events/tech_connect.jpeg"
                    alt="SPE Mumbai networking and membership"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/65 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600/70 backdrop-blur-sm border border-white/20">
                  SPE Mumbai Section
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Top gradient stripe */}
              <div className={`h-1 w-full bg-gradient-to-r ${b.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.04] group-hover:to-white/[0.08] transition-all duration-500" />

              <div className="relative z-10 p-7">
                {/* Icon */}
                <div className="cta-icon-ring mb-5">
                  <b.icon className={`h-7 w-7 bg-gradient-to-br ${b.gradient} bg-clip-text`} style={{ color: 'transparent', stroke: 'url(#iconGrad)' }} />
                  <b.icon className={`h-7 w-7 text-blue-300 absolute inset-0 m-auto`} />
                </div>

                {/* Stat counter */}
                <div className="mb-4">
                  <span className={`text-2xl font-extrabold bg-gradient-to-r ${b.gradient} bg-clip-text text-transparent`}>
                    <Counter target={b.stat} suffix={b.stat.includes('+') ? '+' : ''} />
                  </span>
                  <span className="text-blue-300/60 text-xs ml-1.5 uppercase tracking-wider">{b.statLabel}</span>
                </div>

                <h3 className="text-lg font-bold mb-2.5 group-hover:text-blue-200 transition-colors duration-300">{b.title}</h3>
                <p className="text-blue-200/50 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA button area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          {/* Animated ring behind button */}
          <div className="relative inline-block">
            <div className="absolute -inset-4 rounded-3xl animate-cta-glow opacity-60" />
            <motion.a
              href="https://www.spe.org/en/join/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-premium group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
              <span>Join SPE Today</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </motion.a>
          </div>

          {/* Trust microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-5 text-blue-300/50 text-sm flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            Free for students &bull; Secure SPE.org checkout
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}