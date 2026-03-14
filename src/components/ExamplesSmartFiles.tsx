/**
 * Example: Using Smart File Resolution in Real Components
 * 
 * This file demonstrates best practices for displaying content from database
 * with smart Supabase/local fallback
 */

'use client'

import { SmartImage } from '@/components/SmartImage'
import { getFileUrl, getSupabaseUrl } from '@/lib/fileResolver'

/**
 * Example 1: Gallery Display
 * Shows how to render gallery images with smart fallback
 */
export function GalleryExample({
  galleries,
}: {
  galleries: Array<{ id: string; title: string; coverImage: string }>
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <SmartImage
            src={gallery.coverImage}
            alt={gallery.title}
            width={300}
            height={200}
            className="rounded-lg"
          />
          <h3>{gallery.title}</h3>
        </div>
      ))}
    </div>
  )
}

/**
 * Example 2: Leadership Cards
 * Displays leadership member photos
 */
export function LeadershipCardsExample({
  members,
}: {
  members: Array<{
    id: string
    name: string
    position: string
    image: string
  }>
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {members.map((member) => (
        <div key={member.id} className="text-center">
          <SmartImage
            src={member.image}
            alt={member.name}
            width={150}
            height={150}
            className="rounded-full mx-auto mb-2"
          />
          <h4 className="font-bold">{member.name}</h4>
          <p className="text-sm text-gray-600">{member.position}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Example 3: Event Cards
 * Shows event images with smart loading
 */
export function EventCardsExample({
  events,
}: {
  events: Array<{
    id: string
    title: string
    image: string
    description: string
  }>
}) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border rounded-lg overflow-hidden">
          <SmartImage
            src={event.image}
            alt={event.title}
            width={600}
            height={300}
            className="w-full"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Example 4: Reports with PDF Links
 * Shows report covers with PDF download links
 */
export function ReportsExample({
  reports,
}: {
  reports: Array<{
    id: string
    title: string
    coverImage: string
    pdfUrl: string
  }>
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {reports.map((report) => (
        <div key={report.id} className="border rounded-lg p-4">
          {/* Cover Image from Supabase or local fallback */}
          <SmartImage
            src={report.coverImage}
            alt={report.title}
            width={250}
            height={300}
            className="w-full mb-4 rounded"
          />

          <h3 className="font-bold mb-2">{report.title}</h3>

          {/* PDF URL - already in database as Supabase URL */}
          <a
            href={report.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </a>
        </div>
      ))}
    </div>
  )
}

/**
 * Example 5: Direct URL Usage
 * When you need just the URL (not an image component)
 */
export function LinkWithFileUrl({
  filePath,
  label,
}: {
  filePath: string
  label: string
}) {
  const { primary, fallback, isDevelopment } = getFileUrl(filePath)

  return (
    <div>
      <a href={primary} className="text-blue-600 hover:underline">
        {label}
      </a>
      {isDevelopment && fallback && (
        <p className="text-xs text-gray-500">
          Dev: Primary: {primary.substring(0, 50)}...
          <br />
          Fallback: {fallback}
        </p>
      )}
    </div>
  )
}

/**
 * Example 6: Creating Database Records
 * How to store URLs when creating new gallery/report entries
 */
export async function createGalleryEntry(
  title: string,
  imageFile: File
): Promise<{ title: string; coverImage: string }> {
  // Step 1: Upload image to Supabase
  const formData = new FormData()
  formData.append('file', imageFile)

  const uploadResponse = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  const { path: imageUrl } = await uploadResponse.json()
  // imageUrl is already a full Supabase URL: https://...

  // Step 2: Store in database with Supabase URL
  const response = await fetch('/api/galleries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      coverImage: imageUrl, // Store full URL directly
    }),
  })

  return response.json()
}

/**
 * Example 7: Manual Seeding
 * How seed.ts uses the system
 */
export async function seedGalleries() {
  // This is how it works in prisma/seed.ts:
  // import { convertLocalPathToSupabaseUrl } from '@/lib/fileResolver'
  //
  // const galleries = [
  //   {
  //     title: 'Gallery 1',
  //     coverImage: convertLocalPathToSupabaseUrl('/images/gallery1/cover.jpg'),
  //     // Result: https://supabase.../images/gallery1/cover.jpg
  //   }
  // ]
  //
  // Then create records with these Supabase URLs
}

/**
 * Example 8: Error Handling
 * What happens when SmartImage can't load
 */
export function SmartImageWithErrorHandling() {
  return (
    <SmartImage
      src="/images/nonexistent/image.jpg"
      alt="This will fallback gracefully"
      width={300}
      height={200}
      className="rounded-lg"
      /* 
        Development: 
        1. Tries: https://supabase.../images/nonexistent/image.jpg (404)
        2. Falls back to: /images/nonexistent/image.jpg (also 404)
        3. Shows: "Image not available" message
        
        Production:
        1. Tries: https://supabase.../images/nonexistent/image.jpg (404)
        2. Shows: "Image not available" message
      */
    />
  )
}
