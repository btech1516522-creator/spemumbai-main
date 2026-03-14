'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

type ContactContent = {
  heroTitle: string
  heroSubtitle: string
  email: string
  phone: string
  addressLines: string[]
  officeHoursWeekdays: string
  officeHoursWeekends: string
  mapTitle: string
  mapSubtitle: string
}

const defaultContactContent: ContactContent = {
  heroTitle: 'Contact Us',
  heroSubtitle: 'Have questions or want to get involved? Reach out to the SPE Mumbai Section. We are here to help and connect with our community.',
  email: 'info@spemumbai.org',
  phone: '+91 22 1234 5678',
  addressLines: ['SPE Mumbai Section', '123 Energy Road', 'Mumbai, Maharashtra 400001', 'India'],
  officeHoursWeekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
  officeHoursWeekends: 'Saturday - Sunday: Closed',
  mapTitle: 'Find Us',
  mapSubtitle: 'Visit our office in Mumbai',
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [contactContent, setContactContent] = useState<ContactContent>(defaultContactContent)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // This would typically be an API call to your backend
    // For demo purposes, we're just simulating a submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFormStatus('success')
      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 5000)
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  useEffect(() => {
    fetch('/api/content?type=contactContent')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load contact content')
        }

        return res.json()
      })
      .then((data) => {
        setContactContent(data)
      })
      .catch(() => {
        setContactContent(defaultContactContent)
      })
      .finally(() => setLoading(false))
  }, [])

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
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{contactContent.heroTitle}</h1>
              <p className="text-base md:text-lg text-spe-gray-200 max-w-3xl">
                {contactContent.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container-custom">
            {loading && (
              <div className="mb-6 text-sm text-spe-gray-500">Loading latest contact details...</div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-6 text-spe-navy">Get in Touch</h2>
                
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-start"
                  >
                    <div className="bg-spe-blue bg-opacity-10 p-3 rounded-full mr-4">
                      <EnvelopeIcon className="h-6 w-6 text-spe-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-spe-navy">Email</h3>
                      <a href={`mailto:${contactContent.email}`} className="text-gray-600 hover:text-spe-blue transition-colors">
                        {contactContent.email}
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-start"
                  >
                    <div className="bg-spe-blue bg-opacity-10 p-3 rounded-full mr-4">
                      <PhoneIcon className="h-6 w-6 text-spe-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-spe-navy">Phone</h3>
                      <p className="text-gray-600">{contactContent.phone}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="bg-spe-blue bg-opacity-10 p-3 rounded-full mr-4">
                      <MapPinIcon className="h-6 w-6 text-spe-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-spe-navy">Address</h3>
                      <p className="text-gray-600">
                        {contactContent.addressLines.map((line) => (
                          <span key={line}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-lg font-medium mb-4 text-spe-navy">Office Hours</h3>
                  <p className="text-gray-600 mb-2">{contactContent.officeHoursWeekdays}</p>
                  <p className="text-gray-600">{contactContent.officeHoursWeekends}</p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-spe-navy">Send a Message</h2>
                
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spe-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spe-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spe-blue focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership">Membership</option>
                      <option value="Events">Events</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Technical Resources">Technical Resources</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spe-blue focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full px-6 py-3 bg-spe-blue text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-spe-gray-400 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    {formStatus === 'success' && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-green-600 text-sm"
                      >
                        Your message has been sent successfully! We'll get back to you soon.
                      </motion.p>
                    )}
                    
                    {formStatus === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-red-600 text-sm"
                      >
                        There was an error sending your message. Please try again later.
                      </motion.p>
                    )}
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-spe-navy">{contactContent.mapTitle}</h2>
              <p className="text-gray-600 mt-2">{contactContent.mapSubtitle}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-video w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg"
            >
              {/* Placeholder for map - In a production environment, use an actual map component or iframe */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Google Maps would be embedded here.</p>
                {/* For production use something like:
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160572582!2d72.74109861358844!3d19.08219783958339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1615366171340!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy"
                /> */}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 