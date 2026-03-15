'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { 
  SparklesIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  AcademicCapIcon,
  LinkIcon,
  CreditCardIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline'

/* ───────── Animated Counter ───────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
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
    const ctrl = animate(motionVal, target, { duration: 2.5, ease: 'easeOut' })
    return () => ctrl.stop()
  }, [inView, motionVal, target])

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>
}

/* ───────── Floating particles ───────── */
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  dur: 5 + Math.random() * 7,
  delay: Math.random() * 5,
}))

/* ───────── Data ───────── */
const benefits = [
  {
    icon: <SparklesIcon className="w-7 h-7" />,
    title: 'Tailored Resources',
    desc: 'Access top-tier technical content, member programs, and professional development opportunities that match your specific engineering needs.',
    glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]',
    border: 'group-hover:border-sky-400/40',
    iconBg: 'bg-sky-500/10 text-sky-400'
  },
  {
    icon: <GlobeAltIcon className="w-7 h-7" />,
    title: 'Global Community',
    desc: 'Connect with energy professionals worldwide through communities relevant to your technical expertise, location, or career stage.',
    glow: 'group-hover:shadow-[0_0_40px_rgba(167,139,250,0.15)]',
    border: 'group-hover:border-violet-400/40',
    iconBg: 'bg-violet-500/10 text-violet-400'
  },
  {
    icon: <AcademicCapIcon className="w-7 h-7" />,
    title: 'Career Support',
    desc: 'From student programs to executive leadership tools, an SPE membership offers resources that grow with you throughout your career.',
    glow: 'group-hover:shadow-[0_0_40px_rgba(52,211,153,0.15)]',
    border: 'group-hover:border-emerald-400/40',
    iconBg: 'bg-emerald-500/10 text-emerald-400'
  },
]

const plans = [
  {
    type: 'Professional',
    tagline: 'Elevate your role in the energy industry.',
    desc: 'Connect with cross-disciplinary knowledge, exclusive events, and a global community dedicated to driving innovation.',
    features: [
      'Full access to OnePetro technical library',
      'Journal of Petroleum Technology (JPT)',
      'Member pricing on events & courses',
      'Global networking & section access',
      'Leadership & volunteer opportunities',
      'Career resources & job board',
    ],
    cta: 'Join as Professional',
    href: 'https://www.spe.org/member/SPEMBRInitProcess?MBRProcess=Join&MBRType=PROFESSIONAL',
    theme: 'sky',
    featured: true,
  },
  {
    type: 'Student',
    tagline: 'Be part of the energy community early.',
    desc: 'Gain early access to industry knowledge, resources, and hands-on experiences that open doors for your future career.',
    features: [
      'FREE membership for students',
      'Access to OnePetro resources',
      'Student chapter participation',
      'PetroBowl & paper contests',
      'Scholarships & fellowships',
      'Mentorship programs',
    ],
    cta: 'Join as Student',
    href: 'https://www.spe.org/member/JoinSPE/Index?MBRProcess=Join&MBRType=STUDENT',
    theme: 'emerald',
    featured: false,
  },
]

const stats = [
  { value: 132000, suffix: '+', label: 'Industry Professionals', icon: <UserGroupIcon className="w-8 h-8 mx-auto mb-4 text-sky-400" /> },
  { value: 146, suffix: '', label: 'Countries Represented', icon: <GlobeAltIcon className="w-8 h-8 mx-auto mb-4 text-cyan-400" /> },
  { value: 200, suffix: '+', label: 'Geographic Sections', icon: <GlobeAltIcon className="w-8 h-8 mx-auto mb-4 text-blue-400" /> },
]

const quickLinks = [
  { label: 'Renew Membership', href: 'https://www.spe.org/join/renew/', icon: ArrowRightIcon },
  { label: 'Member Benefits', href: 'https://www.spe.org/members/', icon: SparklesIcon },
  { label: 'Member Directory', href: 'https://www.spe.org/ams/SPECustomerProfile/SPESearchMembershipDirectory.aspx', icon: IdentificationIcon },
  { label: 'Payment Options', href: 'https://www.spe.org/join/options/', icon: CreditCardIcon },
  { label: 'Get Involved', href: 'https://www.spe.org/get-involved/', icon: LinkIcon },
]

