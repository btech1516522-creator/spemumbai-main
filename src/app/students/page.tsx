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
      image: '/images/student-chapters/bombay.jpeg',
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
        { position: 'President', name: 'Dhananjoy Mandal' },
        { position: 'Vice President', name: 'Naveen' },
        { position: 'General Secretary', name: 'Shiva Rana' },
        { position: 'Treasurer', name: 'Saikat Mandal' },
        { position: 'Faculty Advisor', name: 'Bharath Chandra Shekar' }
      ]
    },
    {
      id: 'mitwpu',
      name: 'MIT-World Peace University Chapter',
      university: 'MIT-World Peace University',
      location: 'Pune, Maharashtra',
      established: '01 Jun 1988',
      description: 'Established in 1988, the MIT-WPU chapter has a long history of excellence in petroleum education. It has consistently received recognition for outstanding performance, earning the Student Chapter Excellence Award for multiple consecutive years (2019-2023) and other prestigious accolades from SPE International.',
      website: 'https://www.spe.org/en/chapter/5684/',
      image: '/images/student-chapters/mit.jpeg',
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
        { position: 'President', name: 'Prasad Sandeep Tajanpure' },
        { position: 'Vice President', name: 'Yash Mahavir Nirmal' },
        { position: 'Program Chairperson', name: 'Rohit Mohan Cherukupalli' },
        { position: 'Secretary', name: 'Deepika Dangi' },
        { position: 'Treasurer', name: 'Samarth Balasaheb Kendre' },
        { position: 'Membership Chairperson', name: 'Anshuman Goswami' },
        { position: 'Social Activities Chair', name: 'Rishi MaheshGhosalkar' },
        { position: 'Faculty Advisor', name: 'Professor Samarth Dilip Patwardhan' }
      ]
    },
    {
      id: 'wadia',
      name: 'Nowrosjee Wadia College Student Chapter',
      university: 'Nowrosjee Wadia College',
      location: 'Pune, Maharashtra',
      established: '26 Jan 2015',
      description: 'Established on January 26, 2015, the Nowrosjee Wadia College Student Chapter is affiliated with the SPE Mumbai Section. The Department of Geology & Petroleum Technology hosts this active student chapter, focusing on bridging academic knowledge with industry practices. The chapter has received multiple awards including the prestigious Presidential Award for Outstanding Student Chapter, demonstrating its excellence in petroleum engineering education and activities.',
      website: 'https://petrotechwadia.in/spe-chapter/',
      image: '/images/student-chapters/wadia_college.jpeg',
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
        { position: 'President', name: 'Shravani Pramod Khopikar' },
        { position: 'Vice President', name: 'Siddhi Anil Gadkerkar' },
        { position: 'Secretary', name: 'Sarvesh Ravindra Jade' },
        { position: 'Treasurer', name: 'Yash Umesh Waghmare' },
        { position: 'Communications Chair', name: 'Bristi Chatterjee' },
        { position: 'Program Chair', name: 'Sohel Alibuddin Shaikh' },
        { position: 'Social Activities Chair', name: 'Kumar Vishnu Samindar' },
        { position: 'Faculty Advisor', name: 'Sagar Mahendra Thakurdas' }
      ]
    },
    {
      id: 'ism',
      name: 'Indian Institute of Technology (ISM), Dhanbad Chapter',
      university: 'Indian Institute of Technology (ISM), Dhanbad',
      location: 'Dhanbad, India',
      established: '01 Mar 1988',
      description: '',
      website: '',
      image: '/images/student-chapters/ism.jpeg',
      achievements: [
        'Presidential Award for Outstanding Student Chapter, Engaging, Retaining, and Growing Membership (2024)',
        'Student Chapter Excellence Award (2023)',
        'Student Chapter Excellence Award (2022)',
        'Gold Standard Chapter (2016)',
        'Outstanding Student Chapter (2015)',
        'Gold Standard Chapter (2013)',
        'Gold Standard Chapter (2012)',
        'Gold Standard Chapter (2011)',
        'Gold Standard Chapter (2010)',
        'Outstanding Student Chapter (2010)'
      ],
      activities: [
      ],
      leadership: [
        { position: 'President', name: 'Shubham Choudhary' },
        { position: 'Vice President', name: 'Kunal Prasad' },
        { position: 'Secretary', name: 'Priyanshu Kumar' },
        { position: 'Treasurer', name: 'Madhur Gupta' },
        { position: 'Communications Chair', name: 'Mohammed Merajuddin Ahmed' },
        { position: 'Program Chair', name: 'Bhumi Periwal' },
        { position: 'Social Activities Chair', name: 'Abhishek Dilip Gavit' },
        { position: 'Faculty Advisor', name: 'Dr. Neetish Kumar Maurya' }
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
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white drop-shadow-lg">
                Student Chapters
              </h1>
              <p className="text-base md:text-lg text-blue-100 max-w-3xl">
                SPE Mumbai Section is proud to support student chapters that nurture the next generation of petroleum engineers and geoscientists. These chapters serve as incubators for future industry leaders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Student Overview */}
        <section className="section-padding bg-[#e4edf7]">
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
        <section className="section-padding bg-[#e4edf7]">
          <div className="container-custom ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-spe-navy mb-4">Our Student Chapters</h2>
              <p className="text-gray-800 max-w-7xl mx-auto">
                Explore our affiliated student chapters and learn about their activities, achievements, and contributions to petroleum education.
              </p>
            </motion.div>

            {/* Chapter Selection Tabs */}
            <div className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center ">
                {studentChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter.id)}
                    className={`px-5 py-2 rounded-full text-base font-semibold transition-colors duration-200 shadow-sm border
                      ${
                        activeChapter === chapter.id
                          ? 'bg-spe-blue text-blue-500 border-spe-blue scale-105 ring-2 ring-spe-blue'
                          : 'bg-white text-spe-navy border-spe-blue/30 hover:bg-blue-50 hover:text-spe-blue'
                      }`}
                    style={{
                      minWidth: '200px',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {chapter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Details */}
            <div>
              {studentChapters.map((chapter) =>
                activeChapter === chapter.id ? (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6 md:p-8 ">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Image and Basic Info */}
                        <div className="md:col-span-1">
                          <div className="relative w-full aspect-square mb-6 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
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
                                <p className="text-sm text-gray-700">{chapter.university}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <CalendarIcon className="h-5 w-5 text-spe-blue mt-0.5 flex-shrink-0" />
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-900">Established</h4>
                                <p className="text-sm text-gray-700">{chapter.established}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <BriefcaseIcon className="h-5 w-5 text-spe-blue mt-0.5 flex-shrink-0" />
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-900">Location</h4>
                                <p className="text-sm text-gray-700">{chapter.location}</p>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <a 
                                href={chapter.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 border border-spe-blue rounded-md shadow-sm text-sm font-medium bg-white text-spe-blue hover:bg-spe-blue focus:bg-spe-blue active:bg-spe-blue transition-colors duration-300 w-full"
                                style={{ color: "#2563eb" }} // text-spe-blue
                              >
                                <span className="font-semibold" style={{ color: "#2563eb" }}>Visit Chapter Website</span>
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
                ) : null
              )}
            </div>
          </div>
        </section>
        
        {/* Join a Chapter CTA */}
        <section className="section-padding bg-[#f0f4fa]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-spe-navy mb-4">Join a Student Chapter</h2>
              <p className="text-gray-800 mb-6">
                Are you a student interested in petroleum engineering or related fields? Joining an SPE student chapter opens doors to valuable resources, networking opportunities, and professional development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://www.spe.org/en/join/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md border border-spe-blue transition-colors duration-300"
                  style={{ backgroundColor: "#2563eb", color: "#fff" }}
                >
                  Become a Member
                </a>
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md border border-spe-blue transition-colors duration-300"
                  style={{ backgroundColor: "#2563eb", color: "#fff" }}
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