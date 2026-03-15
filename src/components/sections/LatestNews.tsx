'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

const newsItems = [
  {
    id: 1,
    title: 'A Night of Insights & Celebrations!',
    date: '03 months ago',
    excerpt: "SPE Mumbai Section had the privilege of hosting a Distinguished Lecture by Ryosuke (Rio) Yokote from Eni Australia on \"Well Dynamic Simulation.\" The session provided a fascinating dive into how simulations enhance well operations, making them safer and more efficient.",
    image: '/images/news/news1.jpeg',
    slug: '/news/a-night-of-insights-and-celebrations'
  },
  {
    id: 2,
    title: '#TechConnect: An Engaging & Impactful Session!',
    date: '29 January 2025',
    excerpt: 'SPE Mumbai Section Monthly TechConnect, held on 29th January 2025 at Trident, BKC, involved intense and deep discussions on key industry topics.',
    image: '/images/news/news2.jpeg',
    slug: '/news/tech-connect-an-engaging-and-impactful-session'
  },
  {
    id: 3,
    title: '#TechConnect Session with TGT Diagnostics',
    date: '06 months ago',
    excerpt: 'We had an insightful TechConnect session on Through-Barrier Diagnostics for Wells and Reservoirs, presented by Remke Ellis, Subject Matter Expert from TGT Diagnostics.',
    image: '/images/news/news3.jpeg',
    slug: '/news/tech-connect-session-with-tgt-diagnostics'
  }
]

export default function LatestNews() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-[#020617] via-[#021024] to-[#020617] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14"
        >
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-400/25 mb-3">News</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Latest News</h2>
            <p className="text-sky-100/70 max-w-xl">
              Stay updated with the latest news, events, and announcements from SPE Mumbai Section
            </p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center mt-4 md:mt-0 text-sky-300 font-semibold hover:text-cyan-300 transition-colors duration-300"
          >
            View all news
            <ArrowRightIcon className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl hover:bg-white/[0.05] hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] transition-all duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-sky-200/65 text-xs font-medium mb-3">
                  <CalendarDaysIcon className="h-3.5 w-3.5" />
                  {item.date}
                </div>
                <h3 className="text-lg font-bold text-sky-100 mb-3 line-clamp-2 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sky-100/65 mb-4 text-sm line-clamp-3 leading-relaxed flex-1">
                  {item.excerpt}
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center text-sky-300 font-semibold text-sm hover:text-cyan-300 transition-colors duration-300 group/link"
                >
                  Read more
                  <ArrowRightIcon className="h-3.5 w-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
