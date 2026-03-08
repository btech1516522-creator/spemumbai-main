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

// GET /api/audit?table=Event&limit=50
export async function GET(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const table = searchParams.get('table')
  const limit = parseInt(searchParams.get('limit') ?? '100', 10)

  try {
    const logs = await prisma.auditLog.findMany({
      where: table ? { tableName: table } : undefined,
      orderBy: { changedAt: 'desc' },
      take: limit,
    })
    return NextResponse.json(logs)
  } catch (error) {
    console.error('Audit GET error:', error)
    return NextResponse.json({ error: 'Failed to load audit logs' }, { status: 500 })
  }
}
