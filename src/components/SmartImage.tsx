/**
 * Smart Image Component
 * Automatically resolves file URLs using storage configuration
 * Supports Supabase, AWS S3, and local storage
 * 
 * Usage in components:
 * <SmartImage 
 *   src="/images/gallery/photo.jpg" 
 *   alt="Gallery photo"
 * />
 * 
 * Component automatically:
 * - Uses configured storage provider (Supabase, AWS S3, etc)
 * - Converts relative paths to full URLs
 * - Handles errors gracefully
 * - Shows loading state
 */

'use client'

import Image from 'next/image'
import { getFileUrl } from '@/lib/storageConfig'
import { useState } from 'react'

interface SmartImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down'
  objectPosition?: string
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  quality = 75,
  objectFit = 'cover',
  objectPosition = 'center',
}: SmartImageProps) {
  const [error, setError] = useState(false)

  if (!src) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    )
  }

  // Convert relative path to full URL using storage config
  const imageUrl = getFileUrl(src)

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`)
    setError(true)
  }

  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        onError={handleError}
        className={className}
        style={{ objectFit, objectPosition }}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 300}
      height={height || 300}
      priority={priority}
      quality={quality}
      onError={handleError}
      className={className}
      style={{ objectFit, objectPosition }}
    />
  )
}

export default SmartImage
