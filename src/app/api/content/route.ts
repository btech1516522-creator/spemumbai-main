import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

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
      const events = await prisma.event.findMany({ orderBy: { sortOrder: 'asc' } })
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

    // Return all content combined
    const [heroTitleRow, heroSubtitleRow, announcements, events, leadership, reports] =
      await Promise.all([
        prisma.siteContent.findUnique({ where: { key: 'heroTitle' } }),
        prisma.siteContent.findUnique({ where: { key: 'heroSubtitle' } }),
        prisma.announcement.findMany({ orderBy: { createdAt: 'asc' } }),
        prisma.event.findMany({ orderBy: { sortOrder: 'asc' } }),
        prisma.leadershipMember.findMany({ orderBy: { sortOrder: 'asc' } }),
        prisma.report.findMany({ orderBy: { sortOrder: 'asc' } }),
      ])

    return NextResponse.json({
      heroTitle: heroTitleRow?.value ?? 'Empowering Energy Professionals',
      heroSubtitle: heroSubtitleRow?.value ?? 'Society of Petroleum Engineers Mumbai Section',
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

    if (type === 'announcements') {
      const oldAnnouncements = await prisma.announcement.findMany()
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
      await logAudit('Announcement', 'REPLACE_ALL', oldAnnouncements, data, email)
      return NextResponse.json({ success: true, message: 'announcements updated successfully' })
    }

    if (type === 'leadership') {
      const oldLeadership = await prisma.leadershipMember.findMany({ orderBy: { sortOrder: 'asc' } })
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
      await logAudit('LeadershipMember', 'REPLACE_ALL', oldLeadership, data, email)
      return NextResponse.json({ success: true, message: 'leadership updated successfully' })
    }

    if (type === 'events') {
      const oldEvents = await prisma.event.findMany({ orderBy: { sortOrder: 'asc' } })
      await prisma.event.deleteMany()
      if (Array.isArray(data) && data.length > 0) {
        await prisma.event.createMany({
          data: data.map(
            (e: { title: string; date: string; location: string; description: string; active: boolean }, idx: number) => ({
              title: e.title,
              date: e.date,
              location: e.location,
              description: e.description,
              active: e.active ?? true,
              sortOrder: idx,
            })
          ),
        })
      }
      await logAudit('Event', 'REPLACE_ALL', oldEvents, data, email)
      return NextResponse.json({ success: true, message: 'events updated successfully' })
    }

    if (type === 'reports') {
      const oldReports = await prisma.report.findMany({ orderBy: { sortOrder: 'asc' } })
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
      await logAudit('Report', 'REPLACE_ALL', oldReports, data, email)
      return NextResponse.json({ success: true, message: 'reports updated successfully' })
    }

    if (type === 'gallery') {
      const oldGalleries = await prisma.galleryEvent.findMany({ orderBy: { sortOrder: 'asc' } })
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
      await logAudit('GalleryEvent', 'REPLACE_ALL', oldGalleries, data, email)
      return NextResponse.json({ success: true, message: 'gallery updated successfully' })
    }

    return NextResponse.json({ error: `Unknown content type: ${type}` }, { status: 400 })
  } catch (error) {
    console.error('Content PUT error:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
