'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Example event data
const galleryEvents = [
  {
    slug: 'techconnect1', 
    title: '#35years Of #SPEMumbaiSection',
    date: 'April 2025',
    cover: '/images/gallery1/img1.jpeg',
  },
  {
    slug: 'techconnect2',
    title: 'A Night of Insights & Celebrations!',
    date: 'April 2025',
    cover: '/images/gallery2/img1.jpeg',
  },
  {
    slug: 'techconnect3',
    title: '#TechConnect: An Engaging & Impactful Session!',
    date: 'February 2025',
    cover: '/images/gallery3/img1.jpeg',
  },
   {
    slug: 'techconnect4',
    title: 'Tech Connect Session On Hydraulic Fracturing',
    date: '13 May 2025',
    cover: '/images/gallery4/img1.jpg',
  },
   {
    slug: 'techconnect5',
    title: 'Tech Connect Session ',
    date: '5 months ago',
    cover: '/images/student-chapters/ig1.jpg',
  },
  // Add more events as needed
];

export default function Gallery() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-spe-navy text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
            Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore memorable moments from our events and activities.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-[#eaf2fb]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {galleryEvents.map((event) => (
              <div
                key={event.slug}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-spe-blue/10 overflow-hidden mx-auto"
                style={{ height: '320px', width: '320px', minWidth: '260px', maxWidth: '340px' }}
              >
                <div className="relative h-[220px] w-full flex items-center justify-center bg-gray-100">
                  <Image
                    src={event.cover}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 flex flex-col justify-between flex-grow">
                  <h3 className="text-base font-semibold text-spe-navy text-center mb-1">
                    {event.title}
                  </h3>
                  <div className="text-xs text-spe-blue text-center mb-2">{event.date}</div>
                  <Link
                    href={`/gallery/${event.slug}`}
                    className="inline-block px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md text-center transition-colors duration-200 mx-auto"
                  >
                    Click to View
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

