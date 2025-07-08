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
        <section className="bg-gradient-to-r from-spe-navy to-spe-blue py-14 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
              <p className="text-base md:text-lg text-spe-gray-200 max-w-3xl">
                Find answers to common questions about SPE Mumbai Section, membership benefits, events, and more.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {/* Category Filter */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-spe-navy mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeCategory === category.id
                        ? 'bg-spe-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                  >
                    <span className="font-medium text-spe-navy">{faq.question}</span>
                    <ChevronDownIcon 
                      className={`h-5 w-5 text-spe-blue transition-transform duration-300 ${
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
                      className="px-6 py-4 bg-gray-50 text-gray-700"
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
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-spe-navy mb-4">Didn't Find Your Answer?</h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the information you were looking for, please don't hesitate to reach out to us directly.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-spe-blue text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 