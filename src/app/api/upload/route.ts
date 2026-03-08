import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads')

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string }).role !== 'admin') return null
  return session
}

// POST /api/upload — admin uploads a file, returns its public path
export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WEBP, GIF allowed.' },
        { status: 400 }
      )
    }

    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 400 })
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    const ext = path.extname(file.name).toLowerCase()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(filepath, buffer)

    return NextResponse.json({ path: `/images/uploads/${filename}`, success: true })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// DELETE /api/upload — admin deletes a previously uploaded file
export async function DELETE(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 })
  }

  try {
    const { path: imagePath } = await request.json()

    // Only allow deleting files inside /images/uploads/ for safety
    if (!imagePath || !imagePath.startsWith('/images/uploads/')) {
      return NextResponse.json({ error: 'Invalid path — can only delete uploaded images' }, { status: 400 })
    }

    const filepath = path.join(process.cwd(), 'public', imagePath)

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
