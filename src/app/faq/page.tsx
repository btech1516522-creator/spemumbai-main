'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type FaqItem = {
  question: string
  answer: string
  category: string
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) 
        : [...prev, index]
    )
  }

  const faqItems: FaqItem[] = [
    {
      question: "What is SPE?",
      answer: "The Society of Petroleum Engineers (SPE) is a not-for-profit professional association whose members are engaged in energy resources development and production. SPE serves more than 156,000 members in 154 countries worldwide. SPE is a key resource for technical knowledge related to the oil and gas exploration and production industry and provides services through its publications, events, training courses, and online resources.",
      category: "general"
    },
    {
      question: "What does the SPE Mumbai Section do?",
      answer: "The SPE Mumbai Section serves energy professionals in the Mumbai area by offering technical knowledge sharing, networking opportunities, and professional development resources. We organize technical talks, workshops, conferences, and social events to facilitate knowledge exchange and build connections among industry professionals.",
      category: "general"
    },
    {
      question: "How do I become a member of SPE?",
      answer: "You can become a member of SPE by visiting the SPE International website (www.spe.org/join) and completing the membership application. There are different membership categories including professional, student, and corporate memberships. As a member, you'll automatically be affiliated with the SPE Mumbai Section if you're located in this area.",
      category: "membership"
    },
    {
      question: "What are the benefits of joining SPE?",
      answer: "SPE membership offers numerous benefits including access to technical resources, publications, and journals; discounted registration for SPE events; networking opportunities with industry professionals; access to SPE Connect for online discussions; professional development resources; and leadership opportunities within the section and at the international level.",
      category: "membership"
    },
    {
      question: "How can my company sponsor SPE Mumbai events?",
      answer: "Companies interested in sponsoring SPE Mumbai events can contact our sponsorship committee at sponsorship@spemumbai.org. We offer various sponsorship packages for different events, including technical sessions, workshops, and our annual conference. Sponsorship provides valuable exposure to industry professionals and demonstrates your company's support for technical knowledge sharing and professional development.",
      category: "sponsors"
    },
    {
      question: "When and where are SPE Mumbai Section meetings held?",
      answer: "The SPE Mumbai Section typically holds monthly technical meetings at various venues across Mumbai. The schedule, topics, and locations are announced on our website, through our newsletter, and via email to members. Most technical sessions are held in the evening to accommodate working professionals.",
      category: "events"
    },
    {
      question: "Can non-members attend SPE events?",
      answer: "Yes, most SPE Mumbai Section events are open to non-members, although members often receive discounted registration fees. We encourage non-members to participate in our events to experience the value of SPE before joining as a member.",
      category: "events"
    },
    {
      question: "How can I volunteer with the SPE Mumbai Section?",
      answer: "We welcome volunteers who wish to contribute their time and expertise to the SPE Mumbai Section. You can volunteer by contacting us through the form on our Contact page, specifying your areas of interest. Volunteer opportunities include helping with event organization, serving on committees, mentoring students, and contributing to technical knowledge sharing initiatives.",
      category: "general"
    },
    {
      question: "Are there opportunities for students in SPE Mumbai?",
      answer: "Absolutely! SPE Mumbai strongly supports student involvement through student chapters at local universities, scholarships, mentoring programs, and student-focused events. Students benefit from networking with industry professionals, participating in technical competitions, and accessing career resources. Student membership rates are also significantly discounted.",
      category: "membership"
    },
    {
      question: "How can I access SPE's technical resources?",
      answer: "As an SPE member, you can access technical resources through the SPE website, including SPE papers, journals, webinars, and e-library resources. The SPE Mumbai Section also hosts technical talks and workshops where you can gain knowledge directly from industry experts and fellow professionals.",
      category: "resources"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'membership', name: 'Membership' },
    { id: 'events', name: 'Events' },
    { id: 'sponsors', name: 'Sponsorship' },
    { id: 'resources', name: 'Resources' }
  ]

  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="page-hero relative overflow-hidden">
          <div className="absolute bottom-0 right-[10%] w-64 h-64 bg-blue-400/8 rounded-full blur-[80px]" />
          <div className="container-custom relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="badge-hero text-xs mb-4 inline-block">Help Center</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white tracking-tight">Frequently Asked Questions</h1>
              <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl leading-relaxed">
                Find answers to common questions about SPE Mumbai Section, membership benefits, events, and more.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-[#f0f5ff] to-white">
          <div className="container-custom">
            {/* Category Filter */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-spe-navy mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-spe-navy to-spe-blue-500 text-white shadow-md'
                        : 'bg-white text-spe-gray-600 hover:bg-spe-blue-50 hover:text-spe-blue-500 border border-spe-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-spe-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 text-left bg-white hover:bg-spe-gray-50 transition-colors duration-200 flex justify-between items-center"
                  >
                    <span className="font-semibold text-spe-navy pr-4">{faq.question}</span>
                    <ChevronDownIcon 
                      className={`h-5 w-5 text-spe-blue-500 transition-transform duration-300 flex-shrink-0 ${
                        openItems.includes(index) ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-5 bg-spe-gray-50 text-spe-gray-600 border-t border-spe-gray-100 leading-relaxed"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs found for this category. Please select another category.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="cta-section-dark">
          {/* Animated blobs */}
          <div className="absolute top-0 right-[15%] w-[350px] h-[350px] bg-violet-500/8 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 left-[15%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[100px] animate-blob-delay" />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-400/25"
              style={{ left: `${15 + i * 12}%`, top: `${20 + (i % 3) * 25}%`, width: 3 + (i % 2) * 2, height: 3 + (i % 2) * 2 }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4 + i * 0.6, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="container-custom relative z-10 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="badge-hero text-xs mb-4 inline-block"
              >Need Help?</motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
                Didn&apos;t Find Your{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Answer?</span>
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-violet-500/40 to-blue-400/30 rounded-full -z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                </span>
              </h2>

              <div className="flex items-center justify-center gap-2 mb-5">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-violet-400/60 rounded-full" />
                <div className="w-3 h-3 rounded-full border-2 border-violet-400/60 animate-pulse" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-violet-400/60 rounded-full" />
              </div>

              <p className="text-blue-100/75 mb-10 leading-relaxed text-lg">
                If you couldn&apos;t find the information you were looking for, please don&apos;t hesitate to reach out to us directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-3 rounded-2xl animate-cta-glow opacity-50" />
                  <motion.a
                    href="/contact"
                    className="btn-cta-premium group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </motion.a>
                </div>
                <motion.a
                  href="https://www.spe.org/en/join/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white border border-white/20 bg-white/[0.06] backdrop-blur-sm hover:bg-white/15 hover:border-white/40 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative z-10">Join SPE</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 