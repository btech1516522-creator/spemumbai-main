import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

type DashboardGraphInput = {
  src?: string
  title?: string
  caption?: string
  active?: boolean
}

type DashboardGraph = {
  src: string
  title: string
  caption: string
  active: boolean
}

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

const defaultFaqItems: FaqItem[] = [
  {
    question: 'What is SPE?',
    answer: 'The Society of Petroleum Engineers (SPE) is a not-for-profit professional association whose members are engaged in energy resources development and production.',
    category: 'general',
  },
  {
    question: 'What does the SPE Mumbai Section do?',
    answer: 'The SPE Mumbai Section serves energy professionals in the Mumbai area by offering technical knowledge sharing, networking opportunities, and professional development resources.',
    category: 'general',
  },
  {
    question: 'How do I become a member of SPE?',
    answer: 'You can become a member of SPE by visiting the SPE International website and completing the membership application.',
    category: 'membership',
  },
  {
    question: 'What are the benefits of joining SPE?',
    answer: 'SPE membership offers access to technical resources, publications, discounted event registration, networking opportunities, and professional development resources.',
    category: 'membership',
  },
  {
    question: 'How can my company sponsor SPE Mumbai events?',
    answer: 'Companies interested in sponsoring SPE Mumbai events can contact our sponsorship committee and explore available sponsorship packages.',
    category: 'sponsors',
  },
  {
    question: 'When and where are SPE Mumbai Section meetings held?',
    answer: 'The SPE Mumbai Section typically holds monthly technical meetings at various venues across Mumbai.',
    category: 'events',
  },
  {
    question: 'Can non-members attend SPE events?',
    answer: 'Yes, most SPE Mumbai Section events are open to non-members, although members often receive discounted registration fees.',
    category: 'events',
  },
  {
    question: 'How can I volunteer with the SPE Mumbai Section?',
    answer: 'You can volunteer by contacting us through the Contact page and specifying your areas of interest.',
    category: 'general',
  },
  {
    question: 'Are there opportunities for students in SPE Mumbai?',
    answer: 'Yes. SPE Mumbai supports students through chapters, scholarships, mentoring, and student-focused events.',
    category: 'membership',
  },
  {
    question: 'How can I access SPE technical resources?',
    answer: 'As an SPE member, you can access technical resources through the SPE website, including papers, journals, webinars, and e-library resources.',
    category: 'resources',
  },
]

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string }).role !== 'admin') {
    return null
  }
  return session
}

// Helper: write a row to AuditLog
async function logAudit(
  tableName: string,
  action: string,
  oldData: unknown,
  newData: unknown,
  changedBy: string
) {
  try {
    await prisma.auditLog.create({
      data: {
        tableName,
        action,
        oldData: oldData ? JSON.stringify(oldData) : null,
        newData: newData ? JSON.stringify(newData) : null,
        changedBy,
      },
    })
  } catch (e) {
    console.error('AuditLog write error:', e)
  }
}

function findDeletedRecords<T extends { id: string }>(
  oldRows: T[],
  incomingRows: unknown
): T[] {
  if (!Array.isArray(incomingRows)) return oldRows

  const incomingIds = new Set(
    incomingRows
      .map((row) => (row && typeof row === 'object' ? (row as { id?: unknown }).id : undefined))
      .filter((id): id is string => typeof id === 'string' && id.length > 0)
  )

  return oldRows.filter((row) => !incomingIds.has(row.id))
}

function parseImageList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.length > 0)
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string' && item.length > 0)
      }
    } catch {
      return []
    }
  }

  return []
}

function normalizeDashboardGraph(item: unknown, index: number): DashboardGraph | null {
  if (typeof item === 'string' && item.length > 0) {
    return {
      src: item,
      title: `Performance Graph ${index + 1}`,
      caption: '',
      active: true,
    }
  }

  if (item && typeof item === 'object') {
    const input = item as DashboardGraphInput
    if (typeof input.src === 'string' && input.src.length > 0) {
      return {
        src: input.src,
        title: typeof input.title === 'string' && input.title.trim().length > 0
          ? input.title.trim()
          : `Performance Graph ${index + 1}`,
        caption: typeof input.caption === 'string' ? input.caption : '',
        active: input.active ?? true,
      }
    }
  }

  return null
}

