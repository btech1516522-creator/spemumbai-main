'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import {
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'

type VolunteerRole = {
  id: string
  title: string
  category: string
  description: string
  responsibilities: string
  timeCommitment: string
  location: string
  teamWork: string
  skills: string
  benefits: string
  active?: boolean
}

export default function Volunteering() {
  const [roles, setRoles] = useState<VolunteerRole[]>([])
  const [activeTab, setActiveTab] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('/api/content?type=volunteering')
        const data = await res.json()
        if (Array.isArray(data)) {
          const activeData = data.filter((r: { active?: boolean }) => r.active ?? true)
          setRoles(activeData)
          const categories = Array.from(new Set(activeData.map((r) => r.category)))
          if (categories.length > 0) {
            setActiveTab(categories[0])
          }
        }
      } catch (error) {
        console.error('Failed to fetch volunteer roles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-spe-navy mb-4"></div>
            <p className="text-spe-gray-600">Loading volunteer opportunities...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const categories = Array.from(new Set(roles.map((r) => r.category)))
  const activeRoles = roles.filter((r) => r.category === activeTab)

  const getCategoryIcon = (category: string) => {
    const iconClass = 'h-6 w-6'
    switch (category) {
      case 'education':
        return <AcademicCapIcon className={iconClass} />
      case 'events':
        return <UserGroupIcon className={iconClass} />
      case 'mentoring':
        return <LightBulbIcon className={iconClass} />
      case 'outreach':
        return <BuildingOffice2Icon className={iconClass} />
      default:
        return <UserGroupIcon className={iconClass} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-r from-spe-navy to-spe-blue py-14 text-white">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white drop-shadow-lg">Volunteering Opportunities</h1>
              <p className="text-base md:text-lg text-blue-100 max-w-3xl">
                Join SPE Mumbai Section as a volunteer and make a meaningful impact in the petroleum engineering community.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-[#e4edf7]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-spe-navy mb-4">Why Volunteer With SPE?</h2>
              <p className="text-gray-800 max-w-3xl mx-auto">
                Volunteering with SPE provides personal growth, professional networking, and meaningful contributions to industry advancement.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Professional Growth', icon: AcademicCapIcon, description: 'Develop new skills and enhance your professional expertise' },
                { title: 'Networking', icon: UserGroupIcon, description: 'Connect with industry professionals and expand your network' },
                { title: 'Make an Impact', icon: LightBulbIcon, description: 'Contribute meaningfully to the petroleum industry' },
                { title: 'Industry Visibility', icon: BuildingOffice2Icon, description: 'Gain recognition among industry peers and leaders' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <item.icon className="h-12 w-12 text-spe-blue mb-3" />
                  <h3 className="text-lg font-semibold text-spe-navy mb-2">{item.title}</h3>
                  <p className="text-spe-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-spe-navy mb-4">Volunteer Roles</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">Explore available volunteer positions and find the right fit.</p>
            </motion.div>

            {roles.length === 0 ? (
              <div className="text-center py-12 bg-spe-gray-50 rounded-lg">
                <p className="text-spe-gray-600 text-lg">No volunteer roles available at this time.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveTab(category)}
                      className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                        activeTab === category
                          ? 'bg-spe-navy text-white'
                          : 'bg-spe-gray-100 text-spe-navy hover:bg-spe-gray-200'
                      }`}
                    >
                      {getCategoryIcon(category)}
                      <span className="capitalize">{category}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeRoles.map((role, index) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-spe-gray-200 rounded-lg hover:shadow-lg transition p-6"
                    >
                      <h3 className="text-xl font-bold text-spe-navy mb-2">{role.title}</h3>
                      <p className="text-spe-gray-600 mb-4">{role.description}</p>

                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-semibold text-spe-navy mb-1">Responsibilities:</p>
                          <p className="text-spe-gray-700">{role.responsibilities}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-spe-navy mb-1">Time Commitment:</p>
                          <p className="text-spe-gray-700">{role.timeCommitment}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-spe-navy mb-1">Location:</p>
                          <p className="text-spe-gray-700">{role.location}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-spe-navy mb-1">Team Work:</p>
                          <p className="text-spe-gray-700">{role.teamWork}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-spe-navy mb-1">Required Skills:</p>
                          <p className="text-spe-gray-700">{role.skills}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-spe-navy mb-1">Benefits:</p>
                          <p className="text-spe-gray-700">{role.benefits}</p>
                        </div>
                      </div>

                      <button className="mt-6 w-full px-4 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-blue transition font-semibold">
                        Get Involved
                      </button>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
