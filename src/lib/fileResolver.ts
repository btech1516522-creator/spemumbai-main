/**
 * Smart File Resolver
 * 
 * Strategy:
 * - PRIMARY: Always use Supabase bucket URLs (production)
 * - FALLBACK: Local /public/ files only in development (offline development)
 * 
 * This allows:
 * - Production: Clean, no local files needed
 * - Development: Offline support with local fallback
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const BUCKET_NAME = 'spe_mumbai'
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

/**
 * Get file URL with intelligent fallback
 * 
 * @param localPath - Path relative to /public/ (e.g., "/images/gallery/photo.jpg")
 * @returns Object with primary (Supabase) and optional fallback (local) URLs
 */
export function getFileUrl(
  localPath: string
): { primary: string; fallback?: string; isDevelopment: boolean } {
  // Ensure path starts with /
  const cleanPath = localPath.startsWith('/') ? localPath : `/${localPath}`

  // PRIMARY URL: Always Supabase
  const supabaseUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}${cleanPath}`

  // FALLBACK: Local file in development only
  const fallbackUrl = IS_DEVELOPMENT ? cleanPath : undefined

  return {
    primary: supabaseUrl,
    fallback: fallbackUrl,
    isDevelopment: IS_DEVELOPMENT,
  }
}

/**
 * Get Supabase-only URL (for cases where you always want Supabase)
 * 
 * @param localPath - Path relative to /public/
 * @returns Full Supabase URL
 */
export function getSupabaseUrl(localPath: string): string {
  const cleanPath = localPath.startsWith('/') ? localPath : `/${localPath}`
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}${cleanPath}`
}

/**
 * Convert local path to Supabase URL (same as seed.ts)
 * Used for database seeding
 * 
 * @param localPath - Path relative to /public/
 * @returns Full Supabase URL
 */
export function convertLocalPathToSupabaseUrl(localPath: string): string {
  return getSupabaseUrl(localPath)
}

/**
 * Get optimal URL for image display
 * In development: tries Supabase, falls back to local
 * In production: uses Supabase only
 * 
 * @param localPath - Path relative to /public/
 * @returns URL to use in img src or similar
 */
export function getOptimalImageUrl(localPath: string): string {
  const { primary, fallback } = getFileUrl(localPath)
  // Client can use primary for fastest loading, browser will fallback if 404
  return primary
}

/**
 * HTML img tag with fallback support
 * Multiple sources allow browser to try Supabase first, then local
 * 
 * @param localPath - Path relative to /public/
 * @returns Source list for picture element or similar
 */
export function getImageSources(
  localPath: string
): Array<{ src: string; type: string }> {
  const { primary, fallback } = getFileUrl(localPath)
  const sources = [{ src: primary, type: 'primary' }]

  if (fallback) {
    sources.push({ src: fallback, type: 'fallback' })
  }

  return sources
}

/**
 * Check if URL is local path or remote URL
 */
export function isLocalPath(url: string): boolean {
  return url.startsWith('/') && !url.startsWith('//')
}

/**
 * Check if URL is Supabase URL
 */
export function isSupabaseUrl(url: string): boolean {
  return url.includes(BUCKET_NAME) && url.includes('/storage/v1/object/public/')
}

export default {
  getFileUrl,
  getSupabaseUrl,
  convertLocalPathToSupabaseUrl,
  getOptimalImageUrl,
  getImageSources,
  isLocalPath,
  isSupabaseUrl,
  IS_DEVELOPMENT,
  BUCKET_NAME,
  SUPABASE_URL,
}
