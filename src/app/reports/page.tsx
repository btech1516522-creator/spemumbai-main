'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const reports = [
  {
    title: "Trending Stories",
    image: "/images/report/rp.png",
    downloadUrl: "/pdf/Trending-Stories.pdf",
    type: "Industry Insights"
  },
  {
    title: "Spectrum 2025",
    image: "/images/report/rp2025.png",
    downloadUrl: "/pdf/Spectrum-2025.pdf",
    type: "Annual Report"
  },
  {
    title: "Spectrum 2024",
    image: "/images/report/rp2024.png",
    downloadUrl: "/pdf/Spectrum-2024.pdf",
    type: "Annual Report"
  }
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export default function Reports() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#07182f] via-[#0b2a52] to-[#081428] text-white selection:bg-sky-500/30">

      <Navigation />

      <div className="flex-grow pt-20">

        {/* HERO */}
        <section className="relative overflow-hidden pt-28 pb-24">

          {/* background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.05]" />

          <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] bg-cyan-400/20 blur-[180px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/20 blur-[160px] rounded-full" />

          <div className="container-custom relative z-10 mx-auto px-6 text-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7 }}
              className="max-w-3xl mx-auto flex flex-col items-center"
            >

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/15 text-sky-300 border border-sky-400/30 rounded-full text-xs tracking-widest uppercase mb-8 backdrop-blur-md">
                <DocumentTextIcon className="w-4 h-4" />
                Publications
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">

                Industry

                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text mt-2">
                  Reports
                </span>

              </h1>

              <p className="text-lg md:text-xl text-sky-100/70 font-light leading-relaxed">
                Download Spectrum magazines and explore industry insights,
                annual reports, and technical energy publications.
              </p>

            </motion.div>

          </div>
        </section>


        {/* REPORT GRID */}
        <section className="relative py-24 bg-[#081428]">

          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04]" />

          <div className="container-custom mx-auto px-6 relative z-10">

            {/* title */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Publications
              </h2>

              <p className="text-sky-200/60 max-w-xl mx-auto">
                Explore technical magazines and research insights
                published by SPE Mumbai professionals.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
            >

              {reports.map((report, index) => (

                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col bg-white/[0.06] border border-white/[0.15] backdrop-blur-xl rounded-[2rem] p-6 transition-all duration-500 hover:border-sky-400/50 hover:bg-white/[0.08] hover:shadow-[0_25px_60px_rgba(56,189,248,0.25)]"
                >

                  {/* thumbnail */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/10 mb-6">

                    <Image
                      src={report.image}
                      alt={report.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] text-sky-300 uppercase tracking-wider">
                      PDF
                    </div>

                  </div>


                  {/* content */}
                  <div className="flex flex-col flex-grow items-center text-center">

                    <div className="flex items-center gap-2 mb-2 text-sky-400 text-xs">
                      <DocumentTextIcon className="w-4 h-4" />
                      {report.type}
                    </div>

                    <h3 className="text-xl font-bold mb-6 group-hover:text-sky-300 transition">
                      {report.title}
                    </h3>

                    <div className="mt-auto w-full">

                      <a
                        href={report.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm 
                        bg-gradient-to-r from-sky-500/20 to-cyan-400/20 
                        text-sky-200 border border-sky-400/30 
                        hover:from-sky-500 hover:to-cyan-400 
                        hover:text-white 
                        hover:shadow-lg hover:shadow-sky-500/30
                        transition-all duration-300"
                      >

                        <ArrowDownTrayIcon className="w-5 h-5 group-hover:animate-bounce" />

                        Download Report

                      </a>

                    </div>

                  </div>

                </motion.div>

              ))}

            </motion.div>

          </div>

        </section>


        {/* CTA */}
        <section className="py-32 relative overflow-hidden">

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, .2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-sky-500/20 blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2"
          />

          <div className="container-custom relative z-10 mx-auto px-6">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/[0.06] border border-white/[0.15] p-14 md:p-20 rounded-[2.5rem]"
            >

              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-sky-200 border border-white/10 rounded-full text-xs uppercase mb-6">
                <SparklesIcon className="w-3 h-3" />
                Stay Informed
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">

                Access Exclusive

                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mt-2">
                  Research & Insights
                </span>

              </h2>

              <p className="text-sky-100/70 mb-10 text-lg max-w-2xl mx-auto">
                Join SPE Mumbai to gain access to research publications,
                energy insights, and professional resources.
              </p>


              <div className="flex flex-col sm:flex-row justify-center gap-5">

                <motion.a
                  href="https://www.spe.org/en/join/"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: .97 }}
                  className="px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25"
                >
                  Become a Member
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 rounded-2xl border border-sky-400/30 text-sky-300"
                >
                  Contact Us
                </motion.a>

              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-sky-300/60 text-sm flex justify-center gap-4">

                <span className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                  Secure checkout
                </span>

                <span>•</span>

                <span>Free membership for students</span>

              </div>

            </motion.div>

          </div>

        </section>

      </div>

      <Footer />

    </main>
  )
}