function parseDashboardGraphs(value: unknown): DashboardGraph[] {
  const parsed: unknown[] = typeof value === 'string'
    ? (() => {
        try {
          const data = JSON.parse(value)
          return Array.isArray(data) ? data : []
        } catch {
          return []
        }
      })()
    : Array.isArray(value)
      ? value
      : []

  return parsed
    .map((item, index) => normalizeDashboardGraph(item, index))
    .filter((item): item is DashboardGraph => !!item)
}

function parseContactContent(value: unknown): ContactContent {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as Partial<ContactContent>
      return {
        heroTitle: parsed.heroTitle ?? defaultContactContent.heroTitle,
        heroSubtitle: parsed.heroSubtitle ?? defaultContactContent.heroSubtitle,
        email: parsed.email ?? defaultContactContent.email,
        phone: parsed.phone ?? defaultContactContent.phone,
        addressLines: Array.isArray(parsed.addressLines) ? parsed.addressLines.filter((item): item is string => typeof item === 'string') : defaultContactContent.addressLines,
        officeHoursWeekdays: parsed.officeHoursWeekdays ?? defaultContactContent.officeHoursWeekdays,
        officeHoursWeekends: parsed.officeHoursWeekends ?? defaultContactContent.officeHoursWeekends,
        mapTitle: parsed.mapTitle ?? defaultContactContent.mapTitle,
        mapSubtitle: parsed.mapSubtitle ?? defaultContactContent.mapSubtitle,
      }
    } catch {
      return defaultContactContent
    }
  }

  return defaultContactContent
}

function parseFaqItems(value: unknown): FaqItem[] {
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return parsed
          .filter((item): item is FaqItem => !!item && typeof item === 'object' && typeof item.question === 'string' && typeof item.answer === 'string' && typeof item.category === 'string')
      }
    } catch {
      return defaultFaqItems
    }
  }

  return defaultFaqItems
}