/* ───────── Animations ───────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#081428] text-white selection:bg-sky-500/30">
      <Navigation />

      <main className="flex-grow pt-20">
        
        {/* ════════════════════════════════════════════════════════════
            SECTION 1 — HERO
           ════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32 border-b border-white/[0.05]">
          {/* Background Gradients & Grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3a] via-[#153c66] to-[#0a1d3a]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Glow Lights */}
          <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/10 blur-[150px] rounded-full pointer-events-none" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={`hero-p-${p.id}`}
                className="absolute rounded-full bg-sky-400/30"
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
              />
            ))}
          </div>

          <div className="container-custom relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto flex flex-col items-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-300 border border-sky-400/30 rounded-full text-xs font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md">
                <GlobeAltIcon className="w-4 h-4" />
                SPE Membership
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
                Join the Global <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
                  Energy Community
                </span>
              </h1>

              <p className="text-lg md:text-xl text-sky-100/70 leading-relaxed font-light max-w-2xl mb-10">
                SPE membership provides a worldwide network that fuels knowledge sharing, collaboration, and professional growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
                <motion.a
                  href="#plans"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  View Memberships
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="https://www.spe.org/join/renew/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl font-medium text-lg border border-sky-400/30 text-sky-300 transition-all flex items-center justify-center"
                >
                  Renew Membership
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 — STATS COUNTER
           ════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-[#081428] border-b border-white/[0.05]">
          <div className="container-custom mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="text-center p-6">
                  {s.icon}
                  <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent mb-2">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-sky-100/50 text-sm font-semibold uppercase tracking-widest">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3 — BENEFITS
           ════════════════════════════════════════════════════════════ */}
        <section className="py-24 relative bg-[#081428]">
          <div className="container-custom mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-sky-400 mb-4">Why Join Us</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Membership Benefits</h2>
              <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`group relative bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] ${b.glow} ${b.border}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${b.iconBg}`}>
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{b.title}</h3>
                  <p className="text-sky-100/60 leading-relaxed font-light">{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4 — MEMBERSHIP PLANS
           ════════════════════════════════════════════════════════════ */}
        <section id="plans" className="py-24 relative bg-[#081428] border-t border-white/[0.05]">
          {/* Subtle background glow behind plans */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="container-custom relative z-10 mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-sky-400 mb-4">Choose Your Path</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Which Membership is Best for You?</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, i) => {
                // Dynamic styling based on theme
                const isSky = plan.theme === 'sky';
                const borderClass = plan.featured ? (isSky ? 'border-sky-400/50' : 'border-emerald-400/50') : 'border-white/[0.08]';
                const shadowClass = plan.featured ? (isSky ? 'shadow-[0_0_40px_rgba(56,189,248,0.15)]' : 'shadow-[0_0_40px_rgba(52,211,153,0.15)]') : '';
                const btnClass = isSky ? 'from-sky-500 to-blue-600 shadow-sky-500/25' : 'from-emerald-500 to-teal-400 shadow-emerald-500/25';
                const checkClass = isSky ? 'text-sky-400' : 'text-emerald-400';

                return (
                  <motion.div
                    key={plan.type}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className={`relative flex flex-col bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-2 ${borderClass} ${shadowClass}`}
                  >
                    {plan.featured && (
                      <div className="absolute top-0 right-10 -translate-y-1/2">
                        <span className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-8 border-b border-white/[0.08] pb-8">
                      <h3 className="text-3xl font-extrabold text-white mb-2">{plan.type} Member</h3>
                      <p className="text-sky-100/60 font-light">{plan.tagline}</p>
                    </div>

                    <p className="text-sky-100/80 mb-8 leading-relaxed flex-grow">{plan.desc}</p>

                    <ul className="space-y-4 mb-10">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircleIcon className={`w-6 h-6 flex-shrink-0 ${checkClass}`} />
                          <span className="text-sky-100/70 text-sm md:text-base">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={plan.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-full py-4 rounded-2xl font-semibold text-lg text-white bg-gradient-to-r text-center shadow-lg transition-all hover:scale-[1.02] flex justify-center items-center gap-2 ${btnClass}`}
                    >
                      {plan.cta}
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5 — QUICK LINKS
           ════════════════════════════════════════════════════════════ */}
        <section className="py-24 relative bg-[#081428] border-t border-white/[0.05]">
          <div className="container-custom mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Access Links</h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            >
              {quickLinks.map((link, i) => (
                <motion.a
                  key={i}
                  variants={fadeUp}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-sky-400/30 transition-all duration-300 group"
                >
                  <link.icon className="w-5 h-5 text-sky-400/70 group-hover:text-sky-400 transition-colors" />
                  <span className="text-sky-100/80 font-medium group-hover:text-white transition-colors">{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 6 — FINAL CTA
           ════════════════════════════════════════════════════════════ */}
        <section className="py-32 relative overflow-hidden bg-[#081428]">
          {/* Animated Glow Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 blur-[200px] rounded-full pointer-events-none"
          />

          <div className="container-custom relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] border-t-white/[0.15] p-12 md:p-20 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Ready to Expand Your <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mt-2"> Professional Network? </span>
              </h2>

              <p className="text-sky-100/70 mb-10 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Start your journey with SPE today. Access technical resources, attend exclusive events, and shape the future of energy.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
                <motion.a
                  href="#plans"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all"
                >
                  View Membership Options
                </motion.a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-sky-300/50 text-sm flex flex-col sm:flex-row items-center justify-center gap-4">
                <span>Free membership available for students</span>
                <span className="hidden sm:block">•</span>
                <span>Secure SPE.org registration</span>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}