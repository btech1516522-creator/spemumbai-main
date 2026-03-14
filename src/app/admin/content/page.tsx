'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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

type FaqItem = {
  question: string
  answer: string
  category: string
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

export default function ContentManagement() {
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [contactContent, setContactContent] = useState<ContactContent>(defaultContactContent)
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])
  const [faqSearch, setFaqSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  const clearSectionErrors = (section: 'hero' | 'contact' | 'faq') => {
    setValidationErrors((prev) => {
      if (!prev[section]) return prev
      const next = { ...prev }
      delete next[section]
      return next
    })
  }

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setHeroTitle(data.heroTitle || '')
        setHeroSubtitle(data.heroSubtitle || '')
        setContactContent(data.contactContent || defaultContactContent)
        setFaqItems(Array.isArray(data.faqItems) ? data.faqItems : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const saveContent = async (type: string, data: unknown, successText: string) => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: successText })
      } else {
        const err = await res.json()
        setMessage({ type: 'error', text: err.error || 'Failed to save' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }
  }

  const updateContactField = (field: keyof ContactContent, value: string | string[]) => {
    clearSectionErrors('contact')
    setContactContent((prev) => ({ ...prev, [field]: value }))
  }

  const updateFaqItem = (index: number, field: keyof FaqItem, value: string) => {
    clearSectionErrors('faq')
    setFaqItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const addFaqItem = () => {
    clearSectionErrors('faq')
    setFaqItems((prev) => [...prev, { question: '', answer: '', category: 'general' }])
  }

  const removeFaqItem = (index: number) => {
    clearSectionErrors('faq')
    setFaqItems((prev) => prev.filter((_, i) => i !== index))
  }

  const validateHeroSection = () => {
    const errors: string[] = []

    if (!heroTitle.trim()) errors.push('Hero title is required.')
    if (!heroSubtitle.trim()) errors.push('Hero subtitle is required.')

    return errors
  }

  const validateContactSection = () => {
    const errors: string[] = []

    if (!contactContent.heroTitle.trim()) errors.push('Contact hero title is required.')
    if (!contactContent.heroSubtitle.trim()) errors.push('Contact hero subtitle is required.')
    if (!contactContent.email.trim()) {
      errors.push('Contact email is required.')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactContent.email.trim())) {
      errors.push('Contact email must be a valid email address.')
    }
    if (!contactContent.phone.trim()) errors.push('Contact phone is required.')
    if (contactContent.addressLines.length === 0) errors.push('At least one address line is required.')
    if (!contactContent.officeHoursWeekdays.trim()) errors.push('Weekday office hours are required.')
    if (!contactContent.officeHoursWeekends.trim()) errors.push('Weekend office hours are required.')
    if (!contactContent.mapTitle.trim()) errors.push('Map title is required.')
    if (!contactContent.mapSubtitle.trim()) errors.push('Map subtitle is required.')

    return errors
  }

  const validateFaqSection = () => {
    const errors: string[] = []

    faqItems.forEach((item, index) => {
      if (!item.question.trim()) errors.push(`FAQ ${index + 1}: question is required.`)
      if (!item.answer.trim()) errors.push(`FAQ ${index + 1}: answer is required.`)
      if (!item.category.trim()) errors.push(`FAQ ${index + 1}: category is required.`)
    })

    return errors
  }

  const handleSaveHero = async () => {
    const errors = validateHeroSection()
    setValidationErrors((prev) => ({ ...prev, hero: errors }))
    if (errors.length > 0) {
      setMessage({ type: 'error', text: errors[0] })
      return
    }

    await saveContent('heroTitle', heroTitle, 'Hero title saved successfully!')
    await saveContent('heroSubtitle', heroSubtitle, 'Hero section saved successfully!')
  }

  const handleSaveContact = async () => {
    const errors = validateContactSection()
    setValidationErrors((prev) => ({ ...prev, contact: errors }))
    if (errors.length > 0) {
      setMessage({ type: 'error', text: errors[0] })
      return
    }

    await saveContent('contactContent', contactContent, 'Contact content saved successfully!')
  }

  const handleSaveFaq = async () => {
    const errors = validateFaqSection()
    setValidationErrors((prev) => ({ ...prev, faq: errors }))
    if (errors.length > 0) {
      setMessage({ type: 'error', text: errors[0] })
      return
    }

    await saveContent('faqItems', faqItems, 'FAQ items saved successfully!')
  }

  const filteredFaqItems = faqItems.filter((item) => {
    const term = faqSearch.trim().toLowerCase()
    if (!term) return true

    return [item.question, item.answer, item.category].some((value) =>
      value.toLowerCase().includes(term)
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-spe-navy border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-spe-navy">Content Management</h1>
        <p className="text-spe-gray-600 mt-1">Edit hero, contact page content, and FAQ entries.</p>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-spe-navy mb-4">Hero Section</h2>
        {validationErrors.hero && validationErrors.hero.length > 0 && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {validationErrors.hero.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Hero Title *</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => {
                clearSectionErrors('hero')
                setHeroTitle(e.target.value)
              }}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
              placeholder="Main headline..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Hero Subtitle *</label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => {
                clearSectionErrors('hero')
                setHeroSubtitle(e.target.value)
              }}
              rows={2}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg text-spe-gray-900 focus:ring-2 focus:ring-spe-navy focus:border-spe-navy"
              placeholder="Sub-headline..."
            />
          </div>
          <button
            onClick={handleSaveHero}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Hero Section'}
          </button>
          <p className="text-xs text-spe-gray-500">* Required fields.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-spe-navy mb-4">Contact Page</h2>
        {validationErrors.contact && validationErrors.contact.length > 0 && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {validationErrors.contact.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Hero Title *</label>
            <input
              type="text"
              value={contactContent.heroTitle}
              onChange={(e) => updateContactField('heroTitle', e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Email *</label>
            <input
              type="text"
              value={contactContent.email}
              onChange={(e) => updateContactField('email', e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Phone *</label>
            <input
              type="text"
              value={contactContent.phone}
              onChange={(e) => updateContactField('phone', e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Map Title *</label>
            <input
              type="text"
              value={contactContent.mapTitle}
              onChange={(e) => updateContactField('mapTitle', e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Hero Subtitle *</label>
          <textarea
            value={contactContent.heroSubtitle}
            onChange={(e) => updateContactField('heroSubtitle', e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Address Lines (one per line) *</label>
          <textarea
            value={contactContent.addressLines.join('\n')}
            onChange={(e) => updateContactField('addressLines', e.target.value.split('\n').filter((line) => line.trim().length > 0))}
            rows={4}
            className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Weekday Office Hours *</label>
            <input
              type="text"
              value={contactContent.officeHoursWeekdays}
              onChange={(e) => updateContactField('officeHoursWeekdays', e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Weekend Office Hours *</label>
            <input
              type="text"
              value={contactContent.officeHoursWeekends}
              onChange={(e) => updateContactField('officeHoursWeekends', e.target.value)}
              className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">Map Subtitle *</label>
          <input
            type="text"
            value={contactContent.mapSubtitle}
            onChange={(e) => updateContactField('mapSubtitle', e.target.value)}
            className="w-full px-4 py-2.5 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
          />
        </div>
        <button
          onClick={handleSaveContact}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Contact Content'}
        </button>
        <p className="text-xs text-spe-gray-500 mt-2">* Required fields.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-spe-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-spe-navy">FAQ Items</h2>
            <p className="text-sm text-spe-gray-500">Manage frequently asked questions shown on the FAQ page.</p>
          </div>
          <button onClick={addFaqItem} className="px-4 py-2 bg-spe-navy text-white rounded-lg hover:bg-spe-blue transition">+ Add FAQ</button>
        </div>
        {validationErrors.faq && validationErrors.faq.length > 0 && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {validationErrors.faq.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search FAQs by question, answer, or category"
            className="w-full md:max-w-md rounded-lg border border-spe-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-spe-navy"
          />
          <p className="text-sm text-spe-gray-500">Showing {filteredFaqItems.length} of {faqItems.length} FAQ items</p>
        </div>
        <div className="space-y-4">
          {faqItems.length === 0 ? (
            <div className="rounded-lg border border-spe-gray-200 bg-spe-gray-50 px-4 py-6 text-center text-spe-gray-500">
              No FAQ items yet. Click "+ Add FAQ" to create one.
            </div>
          ) : filteredFaqItems.length === 0 ? (
            <div className="rounded-lg border border-spe-gray-200 bg-spe-gray-50 px-4 py-6 text-center text-spe-gray-500">
              No FAQ items match your search.
            </div>
          ) : (
            filteredFaqItems.map((item) => {
              const index = faqItems.indexOf(item)

              return (
                <div key={`${item.question}-${index}`} className="border border-spe-gray-200 rounded-lg p-4 bg-spe-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Question *</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Category *</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => updateFaqItem(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-semibold text-spe-gray-700 mb-1">Answer *</label>
                    <textarea
                      value={item.answer}
                      onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-spe-gray-300 rounded-lg focus:ring-2 focus:ring-spe-navy"
                    />
                  </div>
                  <button onClick={() => removeFaqItem(index)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
                    Remove FAQ
                  </button>
                </div>
              )
            })
          )}
        </div>
        <div className="mt-4">
          <p className="text-xs text-spe-gray-500 mb-2">* Required fields.</p>
          <button
            onClick={handleSaveFaq}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save FAQ Items'}
          </button>
        </div>
      </div>
    </div>
  )
}
