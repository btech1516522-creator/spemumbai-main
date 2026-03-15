'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
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
    
    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 5000)
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  // Determine if office is currently open (IST Timezone roughly)
  const isOfficeOpen = new Date().getHours() >= 9 && new Date().getHours() < 17 && new Date().getDay() !== 0 && new Date().getDay() !== 6;

  return (
    <div className="min-h-screen flex flex-col bg-[#081428] text-white selection:bg-sky-500/30">
      <Navigation />
      
      <main className="flex-grow pt-20">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
          {/* Background Gradients & Grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3a] via-[#153c66] to-[#0a1d3a]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Glow Lights */}
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container-custom relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto flex flex-col items-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-300 border border-sky-400/30 rounded-full text-xs font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                Get In Touch
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                Let's Start a
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text mt-2">
                  Conversation
                </span>
              </h1>

              <p className="text-lg md:text-xl text-sky-100/70 leading-relaxed font-light">
                Have questions or want to get involved? Reach out to the SPE Mumbai Section. We're here to help and connect with our community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTACT CONTENT */}
        <section className="py-20 relative bg-[#081428]">
          {/* Subtle separator line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

          <div className="container-custom mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
              
              {/* CONTACT INFORMATION */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Contact Info</h2>
                  <p className="text-sky-100/60 font-light">Reach out to us directly through these channels.</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: EnvelopeIcon, title: "Email", value: "info@spemumbai.org", link: "mailto:info@spemumbai.org" },
                    { icon: PhoneIcon, title: "Phone", value: "+91 22 1234 5678", link: "tel:+912212345678" },
                  ].map((item, i) => (
                    <motion.a 
                      href={item.link}
                      key={i}
                      variants={fadeUp}
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.04)" }}
                      className="flex items-center p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] transition-all duration-300 group"
                    >
                      <div className="bg-sky-500/10 border border-sky-500/20 p-3 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6 text-sky-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-sky-100/60 mb-1">{item.title}</h3>
                        <p className="text-lg text-white group-hover:text-sky-300 transition-colors">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}

                  <motion.div 
                    variants={fadeUp}
                    className="flex items-start p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
                  >
                    <div className="bg-sky-500/10 border border-sky-500/20 p-3 rounded-xl mr-5">
                      <MapPinIcon className="h-6 w-6 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-sky-100/60 mb-1">Address</h3>
                      <p className="text-white leading-relaxed">
                        SPE Mumbai Section<br />
                        123 Energy Road, Bandra Kurla Complex<br />
                        Mumbai, Maharashtra 400051<br />
                        India
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Office Hours Status Card */}
                <motion.div variants={fadeUp} className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Office Hours</h3>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1]">
                      <span className="relative flex h-2 w-2">
                        {isOfficeOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isOfficeOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      </span>
                      <span className="text-xs font-medium text-sky-100/80 uppercase tracking-wider">
                        {isOfficeOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sky-100/60 font-light">
                    <div className="flex justify-between"><span>Mon - Fri</span><span className="text-white">9:00 AM - 5:00 PM (IST)</span></div>
                    <div className="flex justify-between"><span>Sat - Sun</span><span className="text-white">Closed</span></div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* CONTACT FORM */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7"
              >
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] border-t-white/[0.15] p-8 md:p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <h2 className="text-2xl font-bold mb-8 text-white">Send a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-sky-100/80 pl-1">Name</label>
                        <input
                          id="name" name="name" type="text" required
                          value={formData.name} onChange={handleChange}
                          placeholder="Jane Doe"
                          className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-sky-100/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-sky-100/80 pl-1">Email</label>
                        <input
                          id="email" name="email" type="email" required
                          value={formData.email} onChange={handleChange}
                          placeholder="jane@company.com"
                          className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-sky-100/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-sky-100/80 pl-1">Subject</label>
                      <select
                        id="subject" name="subject" required
                        value={formData.subject} onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 focus:bg-white/[0.05] transition-all appearance-none"
                        style={{ colorScheme: 'dark' }} // Helps native dropdown match dark mode
                      >
                        <option value="" disabled className="bg-[#14335a] text-sky-100/60">Select a topic</option>
                        <option value="General Inquiry" className="bg-[#14335a]">General Inquiry</option>
                        <option value="Membership" className="bg-[#14335a]">Membership</option>
                        <option value="Events" className="bg-[#14335a]">Events</option>
                        <option value="Sponsorship" className="bg-[#14335a]">Sponsorship</option>
                        <option value="Other" className="bg-[#14335a]">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-sky-100/80 pl-1">Message</label>
                      <textarea
                        id="message" name="message" rows={5} required
                        value={formData.message} onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-sky-100/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 focus:bg-white/[0.05] transition-all resize-none"
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="group relative w-full flex justify-center py-4 px-8 border border-transparent rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-[#081428] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {formStatus === 'idle' && 'Send Message'}
                          {formStatus === 'submitting' && (
                            <>
                              <ArrowPathIcon className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          )}
                          {formStatus === 'success' && 'Sent Successfully'}
                          {formStatus === 'error' && 'Try Again'}
                        </span>
                      </button>
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence mode="wait">
                      {formStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        >
                          <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">Your message has been sent successfully! We'll be in touch soon.</p>
                        </motion.div>
                      )}
                      
                      {formStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400"
                        >
                          <XCircleIcon className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">There was an error sending your message. Please try again later.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* HIGH-TECH MAP SECTION */}
        <section className="py-24 bg-[#081428] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="container-custom mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Our Headquarters</h2>
              <p className="text-sky-100/60 font-light max-w-xl mx-auto">Located in the heart of Mumbai's business district.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[21/9] w-full max-w-6xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.1)] border border-white/[0.1] group"
            >
              {/* Note: For actual implementation, embed a Google Maps iframe here and use 'Snazzy Maps' to apply a dark theme to it */}
              <div className="absolute inset-0 bg-[#14335a] flex flex-col items-center justify-center p-8 text-center transition-transform duration-700 group-hover:scale-105">
                <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-20"></span>
                  <MapPinIcon className="w-8 h-8 text-sky-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">SPE Mumbai Headquarters</h3>
                <p className="text-sky-100/60">123 Energy Road, Bandra Kurla Complex</p>
                
                {/* Simulated map graphic overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#14335a_100%),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PG1hc2sgaWQ9Im0iPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzOGJkZjgzMyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG1hc2s9InVybCgjbSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}