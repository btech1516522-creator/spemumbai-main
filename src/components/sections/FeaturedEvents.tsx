'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

interface EventItem {
  id: string | number
  title: string
  date: string
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

  const displayedEvents = showAll ? events : events.slice(0, 3)

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

        <div className={`mx-auto max-w-5xl grid ${displayedEvents.length === 1 ? 'justify-center' : ''} grid-cols-1 ${displayedEvents.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-8`}>
          {displayedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={`/events/${event.id}`} className="block">
                <div className="card group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-spe-gray-100">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-spe-blue-100">
                      <CalendarIcon className="h-16 w-16 text-spe-blue-300" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold font-secondary mb-2 group-hover:text-spe-blue text-spe-navy transition-colors duration-200">
                  {event.title}
                </h3>
                  <div className="space-y-2 text-sm text-spe-gray-600 font-primary">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-spe-blue" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-spe-blue" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-spe-blue" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-spe-gray-700 font-primary text-base line-clamp-2">
                    {event.description}
                  </p>
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
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/events" className="btn-primary text-lg md:text-xl font-bold font-secondary px-8 py-3 rounded-lg shadow-md hover:scale-105 transition-transform">
              View All Events
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

