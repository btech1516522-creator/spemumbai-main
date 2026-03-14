'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type FaqItem = {
  question: string
  answer: string
  category: string
}

const defaultFaqItems: FaqItem[] = [
  {
    question: 'What is SPE?',
    answer: 'The Society of Petroleum Engineers (SPE) is a not-for-profit professional association whose members are engaged in energy resources development and production.',
    category: 'general',
  },
  {
    question: 'How do I become a member of SPE?',
    answer: 'You can become a member of SPE by visiting the SPE International website and completing the membership application.',
    category: 'membership',
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [faqItems, setFaqItems] = useState<FaqItem[]>(defaultFaqItems)
  const [loading, setLoading] = useState(true)
  
  const toggleItem = (question: string) => {
    setOpenItems(prev => 
      prev.includes(question) 
        ? prev.filter(item => item !== question) 
        : [...prev, question]
    )
  }

  useEffect(() => {
    fetch('/api/content?type=faqItems')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load FAQs')
        }

        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqItems(data)
        }
      })
      .catch(() => {
        setFaqItems(defaultFaqItems)
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = [
    { id: 'all', name: 'All Questions' },
    ...Array.from(new Set(faqItems.map((item) => item.category.trim()).filter(Boolean))).map((category) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
    })),
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
              {loading && <p className="text-sm text-spe-gray-500 mb-3">Loading latest FAQ items...</p>}
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
                  key={`${faq.category}-${faq.question}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.question)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                  >
                    <span className="font-medium text-spe-navy">{faq.question}</span>
                    <ChevronDownIcon 
                      className={`h-5 w-5 text-spe-blue transition-transform duration-300 ${
                        openItems.includes(faq.question) ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {openItems.includes(faq.question) && (
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