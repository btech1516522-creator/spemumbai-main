'use client'

import { useState, useEffect } from 'react'
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
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { getFileUrl } from '@/lib/storageConfig'

type StudentChapter = {
  id: string
  name: string
  university: string
  location: string
  established: string
  description: string
  website?: string
  image?: string
  achievements: string[] | string
  activities: string[] | string
  leadership: Array<{ position: string; name: string }> | string
  active?: boolean
}

export default function Students() {
  const [chapters, setChapters] = useState<StudentChapter[]>([])
  const [activeChapter, setActiveChapter] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch('/api/content?type=students')
        const data = await res.json()
        if (Array.isArray(data)) {
          const parsed = data
            .filter((ch: { active?: boolean }) => ch.active ?? true)
            .map((ch) => ({
              ...ch,
              achievements: typeof ch.achievements === 'string' ? JSON.parse(ch.achievements) : ch.achievements,
              activities: typeof ch.activities === 'string' ? JSON.parse(ch.activities) : ch.activities,
              leadership: typeof ch.leadership === 'string' ? JSON.parse(ch.leadership) : ch.leadership,
            }))
          setChapters(parsed)
          if (parsed.length > 0) {
            setActiveChapter(parsed[0].id)
          }
        }
      } catch (error) {
        console.error('Failed to fetch student chapters:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChapters()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-spe-navy mb-4"></div>
            <p className="text-spe-gray-600">Loading student chapters...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const currentChapter = chapters.find((ch) => ch.id === activeChapter)

  const parseArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    }
    return []
  }

  const parseLeadership = (value: unknown): Array<{ position: string; name: string }> => {
    if (Array.isArray(value)) return value as Array<{ position: string; name: string }>
    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    }
    return []
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-r from-spe-navy to-spe-blue py-14 text-white">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white drop-shadow-lg">Student Chapters</h1>
              <p className="text-base md:text-lg text-blue-100 max-w-3xl">
                SPE Mumbai Section is proud to support student chapters that nurture the next generation of petroleum engineers and geoscientists.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-[#e4edf7]">
          <div className="container-custom">
            {chapters.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-spe-gray-600 text-lg">No student chapters available at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-spe-gray-50 rounded-xl p-4 border border-spe-gray-200">
                    <h3 className="font-bold text-spe-navy mb-4 text-lg">Chapters</h3>
                    <div className="space-y-2">
                      {chapters.map((chapter) => (
                        <button
                          key={chapter.id}
                          onClick={() => setActiveChapter(chapter.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all text-sm ${
                            activeChapter === chapter.id
                              ? 'bg-spe-navy text-white'
                              : 'text-spe-gray-700 hover:bg-spe-gray-100'
                          }`}
                        >
                          {chapter.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  {currentChapter && (
                    <motion.div
                      key={currentChapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-8">
                        {currentChapter.image && (
                          <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                            <Image src={getFileUrl(currentChapter.image)} alt={currentChapter.name} fill className="object-cover" />
                          </div>
                        )}
                        <h2 className="text-3xl font-bold text-spe-navy mb-2">{currentChapter.name}</h2>
                        <div className="flex flex-wrap gap-4 text-spe-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <BuildingLibraryIcon className="w-5 h-5" />
                            <span>{currentChapter.university}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AcademicCapIcon className="w-5 h-5" />
                            <span>{currentChapter.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5" />
                            <span>Established {currentChapter.established}</span>
                          </div>
                        </div>
                        <p className="text-spe-gray-700 text-base leading-relaxed">{currentChapter.description}</p>

                        {currentChapter.website && (
                          <a
                            href={currentChapter.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 px-6 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-blue transition font-semibold"
                          >
                            Visit Website {'=>'}
                          </a>
                        )}
                      </div>

                      {parseArray(currentChapter.achievements).length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-spe-navy mb-4 flex items-center gap-2">
                            <BookOpenIcon className="w-6 h-6" />
                            Achievements
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {parseArray(currentChapter.achievements).map((achievement, index) => (
                              <li key={index} className="flex gap-3">
                                <span className="text-spe-navy font-bold flex-shrink-0">✓</span>
                                <span className="text-spe-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {parseArray(currentChapter.activities).length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-spe-navy mb-4 flex items-center gap-2">
                            <BriefcaseIcon className="w-6 h-6" />
                            Activities
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {parseArray(currentChapter.activities).map((activity, index) => (
                              <li key={index} className="flex gap-3">
                                <span className="text-spe-navy font-bold flex-shrink-0">{'->'}</span>
                                <span className="text-spe-gray-700">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {parseLeadership(currentChapter.leadership).length > 0 && (
                        <div>
                          <h3 className="text-2xl font-bold text-spe-navy mb-4 flex items-center gap-2">
                            <UserCircleIcon className="w-6 h-6" />
                            Leadership
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {parseLeadership(currentChapter.leadership).map((leader, index) => (
                              <div key={index} className="bg-spe-gray-50 p-4 rounded-lg border border-spe-gray-200">
                                <p className="font-semibold text-spe-navy">{leader.position}</p>
                                <p className="text-spe-gray-700">{leader.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
