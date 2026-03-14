import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'

const BUCKET = 'spe_mumbai'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as { role?: string }).role !== 'admin') return null
  return session
}

// POST /api/upload — admin uploads a file, returns its public URL from Supabase Storage
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

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WEBP, GIF, PDF allowed.' },
        { status: 400 }
      )
    }

    const MAX_SIZE = 20 * 1024 * 1024 // 20 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 20 MB)' }, { status: 400 })
    }

    const isPdf = file.type === 'application/pdf'
    const folder = isPdf ? 'pdf' : 'images'
    const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const supabase = getSupabaseAdmin()
    const arrayBuffer = await file.arrayBuffer()

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filename)

    // Return relative path (storage-agnostic) instead of full URL
    // The frontend will use storageConfig.getFileUrl() to resolve the actual URL
    const relativePath = `/${filename}`

    return NextResponse.json({ path: relativePath, success: true })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// DELETE /api/upload — admin deletes a previously uploaded file from Supabase Storage
export async function DELETE(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 })
  }

  try {
    const { path: fileUrl } = await request.json()

    if (!fileUrl) {
      return NextResponse.json({ error: 'No path provided' }, { status: 400 })
    }

    const supabaseStoragePrefix = `/storage/v1/object/public/${BUCKET}/`
    let storagePath: string | null = null

    if (typeof fileUrl === 'string' && fileUrl.startsWith('http')) {
      const urlObj = new URL(fileUrl)
      if (urlObj.pathname.includes(supabaseStoragePrefix)) {
        storagePath = urlObj.pathname.split(supabaseStoragePrefix)[1]
      }
    }

    if (!storagePath && typeof fileUrl === 'string' && fileUrl.includes(supabaseStoragePrefix)) {
      storagePath = fileUrl.split(supabaseStoragePrefix)[1]
    }

    if (storagePath) {
      const supabase = getSupabaseAdmin()
      const { error } = await supabase.storage.from(BUCKET).remove([storagePath])

      if (error) {
        console.error('Supabase delete error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    // Backward-compatible cleanup for old local uploads.
    if (fileUrl.startsWith('/images/uploads/') || fileUrl.startsWith('/pdf/')) {
      const localPath = path.join(process.cwd(), 'public', fileUrl)
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
