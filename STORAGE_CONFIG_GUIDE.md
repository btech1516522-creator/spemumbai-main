# Storage-Agnostic Configuration Guide

## Overview

The SPE Mumbai website now uses a **storage-agnostic architecture** that supports multiple storage providers:

- **Supabase** (current/development)
- **AWS S3** (production migration-ready)
- **Local Storage** (local development)

## 🔄 How It Works

### 1. Database Stores Relative Paths Only

Instead of storing full URLs like:
```
❌ https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg
```

The database stores:
```
✅ /images/leadership/pankaj.jpg
```

### 2. Storage Config Resolves URLs at Runtime

The `storageConfig.ts` utility converts relative paths to full URLs based on environment configuration:

```typescript
// In components
import { getFileUrl } from '@/lib/storageConfig'

const fullUrl = getFileUrl('/images/leadership/pankaj.jpg')
// Output depends on NEXT_PUBLIC_STORAGE_PROVIDER:
// Supabase: https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg
// AWS S3:   https://your-bucket.s3.amazonaws.com/images/leadership/pankaj.jpg
```

### 3. Components Use SmartImage

All image components automatically use the storage config:

```typescript
// In any component
<SmartImage src="/images/leadership/pankaj.jpg" alt="Pankaj Kumar" />
// Automatically resolves using storageConfig
```

## 🚀 Configuration

### Development (Supabase)

`.env.local` (already configured):
```env
NEXT_PUBLIC_STORAGE_PROVIDER="supabase"
NEXT_PUBLIC_SUPABASE_URL="https://ioamrtgbhsntawawmdzr.supabase.co"
```

### Production (AWS S3)

To switch to AWS S3, update `.env.local`:

```env
NEXT_PUBLIC_STORAGE_PROVIDER="aws-s3"
NEXT_PUBLIC_AWS_S3_URL="https://your-bucket.s3.amazonaws.com"
NEXT_PUBLIC_AWS_BUCKET="spe-mumbai"

# AWS Credentials (if needed)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
```

Then restart the application:
```bash
npm run dev
```

**That's it!** All images automatically switch to AWS S3.

## 📁 File Structure

| File | Purpose |
|------|---------|
| `src/lib/storageConfig.ts` | Storage provider configuration |
| `src/components/SmartImage.tsx` | Image component using storage config |
| `prisma/seed.js` | Seeds database with relative paths |
| `prisma/migrate-urls.js` | Migrates existing URLs to relative paths |

## 🔧 Available Functions

### `getFileUrl(relativePath: string): string`

Converts relative paths to full URLs based on configured provider.

```typescript
import { getFileUrl } from '@/lib/storageConfig'

getFileUrl('/images/leadership/pankaj.jpg')
// Returns appropriate URL for configured storage
```

### `extractRelativePath(fullUrl: string): string`

Extracts relative path from full URL (for backward compatibility).

```typescript
import { extractRelativePath } from '@/lib/storageConfig'

extractRelativePath('https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg')
// Returns: /images/leadership/pankaj.jpg
```

### `getCurrentStorageProvider(): StorageProvider`

Returns the currently active storage provider.

```typescript
import { getCurrentStorageProvider } from '@/lib/storageConfig'

const provider = getCurrentStorageProvider()
// Returns: 'supabase' | 'aws-s3' | 'local'
```

## 📝 Database Migration

When switching storage providers, use the migration script to ensure all existing URLs are in relative format:

```bash
npm run migrate:urls
```

This script:
- ✅ Converts all Supabase URLs to relative paths
- ✅ Converts all AWS S3 URLs to relative paths
- ✅ Updates LeadershipMember, Report, Event, and GalleryEvent tables
- ✅ Preserves all image data (only changes storage format)

## 🔄 Migration Path: Supabase → AWS

### Step 1: Ensure database has relative paths
```bash
npm run migrate:urls
```

### Step 2: Update environment variables
```env
NEXT_PUBLIC_STORAGE_PROVIDER="aws-s3"
NEXT_PUBLIC_AWS_S3_URL="https://your-bucket.s3.amazonaws.com"
```

### Step 3: Copy files to AWS S3
- Upload all files from `public/images/` to S3 `/images/`
- Upload all files from `public/pdf/` to S3 `/pdf/`
- Maintain exact folder structure

### Step 4: Restart application
```bash
npm run dev
```

All images now load from AWS S3 automatically!

## ✅ Benefits

1. **Zero Code Changes Needed** - Switch storage providers by changing environment variables only
2. **Future-Proof** - Easily add new storage providers (Google Cloud, Azure Blob, etc.)
3. **Manager Review Compatible** - Works on both Supabase (dev) and AWS (production)
4. **Backward Compatible** - Handles full URLs if encountered (for migration safety)
5. **Decoupled Storage** - Database doesn't depend on specific storage provider

## 🐛 Troubleshooting

### Images not loading after switching providers

1. Check `NEXT_PUBLIC_STORAGE_PROVIDER` is set correctly
2. Verify files exist in the target storage location
3. Check file paths are correct (relative paths must start with `/`)
4. Run `npm run migrate:urls` to ensure database has relative paths

### Getting wrong URL format

```typescript
// Debug: Check what URL is being resolved
import { getFileUrl, getStorageConfigInfo } from '@/lib/storageConfig'

console.log('Storage Config:', getStorageConfigInfo())
console.log('File URL:', getFileUrl('/images/leadership/pankaj.jpg'))
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)

---

**Last Updated**: March 14, 2026  
**Status**: ✅ Production Ready
