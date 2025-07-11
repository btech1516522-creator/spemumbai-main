'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import FeaturedEvents from '@/components/sections/FeaturedEvents'
import Link from 'next/link'

export default function Events() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-spe-navy text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
            Discover What’s Next
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
           Explore upcoming conferences, workshops, and networking sessions designed to fuel innovation and connect energy professionals across industries.
          </p>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="section-padding bg-[#eaf2fb]">
        <div className="container-custom">
          <FeaturedEvents showAll={true} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
