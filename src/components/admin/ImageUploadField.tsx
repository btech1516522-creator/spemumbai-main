'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { getFileUrl } from '@/lib/storageConfig'

interface ImageUploadFieldProps {
  label?: string
  value: string
  onChange: (path: string) => void
  placeholder?: string
}

function isUploadedAsset(path: string) {
  if (!path) return false
  if (path.startsWith('http')) return true // Legacy full URLs
  // New paths are relative and in uploads folder: /images/uploads/ or /pdf/
  return path.startsWith('/images/') || path.startsWith('/pdf/')
}

export default function ImageUploadField({
  label = 'Image',
  value,
  onChange,
  placeholder = 'No image selected',
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Upload failed')
      } else {
        // If replacing an old uploaded image, delete old uploaded asset.
        if (value && isUploadedAsset(value)) {
          await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: value }),
          })
        }
        onChange(json.path)
      }
    } catch {
      setError('Network error during upload')
    } finally {
      setUploading(false)
      // Reset input so same file can be re-selected if needed
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    if (!value) return
    if (!confirm('Remove this image?')) return

    // Only delete uploaded assets (Supabase URL or legacy local uploaded path).
    if (isUploadedAsset(value)) {
      setUploading(true)
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: value }),
        })
      } catch {
        // ignore – just clear the field
      } finally {
        setUploading(false)
      }
    }
    onChange('')
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-spe-gray-700 mb-1.5">{label}</label>
      )}

      {/* Preview */}
      {value ? (
        <div className="mb-2 relative inline-block group">
          <div className="w-28 h-28 rounded-lg overflow-hidden border border-spe-gray-200 bg-spe-gray-50">
            <Image
              src={getFileUrl(value)}
              alt="Preview"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          {/* Remove button over the image */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            title="Remove image"
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 
              flex items-center justify-center text-xs hover:bg-red-700 transition-colors 
              shadow-sm disabled:opacity-50"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="mb-2 w-28 h-28 rounded-lg border-2 border-dashed border-spe-gray-300 
          bg-spe-gray-50 flex flex-col items-center justify-center text-spe-gray-400 text-xs text-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {placeholder}
        </div>
      )}

      {/* Buttons row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold 
            text-spe-navy border border-spe-navy rounded-lg hover:bg-spe-navy hover:text-white 
            transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
              Uploading…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {value ? 'Replace Image' : 'Choose Image'}
            </>
          )}
        </button>

        {value && !isUploadedAsset(value) && (
          <span className="text-xs text-spe-gray-400 italic truncate max-w-[180px]" title={value}>
            {value}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}

      <p className="mt-1 text-xs text-spe-gray-400">JPG, PNG, WEBP or GIF · max 5 MB</p>
    </div>
  )
}
