'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  LightBulbIcon, 
  BuildingOffice2Icon 
} from '@heroicons/react/24/outline'

type VolunteerRole = {
  title: string
  description: string
  responsibilities: string
  timeCommitment: string
  location: string
  teamWork: string
  skills: string
  benefits: string
}

export default function Volunteering() {
  const [activeTab, setActiveTab] = useState('education')
  
  const volunteerRoles: Record<string, VolunteerRole[]> = {
    education: [
      {
        title: "Schools Career Guidance Volunteer",
        description: "Inspire the next generation by providing inclusive information on energy transition skills and career pathways, guiding students toward positive destinations.",
        responsibilities: "Set up stand materials at career fairs, talk to parents and students about your career journey, energy careers in general, STEM subjects, and educational resources.",
        timeCommitment: "Career fairs usually last for a couple of hours, mostly in the evening although some schools hold them during the day.",
        location: "Various schools and colleges across Mumbai. You choose which events you'd like to attend and provide your own transport.",
        teamWork: "We typically send teams of 2-3 people to each event, so you'll have company!",
        skills: "An ability to talk about yourself and your career, plus a passion for the energy industry and STEM education. We encourage volunteers to become STEM Ambassadors for additional resources and opportunities.",
        benefits: "Satisfaction from inspiring the next generation into engineering and energy careers. Excellent for CPD and fulfilling community aspects of professional membership applications. Improves confidence in public speaking and presentation skills."
      }
    ],
    events: [
      {
        title: "Events Committee Volunteer",
        description: "Help organize and run SPE Mumbai's technical sessions, workshops, networking events, and annual conference.",
        responsibilities: "Support event planning, coordinate with speakers and venues, handle registrations, assist with setup and logistics on event days, gather feedback for future improvements.",
        timeCommitment: "Regular committee meetings (typically monthly), plus additional time before and during events. Can be flexible depending on your availability.",
        location: "Committee meetings at SPE Mumbai office or virtually. Events at various venues across Mumbai.",
        teamWork: "Work as part of the Events Committee team with regular collaboration and task sharing.",
        skills: "Organizational skills, attention to detail, good communication, and a collaborative approach. Industry knowledge is helpful but not essential.",
        benefits: "Develop event management skills, expand your professional network, contribute to knowledge sharing in the industry, gain visibility among industry professionals."
      }
    ],
    communication: [
      {
        title: "Communications & Social Media Volunteer",
        description: "Help maintain SPE Mumbai's online presence and develop content that engages members and promotes our activities.",
        responsibilities: "Create content for social media channels, assist with newsletter production, update website content, photograph events, develop marketing materials.",
        timeCommitment: "Flexible – approximately 3-5 hours per week, with additional time needed during major events or campaigns.",
        location: "Mostly remote work with occasional meetings at the SPE Mumbai office.",
        teamWork: "Collaborate with the Communications Committee and other volunteers to coordinate messaging and content.",
        skills: "Strong writing and communication skills, familiarity with social media platforms, basic design skills helpful but not required, photography skills a plus.",
        benefits: "Build your portfolio, develop digital marketing skills, expand your network, gain visibility for your contributions."
      }
    ],
    mentoring: [
      {
        title: "Student Chapter Mentor",
        description: "Support and guide SPE student chapters at local universities, helping to bridge the gap between academia and industry.",
        responsibilities: "Advise student chapter leaders, give talks or workshops at university events, help students connect with industry professionals, provide guidance on chapter activities and initiatives.",
        timeCommitment: "Monthly meetings with student chapter leaders (in person or virtual), occasional attendance at student events (4-6 per year).",
        location: "Various universities across Mumbai with SPE student chapters.",
        teamWork: "Work closely with student chapter officers and faculty advisors while coordinating with other SPE Mumbai mentors.",
        skills: "Industry experience, good communication and listening skills, ability to relate to students and understand their challenges, willingness to share knowledge.",
        benefits: "Opportunity to guide the next generation of energy professionals, stay connected with academic developments, develop leadership and mentoring skills, build relationships with universities."
      }
    ]
  }

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
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Volunteering</h1>
              <p className="text-base md:text-lg text-spe-gray-200 max-w-3xl">
                Help shape the future of the energy industry by volunteering with SPE Mumbai Section. 
                There are opportunities to match every interest, skill set, and availability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-spe-navy mb-6"
              >
                Welcome to SPE Mumbai Volunteering
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-700 mb-8"
              >
                Our volunteers are the heart and soul of SPE Mumbai Section. Through your contributions, we're able to 
                provide valuable technical knowledge, networking opportunities, and professional development to our 
                members. Volunteering with SPE Mumbai offers you the chance to develop new skills, expand your 
                professional network, and make a meaningful impact on the petroleum engineering community.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
              >
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <UserGroupIcon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Expand Your Network</h3>
                  <p className="text-gray-600">Connect with industry professionals and build meaningful relationships</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <AcademicCapIcon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Develop New Skills</h3>
                  <p className="text-gray-600">Gain valuable experience in leadership, communication, and organization</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <LightBulbIcon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Share Knowledge</h3>
                  <p className="text-gray-600">Contribute to technical excellence within the petroleum engineering community</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <BuildingOffice2Icon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Career Advancement</h3>
                  <p className="text-gray-600">Enhance your resume and professional credibility through volunteer experience</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-spe-navy mb-4">Volunteer Opportunities</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Explore our current volunteer opportunities across different areas. 
                Find a role that matches your interests, skills, and schedule.
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setActiveTab('education')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'education'
                      ? 'bg-spe-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Education & Outreach
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'events'
                      ? 'bg-spe-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Events & Programs
                </button>
                <button
                  onClick={() => setActiveTab('communication')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'communication'
                      ? 'bg-spe-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Communications
                </button>
                <button
                  onClick={() => setActiveTab('mentoring')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'mentoring'
                      ? 'bg-spe-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student Mentoring
                </button>
              </div>
            </div>

            {/* Role Cards */}
            <div className="space-y-6">
              {volunteerRoles[activeTab].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-spe-navy mb-3">{role.title}</h3>
                    <p className="text-gray-700 mb-6">{role.description}</p>
                    
                    <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-spe-navy mb-2">Responsibilities</h4>
                        <p className="text-gray-600 mb-4">{role.responsibilities}</p>
                        
                        <h4 className="text-lg font-semibold text-spe-navy mb-2">Time Commitment</h4>
                        <p className="text-gray-600 mb-4">{role.timeCommitment}</p>
                        
                        <h4 className="text-lg font-semibold text-spe-navy mb-2">Location</h4>
                        <p className="text-gray-600">{role.location}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-spe-navy mb-2">Team Work</h4>
                        <p className="text-gray-600 mb-4">{role.teamWork}</p>
                        
                        <h4 className="text-lg font-semibold text-spe-navy mb-2">Skills Needed</h4>
                        <p className="text-gray-600 mb-4">{role.skills}</p>
                        
                        <h4 className="text-lg font-semibold text-spe-navy mb-2">Benefits to You</h4>
                        <p className="text-gray-600">{role.benefits}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Get Involved CTA */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-spe-navy mb-4">Ready to Get Involved?</h2>
              <p className="text-gray-700 mb-6">
                If you're interested in volunteering with SPE Mumbai Section, we'd love to hear from you! 
                Complete our volunteer interest form or contact us directly to discuss opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-3 bg-spe-blue text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Contact Us
                </a>
                <a 
                  href="mailto:volunteer@spemumbai.org" 
                  className="inline-block px-6 py-3 border border-spe-blue text-spe-blue font-medium rounded-md hover:bg-spe-blue hover:text-white transition-colors duration-300"
                >
                  Email Volunteer Coordinator
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 