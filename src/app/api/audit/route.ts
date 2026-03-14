import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

type AuditLogRow = Awaited<ReturnType<typeof prisma.auditLog.findMany>>[number]

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string }).role !== 'admin') {
    return null
  }
  return session
}

// GET /api/audit?table=Event&limit=50
export async function GET(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const table = searchParams.get('table')
  const limit = parseInt(searchParams.get('limit') ?? '100', 10)
  const action = searchParams.get('action') ?? 'DELETE'

  try {
    const logs = await prisma.auditLog.findMany({
      where: {
        ...(table ? { tableName: table } : {}),
        ...(action ? { action } : {}),
      },
      orderBy: { changedAt: 'desc' },
      take: limit,
    })

    // For delete history view, annotate whether each item was already restored.
    if (action === 'DELETE' && logs.length > 0) {
      const restoreLogs = await prisma.auditLog.findMany({
        where: {
          action: 'RESTORE',
          ...(table ? { tableName: table } : {}),
        },
        orderBy: { changedAt: 'desc' },
        take: 1000,
      })

      const restoreBySnapshot = new Map<string, { changedAt: Date; changedBy: string }>()
      for (const restore of restoreLogs) {
        const key = `${restore.tableName}::${restore.newData ?? ''}`
        if (!restoreBySnapshot.has(key)) {
          restoreBySnapshot.set(key, { changedAt: restore.changedAt, changedBy: restore.changedBy })
        }
      }

      const enriched = logs.map((log: AuditLogRow) => {
        const key = `${log.tableName}::${log.oldData ?? ''}`
        const restored = restoreBySnapshot.get(key)
        return {
          ...log,
          restored: !!restored,
          restoredAt: restored?.changedAt ?? null,
          restoredBy: restored?.changedBy ?? null,
        }
      })

      return NextResponse.json(enriched)
    }

    return NextResponse.json(logs)
  } catch (error) {
    console.error('Audit GET error:', error)
    return NextResponse.json({ error: 'Failed to load audit logs' }, { status: 500 })
  }
}

