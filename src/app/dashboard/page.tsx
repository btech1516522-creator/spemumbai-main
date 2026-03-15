'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'

// Stagger variants for the graph grid
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function Dashboard() {
  const [selectedGraph, setSelectedGraph] = useState<number | null>(null)

  const graphs = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `/images/dashboard/graph${i + 1}.jpg`,
    alt: `Performance Graph ${i + 1}`,
    metric: `Metric ${String.fromCharCode(65 + i)}` // Fake metric name (Metric A, B, etc.)
  }))

  const handleGraphClick = (id: number) => {
    setSelectedGraph(selectedGraph === id ? null : id)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#081428] text-white selection:bg-sky-500/30">
      
      <Navigation />

      <main className="flex-grow pt-20">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-sky-900/20">
          
          {/* Background Gradients & Dot Grid */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1d3a] via-[#153c66] to-[#0a1d3a]" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

          {/* Glows */}
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-cyan-400/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="container-custom relative z-10 px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase text-sky-400">
                  Live Analytics
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-white">
                Performance <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">
                  Dashboard
                </span>
              </h1>

              <p className="text-lg text-sky-100/70 max-w-2xl font-light leading-relaxed">
                Explore key performance metrics, membership trends, and engagement analytics for the SPE Mumbai Section in real-time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* GRAPH GRID */}
        <section className="py-20 relative bg-[#081428]">
          <div className="container-custom px-6 mx-auto">
            
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Metrics Overview
              </h2>
            </div>

            <motion.div 
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {graphs.map((graph) => {
                const isSelected = selectedGraph === graph.id;
                
                return (
                  <motion.div
                    key={graph.id}
                    variants={cardVariants}
                    layout
                    onClick={() => handleGraphClick(graph.id)}
                    whileHover={!isSelected ? { y: -5 } : {}}
                    transition={{ layout: { type: "spring", bounce: 0.2, duration: 0.6 } }}
                    className={`
                      group cursor-pointer rounded-2xl overflow-hidden
                      backdrop-blur-xl bg-white/[0.02]
                      border transition-all duration-300
                      ${isSelected 
                        ? 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2 border-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.15)] bg-white/[0.04]' 
                        : 'border-white/[0.08] hover:border-sky-400/30 hover:bg-white/[0.04] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                      }
                    `}
                  >
                    {/* Graph Header */}
                    <motion.div layout="position" className="p-5 flex justify-between items-center border-b border-white/[0.05]">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-sky-400/70 uppercase block mb-1">
                          {graph.metric}
                        </span>
                        <h3 className="font-semibold text-sky-100 group-hover:text-sky-300 transition-colors">
                          {graph.alt}
                        </h3>
                      </div>
                      
                      {/* Interactive Icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-sky-500/20 text-sky-400' : 'bg-white/5 text-white/40 group-hover:bg-sky-500/20 group-hover:text-sky-400'}`}>
                        {isSelected ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        )}
                      </div>
                    </motion.div>

                    {/* Image Container */}
                    <motion.div layout="position" className={`relative w-full ${isSelected ? 'h-[400px] md:h-[500px]' : 'aspect-video'}`}>
                      {/* Skeleton Background before image loads */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent animate-pulse" />
                      
                      <Image
                        src={graph.src}
                        alt={graph.alt}
                        fill
                        className="object-contain p-4 drop-shadow-2xl z-10"
                      />
                    </motion.div>

                    {/* Expanded Description */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-4" />
                          <p className="text-sm text-sky-100/60 leading-relaxed max-w-3xl">
                            Detailed view active. This visualization highlights important performance indicators and historical data trends for SPE Mumbai. Click the close icon above to minimize.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ANALYSIS SECTION */}
        <section className="py-24 relative overflow-hidden bg-[#081428]">
          {/* subtle separator line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

          <div className="container-custom px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Data-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Analysis</span>
              </h2>
              
              <div className="space-y-5 text-sky-100/70 font-light text-lg leading-relaxed">
                <p>
                  The performance metrics displayed above provide granular insights into the SPE Mumbai Section’s ongoing activities and long-term growth trajectories.
                </p>
                <p>
                  Our dashboard aggregates information across multiple touchpoints, including membership statistics, event participation rates, and direct industry engagement metrics.
                </p>
                <p>
                  By leveraging these analytics, we continuously optimize our programs, maximize member engagement, and actively support the professional development of our energy community.
                </p>
              </div>
            </motion.div>

            {/* Premium Insights Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Back glow */}
              <div className="absolute inset-0 bg-sky-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="
                relative z-10
                backdrop-blur-xl bg-white/[0.03]
                border border-white/[0.08] border-t-white/[0.15]
                p-8 md:p-10 rounded-[2rem]
                shadow-[0_20px_40px_rgba(0,0,0,0.4)]
              ">
                <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Key Insights
                </h3>

                <ul className="space-y-6 text-sky-100/80">
                  {[
                    { text: "Membership growth increased significantly among engineering students.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                    { text: "Technical workshops maintain an over 90% member satisfaction rate.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { text: "Digital engagement continues to compound across social platforms.", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
                    { text: "Industry collaboration has expanded post-graduate opportunities.", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-[15px] leading-relaxed pt-1">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}