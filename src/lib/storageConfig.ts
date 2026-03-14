/**
 * Storage Configuration
 * Supports multiple storage providers: Supabase, AWS S3, etc.
 * Change STORAGE_PROVIDER env var to switch between providers without code changes
 */

export type StorageProvider = 'supabase' | 'aws-s3' | 'local'

export interface StorageConfig {
  provider: StorageProvider
  baseUrl: string
  bucket?: string
}

function getStorageConfig(): StorageConfig {
  const provider = (process.env.NEXT_PUBLIC_STORAGE_PROVIDER || 'supabase') as StorageProvider

  switch (provider) {
    case 'aws-s3':
      return {
        provider: 'aws-s3',
        baseUrl: process.env.NEXT_PUBLIC_AWS_S3_URL || 'https://your-bucket.s3.amazonaws.com',
        bucket: process.env.NEXT_PUBLIC_AWS_BUCKET || 'spe-mumbai',
      }

    case 'local':
      return {
        provider: 'local',
        baseUrl: '',
        bucket: 'local',
      }

    case 'supabase':
    default:
      return {
        provider: 'supabase',
        baseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ioamrtgbhsntawawmdzr.supabase.co',
        bucket: 'spe_mumbai',
      }
  }
}

/**
 * Convert relative file path to full URL based on configured storage provider
 * @param relativePath - Relative path like "/images/leadership/pankaj.jpg"
 * @returns Full URL for the file
 *
 * @example
 * // Supabase
 * getFileUrl("/images/leadership/pankaj.jpg")
 * // => "https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg"
 *
 * // AWS S3
 * getFileUrl("/images/leadership/pankaj.jpg")
 * // => "https://your-bucket.s3.amazonaws.com/images/leadership/pankaj.jpg"
 */
export function getFileUrl(relativePath: string): string {
  if (!relativePath) return ''

  // Return full URLs as-is (for backward compatibility)
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath
  }

  const config = getStorageConfig()
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`

  switch (config.provider) {
    case 'aws-s3':
      return `${config.baseUrl}${cleanPath}`

    case 'local':
      return cleanPath

    case 'supabase':
    default:
      return `${config.baseUrl}/storage/v1/object/public/${config.bucket}${cleanPath}`
  }
}

/**
 * Extract relative path from full URL (for backward compatibility)
 * @param fullUrl - Full URL like "https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg"
 * @returns Relative path like "/images/leadership/pankaj.jpg"
 */
export function extractRelativePath(fullUrl: string): string {
  if (!fullUrl) return ''

  // Already a relative path
  if (!fullUrl.startsWith('http')) {
    return fullUrl
  }

  const config = getStorageConfig()

  if (config.provider === 'aws-s3') {
    const url = new URL(fullUrl)
    return url.pathname
  }

  if (config.provider === 'supabase') {
    const match = fullUrl.match(new RegExp(`/storage/v1/object/public/${config.bucket}(.+)$`))
    return match ? match[1] : fullUrl
  }

  return fullUrl
}

/**
 * Get current storage provider
 */
export function getCurrentStorageProvider(): StorageProvider {
  return getStorageConfig().provider
}

/**
 * Get current storage configuration
 */
export function getStorageConfigInfo(): StorageConfig {
  return getStorageConfig()
}