// POST /api/audit/restore — restore a record to its previous state
export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { logId } = await request.json()
    const log = await prisma.auditLog.findUnique({ where: { id: logId } })
    if (!log || !log.oldData) {
      return NextResponse.json({ error: 'Nothing to restore' }, { status: 400 })
    }

    if (log.action !== 'DELETE') {
      return NextResponse.json({ error: 'Only deleted records can be restored' }, { status: 400 })
    }

    const existingRestore = await prisma.auditLog.findFirst({
      where: {
        tableName: log.tableName,
        action: 'RESTORE',
        newData: log.oldData,
      },
      orderBy: { changedAt: 'desc' },
    })

    if (existingRestore) {
      return NextResponse.json({ success: true, alreadyRestored: true })
    }

    const table = log.tableName as string
    const oldParsed = JSON.parse(log.oldData) as Record<string, unknown>

    if (!oldParsed || typeof oldParsed !== 'object' || Array.isArray(oldParsed)) {
      return NextResponse.json({ error: 'Invalid deleted record snapshot' }, { status: 400 })
    }

    if (table === 'Event') {
      const { id, title, date, location, description, image, active, sortOrder } = oldParsed
      const payload = {
        title: String(title ?? ''),
        date: String(date ?? ''),
        location: String(location ?? ''),
        description: String(description ?? ''),
        image: image ? String(image) : null,
        active: Boolean(active),
        sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
      }
      await prisma.event.upsert({
        where: { id: String(id) },
        update: payload,
        create: {
          id: String(id),
          ...payload,
        },
      })
    } else if (table === 'Report') {
      const { id, title, coverImage, pdfUrl, description, active, sortOrder } = oldParsed
      const payload = {
        title: String(title ?? ''),
        coverImage: coverImage ? String(coverImage) : null,
        pdfUrl: String(pdfUrl ?? ''),
        description: String(description ?? ''),
        active: Boolean(active),
        sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
      }
      await prisma.report.upsert({
        where: { id: String(id) },
        update: payload,
        create: {
          id: String(id),
          ...payload,
        },
      })
    } else if (table === 'LeadershipMember') {
      const { id, name, position, organization, bio, linkedin, image, sortOrder } = oldParsed
      const payload = {
        name: String(name ?? ''),
        position: String(position ?? ''),
        organization: String(organization ?? ''),
        bio: String(bio ?? ''),
        linkedin: linkedin ? String(linkedin) : null,
        image: image ? String(image) : null,
        sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
      }
      await prisma.leadershipMember.upsert({
        where: { id: String(id) },
        update: payload,
        create: {
          id: String(id),
          ...payload,
        },
      })
    } else if (table === 'Announcement') {
      const { id, title, content, date, active } = oldParsed
      const payload = {
        title: String(title ?? ''),
        content: String(content ?? ''),
        date: String(date ?? ''),
        active: Boolean(active),
      }
      await prisma.announcement.upsert({
        where: { id: String(id) },
        update: payload,
        create: {
          id: String(id),
          ...payload,
        },
      })
    } else if (table === 'GalleryEvent') {
      const { id, slug, title, date, coverImage, images, active, sortOrder } = oldParsed
      const payload = {
        slug: String(slug ?? ''),
        title: String(title ?? ''),
        date: String(date ?? ''),
        coverImage: String(coverImage ?? ''),
        images: typeof images === 'string' ? images : JSON.stringify(images ?? []),
        active: Boolean(active),
        sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
      }
      await prisma.galleryEvent.upsert({
        where: { id: String(id) },
        update: payload,
        create: {
          id: String(id),
          ...payload,
        },
      })
    } else if (table === 'GalleryImage') {
      const galleryId = typeof oldParsed.galleryId === 'string' ? oldParsed.galleryId : null
      const gallerySlug = typeof oldParsed.gallerySlug === 'string' ? oldParsed.gallerySlug : null
      const galleryTitle = typeof oldParsed.galleryTitle === 'string' ? oldParsed.galleryTitle : null
      const fileUrl = typeof oldParsed.fileUrl === 'string' ? oldParsed.fileUrl : null

      if (!fileUrl) {
        return NextResponse.json({ error: 'Missing deleted image file URL' }, { status: 400 })
      }

      let gallery = galleryId
        ? await prisma.galleryEvent.findUnique({ where: { id: galleryId } })
        : null

      // Gallery IDs can change because content saves currently rebuild rows.
      if (!gallery && gallerySlug) {
        gallery = await prisma.galleryEvent.findUnique({ where: { slug: gallerySlug } })
      }

      // Last fallback for legacy logs where slug may have changed.
      if (!gallery && galleryTitle) {
        gallery = await prisma.galleryEvent.findFirst({
          where: { title: galleryTitle },
          orderBy: { updatedAt: 'desc' },
        })
      }

      if (!gallery) {
        return NextResponse.json({ error: 'Original gallery event not found' }, { status: 404 })
      }

      let currentImages: string[] = []
      try {
        const parsed = JSON.parse(gallery.images)
        if (Array.isArray(parsed)) {
          currentImages = parsed.filter((item): item is string => typeof item === 'string' && item.length > 0)
        }
      } catch {
        currentImages = []
      }

      if (!currentImages.includes(fileUrl)) {
        currentImages.push(fileUrl)
      }

      await prisma.galleryEvent.update({
        where: { id: gallery.id },
        data: { images: JSON.stringify(currentImages) },
      })
    } else {
      return NextResponse.json({ error: 'Unsupported table' }, { status: 400 })
    }

    // Log the restore action
    await prisma.auditLog.create({
      data: {
        tableName: table,
        recordId: log.recordId,
        action: 'RESTORE',
        oldData: log.newData,
        newData: log.oldData,
        changedBy: (session.user as { email?: string }).email ?? 'admin',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json({ error: 'Restore failed' }, { status: 500 })
  }
}