// ---------------------------------------------------------------------------
// GET /api/content[?type=leadership|events|reports|announcements]
// ---------------------------------------------------------------------------
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    if (type === 'leadership') {
      const members = await prisma.leadershipMember.findMany({ orderBy: { sortOrder: 'asc' } })
      return NextResponse.json(members)
    }

    if (type === 'events') {
      let events = await prisma.event.findMany({ orderBy: { sortOrder: 'asc' } })
      
      // Auto-disable expired events
      const today = new Date().toISOString().split('T')[0]
      const expiredEvents = events.filter(e => e.endDate && e.endDate < today && e.active)
      
      if (expiredEvents.length > 0) {
        await Promise.all(
          expiredEvents.map(e => 
            prisma.event.update({
              where: { id: e.id },
              data: { active: false }
            })
          )
        )
        // Re-fetch to get updated state
        events = await prisma.event.findMany({ orderBy: { sortOrder: 'asc' } })
      }
      
      return NextResponse.json(events)
    }

    if (type === 'reports') {
      const reports = await prisma.report.findMany({ orderBy: { sortOrder: 'asc' } })
      return NextResponse.json(reports)
    }

    if (type === 'gallery') {
      const galleries = await prisma.galleryEvent.findMany({ orderBy: { sortOrder: 'asc' } })
      return NextResponse.json(galleries)
    }

    if (type === 'announcements') {
      const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: 'asc' } })
      return NextResponse.json(announcements)
    }

    if (type === 'students') {
      const chapters = await prisma.studentChapter.findMany({ orderBy: { sortOrder: 'asc' } })
      return NextResponse.json(chapters)
    }

    if (type === 'volunteering') {
      const roles = await prisma.volunteerRole.findMany({ orderBy: { sortOrder: 'asc' } })
      return NextResponse.json(roles)
    }

    if (type === 'dashboardGraphs') {
      const row = await prisma.siteContent.findUnique({ where: { key: 'dashboardGraphs' } })
      return NextResponse.json(parseDashboardGraphs(row?.value))
    }

    if (type === 'contactContent') {
      const row = await prisma.siteContent.findUnique({ where: { key: 'contactContent' } })
      return NextResponse.json(parseContactContent(row?.value))
    }

    if (type === 'faqItems') {
      const row = await prisma.siteContent.findUnique({ where: { key: 'faqItems' } })
      return NextResponse.json(parseFaqItems(row?.value))
    }

    // Return all content combined
    const [heroTitleRow, heroSubtitleRow, contactContentRow, faqItemsRow, announcements, events, leadership, reports] =
      await Promise.all([
        prisma.siteContent.findUnique({ where: { key: 'heroTitle' } }),
        prisma.siteContent.findUnique({ where: { key: 'heroSubtitle' } }),
        prisma.siteContent.findUnique({ where: { key: 'contactContent' } }),
        prisma.siteContent.findUnique({ where: { key: 'faqItems' } }),
        prisma.announcement.findMany({ orderBy: { createdAt: 'asc' } }),
        prisma.event.findMany({ orderBy: { sortOrder: 'asc' } }),
        prisma.leadershipMember.findMany({ orderBy: { sortOrder: 'asc' } }),
        prisma.report.findMany({ orderBy: { sortOrder: 'asc' } }),
      ])

    return NextResponse.json({
      heroTitle: heroTitleRow?.value ?? 'Empowering Energy Professionals',
      heroSubtitle: heroSubtitleRow?.value ?? 'Society of Petroleum Engineers Mumbai Section',
      contactContent: parseContactContent(contactContentRow?.value),
      faqItems: parseFaqItems(faqItemsRow?.value),
      announcements,
      events,
      leadership,
      reports,
    })
  } catch (error) {
    console.error('Content GET error:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PUT /api/content  — admin only
// Body: { type: string, data: any }
// ---------------------------------------------------------------------------
export async function PUT(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || data === undefined) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 })
    }

    const email = (session.user as { email?: string }).email ?? 'admin'

    if (type === 'heroTitle' || type === 'heroSubtitle') {
      const existing = await prisma.siteContent.findUnique({ where: { key: type } })
      await prisma.siteContent.upsert({
        where: { key: type },
        update: { value: String(data), updatedBy: email },
        create: { key: type, value: String(data), updatedBy: email },
      })
      await logAudit('SiteContent', 'UPDATE', existing ? { key: type, value: existing.value } : null, { key: type, value: String(data) }, email)
      return NextResponse.json({ success: true, message: `${type} updated successfully` })
    }

    if (type === 'contactContent') {
      const existing = await prisma.siteContent.findUnique({ where: { key: 'contactContent' } })
      const value = JSON.stringify(parseContactContent(JSON.stringify(data)))
      await prisma.siteContent.upsert({
        where: { key: 'contactContent' },
        update: { value, updatedBy: email },
        create: { key: 'contactContent', value, updatedBy: email },
      })
      await logAudit('SiteContent', 'UPDATE', existing ? { key: 'contactContent', value: existing.value } : null, { key: 'contactContent', value: data }, email)
      return NextResponse.json({ success: true, message: 'contact content updated successfully' })
    }

    if (type === 'faqItems') {
      const existing = await prisma.siteContent.findUnique({ where: { key: 'faqItems' } })
      const value = JSON.stringify(parseFaqItems(JSON.stringify(data)))
      await prisma.siteContent.upsert({
        where: { key: 'faqItems' },
        update: { value, updatedBy: email },
        create: { key: 'faqItems', value, updatedBy: email },
      })
      await logAudit('SiteContent', 'UPDATE', existing ? { key: 'faqItems', value: existing.value } : null, { key: 'faqItems', value: data }, email)
      return NextResponse.json({ success: true, message: 'faq items updated successfully' })
    }

    if (type === 'announcements') {
      const oldAnnouncements = await prisma.announcement.findMany()
      const deletedAnnouncements = findDeletedRecords(oldAnnouncements, data)
      await prisma.announcement.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.announcement.createMany({
          data: data.map((a: { title: string; content: string; date: string; active: boolean }) => ({
            title: a.title,
            content: a.content,
            date: a.date,
            active: a.active ?? true,
          })),
        })
      }
      await Promise.all(
        deletedAnnouncements.map((item) =>
          logAudit('Announcement', 'DELETE', item, null, email)
        )
      )
      return NextResponse.json({ success: true, message: 'announcements updated successfully' })
    }

    if (type === 'leadership') {
      const oldLeadership = await prisma.leadershipMember.findMany({ orderBy: { sortOrder: 'asc' } })
      const deletedLeadership = findDeletedRecords(oldLeadership, data)
      await prisma.leadershipMember.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.leadershipMember.createMany({
          data: data.map(
            (m: { name: string; position: string; organization: string; bio: string; linkedin?: string; image?: string }, idx: number) => ({
              name: m.name,
              position: m.position,
              organization: m.organization,
              bio: m.bio,
              linkedin: m.linkedin ?? null,
              image: m.image ?? null,
              sortOrder: idx,
            })
          ),
        })
      }
      await Promise.all(
        deletedLeadership.map((item) =>
          logAudit('LeadershipMember', 'DELETE', item, null, email)
        )
      )
      return NextResponse.json({ success: true, message: 'leadership updated successfully' })
    }

    if (type === 'events') {
      const oldEvents = await prisma.event.findMany({ orderBy: { sortOrder: 'asc' } })
      const deletedEvents = findDeletedRecords(oldEvents, data)
      await prisma.event.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.event.createMany({
          data: data.map(
            (e: { title: string; date: string; endDate?: string; location: string; description: string; image?: string; active: boolean; registrationEnabled?: boolean; proposalPurpose?: string; proposalLink?: string }, idx: number) => ({
              title: e.title,
              date: e.date,
              endDate: e.endDate ?? null,
              location: e.location,
              description: e.description,
              image: e.image ?? null,
              active: e.active ?? true,
              registrationEnabled: e.registrationEnabled ?? false,
              proposalPurpose: e.proposalPurpose ?? null,
              proposalLink: e.proposalLink ?? null,
              sortOrder: idx,
            })
          ),
        })
      }
      await Promise.all(
        deletedEvents.map((item) =>
          logAudit('Event', 'DELETE', item, null, email)
        )
      )
      return NextResponse.json({ success: true, message: 'events updated successfully' })
    }

    if (type === 'reports') {
      const oldReports = await prisma.report.findMany({ orderBy: { sortOrder: 'asc' } })
      const deletedReports = findDeletedRecords(oldReports, data)
      await prisma.report.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.report.createMany({
          data: data.map(
            (r: { title: string; coverImage?: string; pdfUrl: string; description: string; active: boolean }, idx: number) => ({
              title: r.title,
              coverImage: r.coverImage ?? null,
              pdfUrl: r.pdfUrl,
              description: r.description,
              active: r.active ?? true,
              sortOrder: idx,
            })
          ),
        })
      }
      await Promise.all(
        deletedReports.map((item) =>
          logAudit('Report', 'DELETE', item, null, email)
        )
      )
      return NextResponse.json({ success: true, message: 'reports updated successfully' })
    }

    if (type === 'gallery') {
      const oldGalleries = await prisma.galleryEvent.findMany({ orderBy: { sortOrder: 'asc' } })
      const deletedGalleries = findDeletedRecords(oldGalleries, data)

      const incomingList = Array.isArray(data)
        ? data.filter((row): row is Record<string, unknown> => !!row && typeof row === 'object')
        : []

      const incomingById = new Map(
        incomingList
          .map((row) => [typeof row.id === 'string' ? row.id : null, row] as const)
          .filter((entry): entry is [string, Record<string, unknown>] => !!entry[0])
      )

      const incomingBySlug = new Map(
        incomingList
          .map((row) => [typeof row.slug === 'string' ? row.slug : null, row] as const)
          .filter((entry): entry is [string, Record<string, unknown>] => !!entry[0])
      )

      const removedGalleryImages: Array<{
        galleryId: string
        galleryTitle: string
        gallerySlug: string
        fileUrl: string
        fileName: string
      }> = []

      for (const oldGallery of oldGalleries) {
        const incoming = incomingById.get(oldGallery.id) ?? incomingBySlug.get(oldGallery.slug)
        if (!incoming) continue

        const oldImages = parseImageList(oldGallery.images)
        const newImages = parseImageList(incoming.images)
        const newSet = new Set(newImages)

        for (const oldImage of oldImages) {
          if (!newSet.has(oldImage)) {
            removedGalleryImages.push({
              galleryId: oldGallery.id,
              galleryTitle: oldGallery.title,
              gallerySlug: oldGallery.slug,
              fileUrl: oldImage,
              fileName: oldImage.split('/').pop() ?? 'image',
            })
          }
        }
      }

      await prisma.galleryEvent.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.galleryEvent.createMany({
          data: data.map(
            (g: { slug: string; title: string; date: string; coverImage: string; images: string[]; active: boolean }, idx: number) => ({
              slug: g.slug,
              title: g.title,
              date: g.date,
              coverImage: g.coverImage,
              images: JSON.stringify(Array.isArray(g.images) ? g.images : []),
              active: g.active ?? true,
              sortOrder: idx,
            })
          ),
        })
      }
      await Promise.all(
        deletedGalleries.map((item) =>
          logAudit('GalleryEvent', 'DELETE', item, null, email)
        )
      )

      await Promise.all(
        removedGalleryImages.map((item) =>
          logAudit('GalleryImage', 'DELETE', item, null, email)
        )
      )

      return NextResponse.json({ success: true, message: 'gallery updated successfully' })
    }

    if (type === 'students') {
      const oldChapters = await prisma.studentChapter.findMany({ orderBy: { sortOrder: 'asc' } })
      const deletedChapters = findDeletedRecords(oldChapters, data)
      await prisma.studentChapter.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.studentChapter.createMany({
          data: data.map(
            (c: { name: string; university: string; location: string; established: string; description: string; website?: string; image?: string; achievements?: string | string[]; activities?: string | string[]; leadership?: string | string[]; active?: boolean }, idx: number) => ({
              name: c.name,
              university: c.university,
              location: c.location,
              established: c.established,
              description: c.description,
              website: c.website ?? null,
              image: c.image ?? null,
              achievements: typeof c.achievements === 'string' ? c.achievements : JSON.stringify(c.achievements ?? []),
              activities: typeof c.activities === 'string' ? c.activities : JSON.stringify(c.activities ?? []),
              leadership: typeof c.leadership === 'string' ? c.leadership : JSON.stringify(c.leadership ?? []),
              sortOrder: idx,
              active: c.active ?? true,
            })
          ),
        })
      }
      await Promise.all(
        deletedChapters.map((item) =>
          logAudit('StudentChapter', 'DELETE', item, null, email)
        )
      )
      return NextResponse.json({ success: true, message: 'student chapters updated successfully' })
    }

    if (type === 'volunteering') {
      const oldRoles = await prisma.volunteerRole.findMany({ orderBy: { sortOrder: 'asc' } })
      const deletedRoles = findDeletedRecords(oldRoles, data)
      await prisma.volunteerRole.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.volunteerRole.createMany({
          data: data.map(
            (r: { title: string; category: string; description: string; responsibilities: string; timeCommitment: string; location: string; teamWork: string; skills: string; benefits: string; active: boolean }, idx: number) => ({
              title: r.title,
              category: r.category,
              description: r.description,
              responsibilities: r.responsibilities,
              timeCommitment: r.timeCommitment,
              location: r.location,
              teamWork: r.teamWork,
              skills: r.skills,
              benefits: r.benefits,
              sortOrder: idx,
              active: r.active ?? true,
            })
          ),
        })
      }
      await Promise.all(
        deletedRoles.map((item) =>
          logAudit('VolunteerRole', 'DELETE', item, null, email)
        )
      )
      return NextResponse.json({ success: true, message: 'volunteer roles updated successfully' })
    }

    if (type === 'dashboardGraphs') {
      const existing = await prisma.siteContent.findUnique({ where: { key: 'dashboardGraphs' } })
      const graphs = parseDashboardGraphs(data)
      await prisma.siteContent.upsert({
        where: { key: 'dashboardGraphs' },
        update: { value: JSON.stringify(graphs), updatedBy: email },
        create: { key: 'dashboardGraphs', value: JSON.stringify(graphs), updatedBy: email },
      })
      await logAudit('SiteContent', 'UPDATE', existing ? { key: 'dashboardGraphs', value: existing.value } : null, { key: 'dashboardGraphs', value: graphs }, email)
      return NextResponse.json({ success: true, message: 'dashboard graphs updated successfully' })
    }

    return NextResponse.json({ error: `Unknown content type: ${type}` }, { status: 400 })
  } catch (error) {
    console.error('Content PUT error:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
