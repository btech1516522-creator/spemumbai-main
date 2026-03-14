/**
 * Migration Script: Convert Full URLs to Relative Paths
 * Converts all Supabase URLs in database to relative paths
 * This makes the database storage-agnostic (works with Supabase, AWS S3, etc)
 * 
 * Usage: node prisma/migrate-urls.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') })

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

/**
 * Extract relative path from Supabase URL
 * @param {string} url - Full URL like "https://ioamrtgbhsntadadmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg"
 * @returns {string} Relative path like "/images/leadership/pankaj.jpg"
 */
function extractRelativePath(url) {
  if (!url) return url
  
  // Already a relative path
  if (!url.startsWith('http')) {
    return url
  }

  // Check if it's a Supabase URL
  if (url.includes('ioamrtgbhsntadadmdzr.supabase.co')) {
    const match = url.match(/\/storage\/v1\/object\/public\/spe_mumbai(.+?)(?:\?|$)/)
    if (match) {
      return match[1]
    }
  }

  // Check if it's an AWS S3 URL
  if (url.includes('.s3.amazonaws.com')) {
    const url_obj = new URL(url)
    return url_obj.pathname
  }

  // Return as-is if can't parse
  return url
}

async function main() {
  console.log('🔄 Starting URL migration to relative paths...\n')

  try {
    // Migrate LeadershipMember images
    console.log('📝 Migrating LeadershipMember images...')
    const leadershipMembers = await prisma.leadershipMember.findMany()
    let leadershipUpdated = 0

    for (const member of leadershipMembers) {
      if (member.image && member.image.startsWith('http')) {
        const relativePath = extractRelativePath(member.image)
        await prisma.leadershipMember.update({
          where: { id: member.id },
          data: { image: relativePath },
        })
        leadershipUpdated++
        console.log(`   ✓ ${member.name}: ${relativePath}`)
      }
    }
    console.log(`   Total updated: ${leadershipUpdated}\n`)

    // Migrate Report images and PDFs
    console.log('📝 Migrating Report images and PDFs...')
    const reports = await prisma.report.findMany()
    let reportsUpdated = 0

    for (const report of reports) {
      let updated = false

      if (report.coverImage && report.coverImage.startsWith('http')) {
        const relativePath = extractRelativePath(report.coverImage)
        await prisma.report.update({
          where: { id: report.id },
          data: { coverImage: relativePath },
        })
        updated = true
        console.log(`   ✓ ${report.title} (cover): ${relativePath}`)
      }

      if (report.pdfUrl && report.pdfUrl.startsWith('http')) {
        const relativePath = extractRelativePath(report.pdfUrl)
        await prisma.report.update({
          where: { id: report.id },
          data: { pdfUrl: relativePath },
        })
        updated = true
        console.log(`   ✓ ${report.title} (pdf): ${relativePath}`)
      }

      if (updated) reportsUpdated++
    }
    console.log(`   Total updated: ${reportsUpdated}\n`)

    // Migrate Event images
    console.log('📝 Migrating Event images...')
    const events = await prisma.event.findMany()
    let eventsUpdated = 0

    for (const event of events) {
      if (event.image && event.image.startsWith('http')) {
        const relativePath = extractRelativePath(event.image)
        await prisma.event.update({
          where: { id: event.id },
          data: { image: relativePath },
        })
        eventsUpdated++
        console.log(`   ✓ ${event.title}: ${relativePath}`)
      }
    }
    console.log(`   Total updated: ${eventsUpdated}\n`)

    // Migrate GalleryEvent images and JSON
    console.log('📝 Migrating GalleryEvent images...')
    const galleries = await prisma.galleryEvent.findMany()
    let galleriesUpdated = 0

    for (const gallery of galleries) {
      let updated = false

      if (gallery.coverImage && gallery.coverImage.startsWith('http')) {
        const relativePath = extractRelativePath(gallery.coverImage)
        await prisma.galleryEvent.update({
          where: { id: gallery.id },
          data: { coverImage: relativePath },
        })
        updated = true
        console.log(`   ✓ ${gallery.title} (cover): ${relativePath}`)
      }

      if (gallery.images) {
        try {
          let images = JSON.parse(gallery.images)
          let imageUpdated = false

          images = images.map((img) => {
            if (img.startsWith('http')) {
              imageUpdated = true
              return extractRelativePath(img)
            }
            return img
          })

          if (imageUpdated) {
            await prisma.galleryEvent.update({
              where: { id: gallery.id },
              data: { images: JSON.stringify(images) },
            })
            updated = true
            console.log(`   ✓ ${gallery.title} (${images.length} images): converted to relative paths`)
          }
        } catch (e) {
          console.log(`   ⚠  Skipped ${gallery.title}: invalid JSON`)
        }
      }

      if (updated) galleriesUpdated++
    }
    console.log(`   Total updated: ${galleriesUpdated}\n`)

    console.log('✅ Migration complete!')
    console.log('\n📋 Summary:')
    console.log(`   - LeadershipMember: ${leadershipUpdated} updated`)
    console.log(`   - Report: ${reportsUpdated} updated`)
    console.log(`   - Event: ${eventsUpdated} updated`)
    console.log(`   - GalleryEvent: ${galleriesUpdated} updated`)
    console.log('\n💡 All URLs now stored as relative paths!')
    console.log('   Set NEXT_PUBLIC_STORAGE_PROVIDER env var to switch storage:')
    console.log('   - "supabase" (default)')
    console.log('   - "aws-s3"')
    console.log('   - "local"')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
