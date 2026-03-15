'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon, XMarkIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import { getFileUrl } from '@/lib/storageConfig'

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
  registrationEnabled?: boolean
  proposalPurpose?: string
  proposalLink?: string
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
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null)
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [registrationLoading, setRegistrationLoading] = useState(false)
  const [registrationMessage, setRegistrationMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetch('/api/content?type=events')
      .then((r) => r.json())
      .then((data: EventItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // Load all events (active and inactive) for record keeping
          setEvents(data)
        }
      })
      .catch(() => {})
  }, [])

  // Check if an event is in the past
  const isEventPast = (event: EventItem) => {
    const today = new Date().toISOString().split('T')[0]
    const checkDate = event.endDate || event.date
    return checkDate < today
  }

  // Sort events: upcoming first, then past events
  const getSortedEvents = () => {
    const today = new Date().toISOString().split('T')[0]
    const upcomingEvents = events.filter((e) => {
      const checkDate = e.endDate || e.date
      return checkDate >= today
    })
    const pastEvents = events.filter((e) => {
      const checkDate = e.endDate || e.date
      return checkDate < today
    }).reverse() // Show most recent past events first
    return [...upcomingEvents, ...pastEvents]
  }

  const sortedEvents = getSortedEvents()
  const displayedEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3)

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registeringEvent) return

    if (!registrationForm.name || !registrationForm.email) {
      setRegistrationMessage({ type: 'error', text: 'Name and email are required' })
      return
    }

    setRegistrationLoading(true)
    setRegistrationMessage({ type: '', text: '' })

    try {
      const res = await fetch(`/api/events/${registeringEvent.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationForm),
      })

      const data = await res.json()

      if (res.ok) {
        setRegistrationMessage({ type: 'success', text: data.message || 'Registered successfully!' })
        setRegistrationForm({ name: '', email: '', phone: '', company: '', message: '' })
        setTimeout(() => {
          setRegisteringEvent(null)
          setRegistrationMessage({ type: '', text: '' })
        }, 2000)
      } else {
        setRegistrationMessage({ type: 'error', text: data.error || 'Registration failed' })
      }
    } catch {
      setRegistrationMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setRegistrationLoading(false)
    }
  }

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
                      src={getFileUrl(event.image)}
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
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold font-secondary text-spe-navy leading-snug">
                      {event.title}
                    </h3>
                    {!event.active ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        Past Event
                      </span>
                    ) : isEventPast(event) ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                        Completed
                      </span>
                    ) : null}
                  </div>
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
                  {event.proposalPurpose && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-1">📋 Call for Submissions:</p>
                      <p className="text-sm text-blue-800">{event.proposalPurpose}</p>
                      {event.proposalLink && (
                        <a
                          href={event.proposalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-center transition-colors w-fit"
                        >
                          Submit Here →
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    {event.image && (
                      <button
                        onClick={() => setLightbox(event)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-spe-blue hover:text-spe-navy transition-colors"
                      >
                        <MagnifyingGlassPlusIcon className="h-4 w-4" />
                        View Full Poster
                      </button>
                    )}
                  </div>
                  {event.registrationEnabled && !isEventPast(event) && (
                    <button
                      onClick={() => setRegisteringEvent(event)}
                      className="self-start flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-spe-navy rounded-lg hover:bg-spe-blue-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM9 19c-4.35 0-8 1.343-8 3v2h16v-2c0-1.657-3.65-3-8-3z" />
                      </svg>
                      Register for Event
                    </button>
                  )}
                  {isEventPast(event) && event.registrationEnabled && (
                    <span className="text-xs text-gray-500">
                      Registration closed - Event has passed
                    </span>
                  )}
                </div>
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

        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8 text-sm text-gray-600 font-primary"
          >
            <p>All events are shown - Upcoming events appear first, followed by past events for your reference</p>
          </motion.div>
        )}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {registeringEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setRegisteringEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setRegisteringEvent(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-spe-gray-100 hover:bg-spe-gray-200 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-spe-navy" />
              </button>

              <div className="bg-gradient-to-r from-spe-navy to-spe-blue-500 px-6 py-4 text-white">
                <h3 className="text-lg font-bold mb-1">{registeringEvent.title}</h3>
                <p className="text-sm text-blue-100">Register for this event</p>
              </div>

              <form onSubmit={handleRegistration} className="p-6 space-y-4">
                {registrationMessage.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
                      registrationMessage.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {registrationMessage.type === 'success' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {registrationMessage.text}
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={registrationForm.name}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={registrationForm.email}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={registrationForm.phone}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={registrationForm.company}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Message (Optional)</label>
                  <textarea
                    value={registrationForm.message}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
                    placeholder="Any additional message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={registrationLoading}
                  className="w-full btn-primary py-3 text-center flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {registrationLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Registering...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>

                <p className="text-xs text-spe-gray-500 text-center">* Required fields</p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

