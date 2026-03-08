'use client'

import { useRef, useState } from 'react'

interface MultiImageUploadFieldProps {
  label?: string
  images: string[]
  onChange: (images: string[]) => void
}

export default function MultiImageUploadField({
  label = 'Photos',
  images,
  onChange,
}: MultiImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    if (!fileArray.length) return

    setError('')
    setUploading(true)

    const uploaded: string[] = []
    for (const file of fileArray) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const json = await res.json()
        if (res.ok) {
          uploaded.push(json.path)
        } else {
          setError(json.error || 'One or more uploads failed')
        }
      } catch {
        setError('Network error during upload')
      }
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded])
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files)
  }

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    onChange(updated)
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const updated = [...images]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    onChange(updated)
  }

  const moveDown = (index: number) => {
    if (index === images.length - 1) return
    const updated = [...images]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-spe-gray-700">{label}</label>
        <span className="text-xs text-spe-gray-400">{images.filter(Boolean).length} photo(s)</span>
      </div>

      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
          dragOver ? 'border-spe-navy bg-blue-50' : 'border-spe-gray-300 hover:border-spe-navy bg-spe-gray-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-spe-navy text-sm">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </div>
        ) : (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-spe-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-spe-gray-600 font-medium">Click to upload or drag & drop photos here</p>
            <p className="text-xs text-spe-gray-400 mt-1">JPG, PNG, WEBP — multiple files supported — max 5 MB each</p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

      {/* Photo grid */}
      {images.filter(Boolean).length > 0 && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.filter(Boolean).map((src, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden border border-spe-gray-200 bg-spe-gray-50 aspect-square">
              <img src={src} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveUp(index) }}
                    title="Move left"
                    disabled={index === 0}
                    className="p-1 rounded bg-white/80 text-spe-navy disabled:opacity-30 hover:bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveDown(index) }}
                    title="Move right"
                    disabled={index === images.filter(Boolean).length - 1}
                    className="p-1 rounded bg-white/80 text-spe-navy disabled:opacity-30 hover:bg-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(index) }}
                  title="Remove photo"
                  className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs text-center py-0.5">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
