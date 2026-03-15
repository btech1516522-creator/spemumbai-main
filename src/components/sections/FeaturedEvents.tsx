'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const events = [
  {
    id: 1,
    title: 'Tech Connect Session',
    date: '2025-07-18',
    time: '09:00 AM',
    location: 'Boundary Hall, MCA',
    description: 'An insightful session featuring industry leaders discussing cutting-edge advancements in AI-driven reservoir evaluation and sustainable energy solutions, including offshore wind and decarbonisation strategies in oil and gas.',
    image: '/images/events/tech_connect.jpeg',
  },
]

export default function FeaturedEvents({ showAll = false }) {
  const displayedEvents = showAll ? events : events.slice(0, 3)

  return (
    <section className="relative section-padding bg-gradient-to-b from-[#020617] via-[#021024] to-[#020617] overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[130px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-400/25 mb-4">Events</span>
          <h2 className="text-2xl md:text-4xl font-extrabold font-secondary text-white mb-4">
            Upcoming Events
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-base md:text-lg text-sky-100/70 max-w-2xl mx-auto">
            Join us for exciting technical sessions, networking opportunities, and professional development events.
          </p>
        </motion.div>

        <div className={`mx-auto max-w-5xl grid ${displayedEvents.length === 1 ? 'justify-center' : ''} grid-cols-1 ${displayedEvents.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-8`}>
          {displayedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href="/events" className="block h-full">
                <div className="h-full flex flex-col overflow-hidden group rounded-2xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl hover:bg-white/[0.05] hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 bg-[#02182b]/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-sky-400/20">
                      <span className="text-xs font-bold text-sky-200">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-3 group-hover:text-sky-300 text-sky-100 transition-colors duration-200">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-sky-100/70">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-sky-400 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-sky-400 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sky-100/65 text-sm leading-relaxed line-clamp-2 flex-1">
                      {event.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/[0.1] flex items-center text-sky-300 text-sm font-semibold group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRightIcon className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/events" className="btn-gradient inline-flex items-center gap-2">
              View All Events
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

