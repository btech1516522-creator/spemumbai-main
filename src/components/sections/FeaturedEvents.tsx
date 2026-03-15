'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon, XMarkIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'

interface EventItem {
  id: string | number
  title: string
  date: string
  endDate?: string
  time?: string
  location: string
  description: string
  image?: string
  active?: boolean
}

const staticEvents: EventItem[] = [
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
  const [events, setEvents] = useState<EventItem[]>(staticEvents)
  const [lightbox, setLightbox] = useState<EventItem | null>(null)
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    fetch('/api/content?type=events')
      .then((r) => r.json())
      .then((data: EventItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data.filter((e) => e.active !== false))
        }
      })
      .catch(() => {})
  }, [])

  // Filter events: show non-expired by default, or all if showArchived is true
  const getFilteredEvents = () => {
    const today = new Date().toISOString().split('T')[0]
    if (showArchived || !showAll) {
      // If showing archived or on homepage, include all non-expired + expired if showArchived is true
      return events.filter((e) => {
        if (showArchived) return true // Show all
        // On homepage, only show non-expired events (or events without endDate)
        return !e.endDate || e.endDate >= today
      })
    }
    return events.filter((e) => !e.endDate || e.endDate >= today) // Show only active, non-expired
  }

  const filteredEvents = getFilteredEvents()
  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 3)

  return (
    <section className="section-padding bg-[#eaf2fb]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold font-secondary text-spe-navy mb-4 drop-shadow">
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl font-medium font-primary text-spe-gray-900 max-w-2xl mx-auto mb-2">
            Join us for exciting technical sessions, networking opportunities, and professional development events.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-6">
          {displayedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Poster / Image */}
              <div className="relative sm:w-56 md:w-64 flex-shrink-0 bg-gray-100">
                {event.image ? (
                  <>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-52 sm:h-full object-cover"
                    />
                    <button
                      onClick={() => setLightbox(event)}
                      className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/35 transition-colors duration-200 group"
                      title="View full poster"
                    >
                      <MagnifyingGlassPlusIcon className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-52 sm:h-full flex items-center justify-center bg-blue-50">
                    <CalendarIcon className="h-16 w-16 text-blue-200" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between p-5 flex-1">
                <div>
                  <h3 className="text-xl font-bold font-secondary text-spe-navy mb-3 leading-snug">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-500 font-primary mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-spe-blue flex-shrink-0" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      })}
                      {event.endDate && event.endDate !== event.date && ` → ${new Date(event.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                      </span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-spe-blue flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-spe-blue flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-primary leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>
                {event.image && (
                  <button
                    onClick={() => setLightbox(event)}
                    className="mt-4 self-start flex items-center gap-1.5 text-sm font-semibold text-spe-blue hover:text-spe-navy transition-colors"
                  >
                    <MagnifyingGlassPlusIcon className="h-4 w-4" />
                    View Full Poster
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/events" className="btn-primary text-lg md:text-xl font-bold font-secondary px-8 py-3 rounded-lg shadow-md hover:scale-105 transition-transform">
              View All Events
            </Link>
          </motion.div>
        )}

        {showAll && filteredEvents.length < events.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowArchived(!showArchived)}
              className="btn-primary text-lg md:text-xl font-bold font-secondary px-8 py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              {showArchived ? 'Show Upcoming Events' : 'View All Events (Including Archived)'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full max-h-[70vh] object-contain bg-gray-50"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-spe-navy mb-1">{lightbox.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(lightbox.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    {lightbox.endDate && lightbox.endDate !== lightbox.date && ` → ${new Date(lightbox.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    {lightbox.location}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{lightbox.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

