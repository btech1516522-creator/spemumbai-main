import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import fs from 'node:fs'
import path from 'node:path'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string }).role !== 'admin') {
    return null
  }
  return session
}

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export async function GET(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const logId = searchParams.get('logId')

    if (!logId) {
      return NextResponse.json({ error: 'Missing logId' }, { status: 400 })
    }

    const log = await prisma.auditLog.findUnique({ where: { id: logId } })
    if (!log || log.action !== 'DELETE' || !log.oldData) {
      return NextResponse.json({ error: 'Deleted log not found' }, { status: 404 })
    }

    const oldData = JSON.parse(log.oldData) as Record<string, unknown>

    const directFileUrl =
      typeof oldData.fileUrl === 'string'
        ? oldData.fileUrl
        : typeof oldData.pdfUrl === 'string'
          ? oldData.pdfUrl
          : typeof oldData.image === 'string'
            ? oldData.image
            : typeof oldData.coverImage === 'string'
              ? oldData.coverImage
              : null

    if (!directFileUrl) {
      return NextResponse.json({ error: 'No file found in this history record' }, { status: 400 })
    }

    const fallbackName =
      typeof oldData.fileName === 'string' && oldData.fileName.length > 0
        ? oldData.fileName
        : directFileUrl.split('/').pop() ?? 'download.bin'

    const safeName = sanitizeFileName(fallbackName)

    // Local file path support for legacy assets.
    if (directFileUrl.startsWith('/')) {
      const localPath = path.join(process.cwd(), 'public', directFileUrl)
      if (!fs.existsSync(localPath)) {
        return NextResponse.json({ error: 'File no longer exists in storage' }, { status: 404 })
      }

      const fileBuffer = fs.readFileSync(localPath)
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${safeName}"`,
          'Cache-Control': 'no-store',
        },
      })
    }

    const fileResponse = await fetch(directFileUrl)
    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'File no longer exists in storage' }, { status: 404 })
    }

    const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream'
    const arrayBuffer = await fileResponse.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeName}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Audit download error:', error)
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
  }
}
