'use client'

import { useRef, useState } from 'react'
import { getFileUrl } from '@/lib/storageConfig'

interface PdfUploadFieldProps {
  label?: string
  value: string
  onChange: (path: string) => void
  placeholder?: string
}

function isUploadedPdf(path: string) {
  if (!path) return false
  if (path.startsWith('http')) return true // Legacy full URLs
  // New paths are relative: /pdf/
  return path.startsWith('/pdf/')
}

export default function PdfUploadField({
  label = 'PDF File',
  value,
  onChange,
  placeholder = 'No PDF selected',
}: PdfUploadFieldProps) {
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
        // Delete old uploaded PDF if replacing an uploaded asset.
        if (value && isUploadedPdf(value)) {
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
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    if (!value) return

    if (isUploadedPdf(value)) {
      setUploading(true)
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: value }),
        })
      } catch {
        // If deletion fails, still clear the field to avoid blocking form edits.
      } finally {
        setUploading(false)
      }
    }

    onChange('')
  }

  const filename = value ? value.split('/').pop() : null

  return (
    <div>
      <label className="block text-sm font-semibold text-spe-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 text-sm font-medium text-white bg-spe-navy rounded-lg hover:bg-spe-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload PDF
            </>
          )}
        </button>

        <span className="text-sm text-spe-gray-500 truncate max-w-xs">
          {filename ? (
            <a href={getFileUrl(value)} target="_blank" rel="noopener noreferrer" className="text-spe-navy underline">
              {filename}
            </a>
          ) : (
            placeholder
          )}
        </span>

        {value && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="text-red-500 hover:text-red-700 text-sm"
            title="Remove PDF"
          >
            ✕
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
