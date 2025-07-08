'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [selectedGraph, setSelectedGraph] = useState<number | null>(null)

  const graphs = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `/images/dashboard/graph${i + 1}.jpg`,
    alt: `Performance Graph ${i + 1}`
  }))

  const handleGraphClick = (id: number) => {
    setSelectedGraph(selectedGraph === id ? null : id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Hero Section - Made more compact */}
        <section className="bg-gradient-to-r from-spe-navy to-spe-blue py-10 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Performance Dashboard</h1>
              <p className="text-base md:text-lg text-spe-gray-200 max-w-3xl">
                Explore key performance metrics and analytics for the SPE Mumbai Section. 
                These graphs provide insights into our activities, membership growth, and industry trends.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Graphs Grid - Adjusted for better scaling */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-6 text-spe-navy">Performance Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {graphs.map((graph) => (
                <motion.div
                  key={graph.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedGraph === graph.id ? 'col-span-full row-span-2' : ''
                  }`}
                  onClick={() => handleGraphClick(graph.id)}
                  whileHover={{ y: -3, boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}
                  layout
                >
                  <div className={`relative ${
                    selectedGraph === graph.id 
                      ? 'aspect-auto h-[400px] md:h-[500px]' 
                      : 'aspect-[4/3] h-auto'
                  }`}>
                    <Image
                      src={graph.src}
                      alt={graph.alt}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={graph.id <= 3} // Prioritize loading first few images
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-base text-spe-navy">
                      {graph.alt}
                    </h3>
                    {selectedGraph === graph.id && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-sm text-gray-600"
                      >
                        Click to minimize this graph and view others. This visualization shows important metrics related to SPE Mumbai Section's performance and activities.
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Analysis Section - Made more compact and responsive */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-spe-navy">Data Analysis</h2>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  The performance metrics displayed above provide valuable insights into various aspects of the SPE Mumbai Section's operations and impact. These visualizations help us track progress, identify trends, and make data-driven decisions.
                </p>
                <p className="text-gray-700 mb-3 text-sm md:text-base">
                  Our analytics dashboard is regularly updated to reflect the most current information available. The data is collected from various sources including membership records, event attendance, survey responses, and industry reports.
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  By monitoring these key performance indicators, we can better serve our members, optimize our programs, and advance our mission of knowledge sharing and professional development in the petroleum industry.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-spe-navy">Key Insights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-spe-blue text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0 text-xs">1</div>
                    <p className="text-gray-700 text-sm md:text-base">Membership growth has shown a positive trend over the past year, with a notable increase in student and young professional participation.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-spe-blue text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0 text-xs">2</div>
                    <p className="text-gray-700 text-sm md:text-base">Technical events and workshops have consistently received high satisfaction ratings, with over 90% of attendees reporting valuable learning outcomes.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-spe-blue text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0 text-xs">3</div>
                    <p className="text-gray-700 text-sm md:text-base">Digital engagement metrics show increasing reach and interaction across all online platforms, particularly with technical content and industry updates.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-spe-blue text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0 text-xs">4</div>
                    <p className="text-gray-700 text-sm md:text-base">Collaboration with industry partners has expanded, resulting in more sponsored events and professional development opportunities for members.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 