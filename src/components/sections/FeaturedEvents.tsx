'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

const events = [
  {
    id: 1,
    title: 'Annual Technical Conference 2024',
    date: '2024-05-15',
    time: '09:00 AM',
    location: 'Mumbai Convention Center',
    description: 'Join us for our flagship technical conference featuring industry experts and cutting-edge research.',
    image: '/images/events/atc-2024.jpg',
  },
  {
    id: 2,
    title: 'Young Professionals Workshop',
    date: '2024-04-20',
    time: '02:00 PM',
    location: 'SPE Mumbai Office',
    description: 'A workshop designed for young professionals to enhance their skills and network with industry leaders.',
    image: '/images/events/yp-workshop.jpg',
  },
  {
    id: 3,
    title: 'Student Chapter Meet',
    date: '2024-04-10',
    time: '10:00 AM',
    location: 'IIT Bombay',
    description: 'Annual gathering of student chapters to share experiences and learn from each other.',
    image: '/images/events/student-meet.jpg',
  },
]

export default function FeaturedEvents() {
  return (
    <section className="section-padding bg-spe-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-spe-gray-600 max-w-2xl mx-auto">
            Join us for exciting technical sessions, networking opportunities, and professional development events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={`/events/${event.id}`} className="block">
                <div className="card group">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url("${event.image}")`,
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-spe-navy transition-colors duration-200">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-spe-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-spe-gray-700 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/events" className="btn-primary">
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 