'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon, 
  UsersIcon, 
  BookOpenIcon, 
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

type StudentChapter = {
  id: string
  name: string
  university: string
  location: string
  established: string
  description: string
  website: string
  image: string
  achievements: string[]
  activities: string[]
  leadership: {
    position: string
    name: string
  }[]
}

export default function Students() {
  const [activeChapter, setActiveChapter] = useState('iitb')
  
  const studentChapters: StudentChapter[] = [
    {
      id: 'iitb',
      name: 'IIT Bombay Student Chapter',
      university: 'Indian Institute of Technology Bombay',
      location: 'Mumbai, Maharashtra',
      established: '2013',
      description: 'The IITB student chapter was started in 2013 and focuses on technical knowledge dissemination concerning exploration, development, and production of oil and gas resources. The chapter celebrates its annual day with seminars, group activities, and quiz competitions.',
      website: 'https://www.geos.iitb.ac.in/index.php/spe/',
      image: '/images/placeholder-logo.png',
      achievements: [
        'Regularly organizes technical seminars and workshops',
        'Conducts intercollege quiz competitions like PETROGNOSIS',
        'Hosts industry professionals for guest lectures',
        'Provides networking opportunities with industry experts'
      ],
      activities: [
        'Seminar on "Introduction to Unconventional Shale Gas Drilling and Production"',
        'PETROGNOSIS v.1 Intercollege Quiz Competition',
        'Seminar on "Evolution of oil industry and current challenges"',
        'Industry counseling sessions by professionals',
        'Annual day celebrations with technical presentations'
      ],
      leadership: [
        { position: 'President', name: 'Kairabi Ghosh' },
        { position: 'Vice President', name: 'Kumari Anjali' },
        { position: 'Secretary', name: 'Joydeep Deb' },
        { position: 'Treasurer', name: 'Soumyajit Basak' }
      ]
    },
    {
      id: 'mitwpu',
      name: 'MIT-World Peace University Chapter',
      university: 'MIT-World Peace University',
      location: 'Pune, Maharashtra',
      established: '1988',
      description: 'Established in 1988, the MIT-WPU chapter has a long history of excellence in petroleum education. It has consistently received recognition for outstanding performance, earning the Student Chapter Excellence Award for multiple consecutive years (2019-2023) and other prestigious accolades from SPE International.',
      website: 'https://www.spe.org/en/chapter/5684/',
      image: '/images/placeholder-logo.png',
      achievements: [
        'Student Chapter Excellence Award (2019-2023)',
        'Outstanding Student Chapter (2014-2015)',
        'Gold Standard Chapter (2011, 2013)',
        'Consistently recognized among top SPE student chapters worldwide',
        'Strong record of student leadership development'
      ],
      activities: [
        'Technical workshops and seminars on petroleum engineering topics',
        'Industry-academia collaboration initiatives',
        'Field trips to petroleum facilities and operational sites',
        'Career development events and professional networking sessions',
        'Participation in SPE international competitions and events',
        'Annual technical symposiums featuring industry experts'
      ],
      leadership: [
        { position: 'President', name: 'Vatsal Arya' },
        { position: 'Vice President', name: 'Prasad Sandeep Tajanpure' },
        { position: 'Program Chairperson', name: 'Keshav Sharma' },
        { position: 'Secretary', name: 'Yash Mahavir Nirmal' },
        { position: 'Faculty Advisor', name: 'Professor Samarth Dilip Patwardhan' }
      ]
    },
    {
      id: 'wadia',
      name: 'Nowrosjee Wadia College Student Chapter',
      university: 'Nowrosjee Wadia College',
      location: 'Pune, Maharashtra',
      established: '2015',
      description: 'Established on January 26, 2015, the Nowrosjee Wadia College Student Chapter is affiliated with the SPE Mumbai Section. The Department of Geology & Petroleum Technology hosts this active student chapter, focusing on bridging academic knowledge with industry practices. The chapter has received multiple awards including the prestigious Presidential Award for Outstanding Student Chapter, demonstrating its excellence in petroleum engineering education and activities.',
      website: 'https://petrotechwadia.in/spe-chapter/',
      image: '/images/placeholder-logo.png',
      achievements: [
        'Student Chapter Excellence Award (2023)',
        'Presidential Award for Outstanding Student Chapter (2022)',
        'Student Chapter Excellence Award (2021)',
        'Organizes the Annual Exhibition showcasing petroleum technology innovations',
        'Conducts industry talks and skills workshops for student development',
        'Arranges field excursions and industrial visits for practical learning'
      ],
      activities: [
        'Annual Exhibition - Showcasing student projects and industry innovations',
        'Invited talks from industry experts on current petroleum technology trends',
        'Geological field work and industrial visits to operational sites',
        'Skills development workshops on technical and soft skills',
        'Social responsibility initiatives connecting petroleum industry with community needs',
        'Technical workshops on specialized petroleum technology topics'
      ],
      leadership: [
        { position: 'President', name: 'Bhumika Chavan' },
        { position: 'Vice President', name: 'Sakshi Bandgar' },
        { position: 'Secretary', name: 'Gajanan Shrikant Atkar' },
        { position: 'Treasurer', name: 'Sambit Sangram Padhi' },
        { position: 'Communications Chair', name: 'Sakshi Koli' },
        { position: 'Program Chair', name: 'Shravani Pramod Khopikar' },
        { position: 'Social Activities Chair', name: 'Anumol C. S.' },
        { position: 'Faculty Advisor', name: 'Sagar Mahendra Thakurdas' }
      ]
    }
  ]

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
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Student Chapters</h1>
              <p className="text-base md:text-lg text-spe-gray-200 max-w-3xl">
                SPE Mumbai Section is proud to support student chapters that nurture the next generation of petroleum engineers and geoscientists. These chapters serve as incubators for future industry leaders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Student Overview */}
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
                Empowering Students in Energy Education
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-700 mb-8"
              >
                Student chapters are vital components of SPE, providing students with opportunities to enhance their technical knowledge, develop leadership skills, and connect with industry professionals. SPE Mumbai Section supports several student chapters across Maharashtra, each contributing uniquely to the advancement of petroleum education.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              >
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <AcademicCapIcon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Educational Growth</h3>
                  <p className="text-gray-600">Access to technical resources, journals, and research materials to enhance academic learning</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <UsersIcon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Networking</h3>
                  <p className="text-gray-600">Opportunities to connect with industry professionals, alumni, and peers from other institutions</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <BookOpenIcon className="h-12 w-12 text-spe-blue mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">Leadership Development</h3>
                  <p className="text-gray-600">Roles and responsibilities that foster leadership, teamwork, and organizational skills</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Student Chapters */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-spe-navy mb-4">Our Student Chapters</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Explore our affiliated student chapters and learn about their activities, achievements, and contributions to petroleum education.
              </p>
            </motion.div>

            {/* Chapter Selection Tabs */}
            <div className="mb-10">
              <div className="flex flex-wrap justify-center gap-4">
                {studentChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeChapter === chapter.id
                        ? 'bg-spe-blue text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {chapter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Details */}
            {studentChapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeChapter === chapter.id ? 1 : 0,
                  display: activeChapter === chapter.id ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Image and Basic Info */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 w-full mb-6 bg-gray-100 rounded-lg overflow-hidden">
                        <Image 
                          src={chapter.image} 
                          alt={`${chapter.name} Logo`} 
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <BuildingLibraryIcon className="h-5 w-5 text-spe-blue mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">University</h4>
                            <p className="text-sm text-gray-600">{chapter.university}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CalendarIcon className="h-5 w-5 text-spe-blue mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">Established</h4>
                            <p className="text-sm text-gray-600">{chapter.established}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <BriefcaseIcon className="h-5 w-5 text-spe-blue mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">Location</h4>
                            <p className="text-sm text-gray-600">{chapter.location}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <a 
                            href={chapter.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 border border-spe-blue rounded-md shadow-sm text-sm font-medium text-spe-blue bg-white hover:bg-spe-blue hover:text-white transition-colors duration-300 w-full"
                          >
                            Visit Chapter Website
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column: Description, Achievements, Activities */}
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold text-spe-navy mb-4">{chapter.name}</h3>
                      <p className="text-gray-700 mb-6">{chapter.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-spe-navy mb-3 flex items-center">
                            <UsersIcon className="h-5 w-5 mr-2 text-spe-blue" />
                            Notable Achievements
                          </h4>
                          <ul className="space-y-2">
                            {chapter.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-spe-blue mr-2">•</span>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-spe-navy mb-3 flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-spe-blue" />
                            Recent Activities
                          </h4>
                          <ul className="space-y-2">
                            {chapter.activities.map((activity, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-spe-blue mr-2">•</span>
                                <span className="text-gray-700">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Leadership Section */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-spe-navy mb-4 flex items-center">
                          <UserCircleIcon className="h-5 w-5 mr-2 text-spe-blue" />
                          Chapter Leadership
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {chapter.leadership.map((leader, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md">
                              <p className="font-medium text-spe-navy">{leader.name}</p>
                              <p className="text-sm text-gray-600">{leader.position}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Join a Chapter CTA */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-spe-navy mb-4">Join a Student Chapter</h2>
              <p className="text-gray-700 mb-6">
                Are you a student interested in petroleum engineering or related fields? Joining an SPE student chapter opens doors to valuable resources, networking opportunities, and professional development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://www.spe.org/en/join/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-spe-blue text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Become a Member
                </a>
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-3 border border-spe-blue text-spe-blue font-medium rounded-md hover:bg-spe-blue hover:text-white transition-colors duration-300"
                >
                  Contact Us
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