'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"

import {
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  ClockIcon,
  MapPinIcon
} from "@heroicons/react/24/outline"

type VolunteerRole = {
  title: string
  description: string
  responsibilities: string
  timeCommitment: string
  location: string
  teamWork: string
  skills: string
  benefits: string
}

// Moved data outside component to prevent re-creation on every render
const volunteerRoles: Record<string, VolunteerRole[]> = {
  education: [
    {
      title: "Schools Career Guidance Volunteer",
      description: "Inspire the next generation by sharing insights about energy careers and STEM pathways.",
      responsibilities: "Attend career fairs, guide students and parents on STEM opportunities.",
      timeCommitment: "2–3 hours per event.",
      location: "Schools across Mumbai",
      teamWork: "Teams of 2-3 volunteers.",
      skills: "Communication and enthusiasm for STEM.",
      benefits: "Public speaking skills and mentoring experience."
    }
  ],
  events: [
    {
      title: "Events Committee Volunteer",
      description: "Support SPE Mumbai events including workshops and networking sessions.",
      responsibilities: "Coordinate speakers, manage registrations and logistics.",
      timeCommitment: "Monthly meetings + events.",
      location: "Various venues across Mumbai",
      teamWork: "Work with events committee.",
      skills: "Organization and teamwork.",
      benefits: "Event management and networking."
    }
  ],
  communication: [
    {
      title: "Communications Volunteer",
      description: "Create content for SPE Mumbai digital platforms.",
      responsibilities: "Manage social media and newsletters.",
      timeCommitment: "3-5 hours per week.",
      location: "Remote",
      teamWork: "Collaborate with marketing team.",
      skills: "Writing and digital marketing.",
      benefits: "Portfolio building and creative experience."
    }
  ],
  mentoring: [
    {
      title: "Student Chapter Mentor",
      description: "Mentor SPE student chapters and guide future engineers.",
      responsibilities: "Conduct talks and mentor student leaders.",
      timeCommitment: "Monthly meetings.",
      location: "Universities across Mumbai",
      teamWork: "Work with faculty advisors.",
      skills: "Industry experience.",
      benefits: "Leadership development and mentoring impact."
    }
  ]
}

const tabs = [
  { key: "education", label: "Education", icon: AcademicCapIcon },
  { key: "events", label: "Events", icon: CalendarDaysIcon },
  { key: "communication", label: "Communications", icon: ChatBubbleBottomCenterTextIcon },
  { key: "mentoring", label: "Mentoring", icon: UserGroupIcon }
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Volunteering() {
  const [activeTab, setActiveTab] = useState("education")

  return (
    <div className="min-h-screen flex flex-col bg-[#081428] text-white selection:bg-sky-500/30">
      
      <Navigation />

      <main className="flex-grow pt-20">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
          
          {/* Background Gradients & Grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3a] via-[#153c66] to-[#0a1d3a]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Glow Lights */}
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="container-custom relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto flex flex-col items-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-300 border border-sky-400/30 rounded-full text-xs font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md">
                <SparklesIcon className="w-4 h-4" />
                Get Involved
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white">
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
                  Volunteering
                </span>
              </h1>

              <p className="text-lg md:text-xl text-sky-100/70 leading-relaxed font-light">
                Help shape the future of the energy industry by volunteering with SPE Mumbai. Connect, lead, and inspire the next generation.
              </p>
            </motion.div>
          </div>
        </section>


        {/* BENEFITS GRID */}
        <section className="py-20 relative bg-[#081428] border-y border-sky-900/20">
          <div className="container-custom mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { icon: UserGroupIcon, title: "Expand Network", desc: "Build lasting relationships with global energy professionals." },
                { icon: AcademicCapIcon, title: "Develop Skills", desc: "Hone your leadership, management, and communication skills." },
                { icon: LightBulbIcon, title: "Share Knowledge", desc: "Support technical growth and innovation in the community." },
                { icon: BuildingOffice2Icon, title: "Career Growth", desc: "Boost credibility and elevate your professional profile." }
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    className="group bg-white/[0.02] rounded-2xl border border-white/[0.08] p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] backdrop-blur-xl"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-sky-400" />
                    </div>
                    <h3 className="font-semibold text-sky-100 text-lg mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sky-100/60 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>


        {/* OPPORTUNITIES (TABS & CARDS) */}
        <section className="py-24 relative bg-[#081428]">
          <div className="container-custom mx-auto px-6">
            
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-sky-400 mb-4">
                Open Roles
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Volunteer Opportunities
              </h2>
              <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
            </div>

            {/* ANIMATED TABS */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                      relative px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-300 flex items-center gap-2 z-10
                      ${isActive ? "text-white" : "text-sky-100/60 hover:text-sky-300 hover:bg-white/[0.02]"}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-xl -z-10 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* ROLE CARDS WITH CROSSFADE */}
            <div className="max-w-4xl mx-auto min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {volunteerRoles[activeTab].map((role, index) => (
                    <div
                      key={index}
                      className="bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/[0.08] shadow-lg overflow-hidden"
                    >
                      <div className="p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8 border-b border-white/[0.05] pb-8">
                          <div>
                            <h3 className="text-2xl font-bold text-sky-100 mb-3">
                              {role.title}
                            </h3>
                            <p className="text-sky-100/70 text-lg leading-relaxed">
                              {role.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 rounded-lg border border-sky-500/20 whitespace-nowrap h-fit">
                            <ClockIcon className="w-4 h-4 text-sky-400" />
                            <span className="text-sm font-medium text-sky-300">{role.timeCommitment}</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                          <div className="space-y-6">
                            <div>
                              <h4 className="flex items-center gap-2 font-semibold text-sky-400 mb-2">
                                <SparklesIcon className="w-5 h-5" /> Responsibilities
                              </h4>
                              <p className="text-sky-100/70 text-sm leading-relaxed">{role.responsibilities}</p>
                            </div>
                            <div>
                              <h4 className="flex items-center gap-2 font-semibold text-sky-400 mb-2">
                                <MapPinIcon className="w-5 h-5" /> Location & Team
                              </h4>
                              <p className="text-sky-100/70 text-sm leading-relaxed">{role.location} • {role.teamWork}</p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h4 className="flex items-center gap-2 font-semibold text-sky-400 mb-2">
                                <AcademicCapIcon className="w-5 h-5" /> Required Skills
                              </h4>
                              <p className="text-sky-100/70 text-sm leading-relaxed">{role.skills}</p>
                            </div>
                            <div>
                              <h4 className="flex items-center gap-2 font-semibold text-sky-400 mb-2">
                                <LightBulbIcon className="w-5 h-5" /> Key Benefits
                              </h4>
                              <p className="text-sky-100/70 text-sm leading-relaxed">{role.benefits}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>


        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden bg-[#081428]">
          {/* Animated Glow Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/20 blur-[200px] rounded-full pointer-events-none"
          />

          <div className="container-custom relative z-10 mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] border-t-white/[0.15] p-12 md:p-20 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Ready to Get 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300"> Involved?</span>
              </h2>

              <p className="text-sky-100/70 mb-10 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Join our network of dedicated SPE Mumbai volunteers. Make a tangible impact in the energy community while growing your own career.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25 transition-all"
                >
                  Apply Now
                </motion.a>

                <motion.a
                  href="mailto:volunteer@spemumbai.org"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl font-medium text-lg border border-sky-400/30 text-sky-300 transition-all"
                >
                  Email Coordinator
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}