# Smart File Resolution System

## Overview

This system provides intelligent file resolution with automatic fallback support:

- **Production**: Files served from Supabase bucket only
- **Development**: Supabase first, falls back to local files for offline development
- **Upload**: All new uploads go directly to Supabase bucket

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    File Request                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │ Is Supabase │
                    │ configured? │
                    └──────┬──────┘
                           │
                    ┌──────▼──────────────┐
                    │ Try Supabase URL    │
                    │ (PRIMARY)           │
                    └──────┬──────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
              Success            Error/Missing
                │                     │
                │            ┌────────▼────────┐
                │            │ Development     │
                │            │ Mode?           │
                │            └────────┬────────┘
                │                     │
                │        ┌────────────┴────────────┐
                │        │                         │
                │      YES                        NO
                │        │                         │
                │   ┌────▼─────────┐         ┌────▼────┐
                │   │ Try Local    │         │ Error   │
                │   │ Fallback     │         └─────────┘
                │   └────┬─────────┘
                │        │
                └────┬───┴────┬─────┐
                     │        │     │
                 Success   Error  No file
                     │        │     │
                     └────┬───┴──┬──┘
                          │     │
                    ┌─────▼─────▼─┐
                    │ Use Result  │
                    └─────────────┘
```

## File Structure

```
src/
├── lib/
│   └── fileResolver.ts          ← Core utility (returns URLs with fallback)
│
├── components/
│   └── SmartImage.tsx           ← Image component (handles fallback display)
│
└── app/
    └── api/
        └── upload/
            └── route.ts          ← Upload endpoint (stores in Supabase)

prisma/
├── seed.ts                       ← Uses fileResolver for seeding
├── migrateImagesToSupabase.ts   ← Migration script (local → Supabase)
└── schema.prisma

public/                           ← Local files (for dev fallback only)
├── images/
└── pdf/
```

## Usage Guide

### 1. Using Smart Image Component

```tsx
// components/MyComponent.tsx
import { SmartImage } from '@/components/SmartImage'

export function GalleryImage() {
  return (
    <SmartImage
      src="/images/gallery/photo.jpg"
      alt="Gallery photo"
      width={400}
      height={300}
      className="rounded-lg"
    />
  )
}
```

**Behavior:**
- ✅ Development: Tries Supabase, falls back to local `/images/gallery/photo.jpg`
- ✅ Production: Uses Supabase URL only

### 2. Getting File URLs Directly

```tsx
// pages/ or components/
import { getFileUrl, getSupabaseUrl } from '@/lib/fileResolver'

// Get URL with fallback info
const { primary, fallback, isDevelopment } = getFileUrl('/images/report/doc.pdf')
console.log(primary)   // https://supabase.../pdf/...
console.log(fallback)  // /images/report/doc.pdf (dev only)

// Get Supabase URL only
const url = getSupabaseUrl('/images/leadership/photo.jpg')
// Always https://supabase.../images/leadership/photo.jpg
```

### 3. Seeding Database

```tsx
// prisma/seed.ts
import { convertLocalPathToSupabaseUrl } from '@/lib/fileResolver'

const data = {
  image: convertLocalPathToSupabaseUrl('/images/gallery/photo.jpg'),
  // Output: https://supabase.../images/gallery/photo.jpg
}
```

### 4. Uploading Files

```tsx
// Admin panel - upload goes to Supabase only
async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })
  
  const { path } = await response.json()
  // path: https://supabase.../storage/v1/object/public/spe_mumbai/images/...
}
```

## Environment Setup

### Development (.env.local)

```env
# Supabase (Primary)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# This tells system: we're in development
NODE_ENV=development
```

**What happens:**
- ✅ New uploads → Supabase bucket
- ✅ Image display → Tries Supabase, falls back to local files
- ✅ Seeding → Uses Supabase URLs
- ✅ Can work offline with local files as fallback

### Production (.env)

```env
# Supabase (Only Source)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# This tells system: we're in production
NODE_ENV=production
```

**What happens:**
- ✅ New uploads → Supabase bucket only
- ✅ Image display → Supabase URLs only (no fallback)
- ✅ No local files needed or checked
- ✅ Clean server, no storage waste

## Migration Workflow

### Step 1: Run Migration Script

```bash
# This moves all existing local files to Supabase bucket
npx ts-node prisma/migrateImagesToSupabase.ts
```

Console output:
```
✓ Uploaded: images/dashboard/img1.jpg
✓ Uploaded: images/gallery1/photo.jpg
✓ Uploaded: images/leadership/leader.jpg
✓ Uploaded: pdf/Spectrum-2024.pdf
✅ Migration complete! 47 files processed.
```

### Step 2: Update Database

Seeds with Supabase URLs:
```bash
npm run seed
```

Database now stores:
```json
{
  "image": "https://supabase.../images/leadership/leader.jpg",
  "pdfUrl": "https://supabase.../pdf/Spectrum-2024.pdf"
}
```

### Step 3: Keep Local Files for Development

Keep `/public/images/` and `/public/pdf/` directories as fallback during local development.

### Step 4: Deployment

```bash
# Production build
npm run build

# Deploy - local files are not needed
# All files loaded from Supabase bucket
```

## File Storage Summary

| Stage | Local Files | Supabase Bucket | Database | Browser |
|-------|------------|-----------------|----------|---------|
| Development | ✅ Kept | ✅ Yes | ✅ Supabase URLs | Primary: Supabase, Fallback: Local |
| Production | ❌ Deleted | ✅ Yes | ✅ Supabase URLs | Only: Supabase |

## API Reference

### `getFileUrl(localPath)`

Returns object with primary and fallback URLs.

```typescript
const result = getFileUrl('/images/gallery/photo.jpg')
// {
//   primary: 'https://supabase.../images/gallery/photo.jpg',
//   fallback: '/images/gallery/photo.jpg' (dev only),
//   isDevelopment: true
// }
```

### `getSupabaseUrl(localPath)`

Returns Supabase URL only.

```typescript
const url = getSupabaseUrl('/images/gallery/photo.jpg')
// 'https://supabase.../images/gallery/photo.jpg'
```

### `convertLocalPathToSupabaseUrl(localPath)`

Alias for `getSupabaseUrl` (used in seed.ts).

### `getOptimalImageUrl(localPath)`

Returns best URL for img src attribute.

```typescript
const src = getOptimalImageUrl('/images/photo.jpg')
```

### `getImageSources(localPath)`

Returns array for multi-source display.

```typescript
const sources = getImageSources('/images/photo.jpg')
// [
//   { src: 'https://supabase.../...', type: 'primary' },
//   { src: '/images/photo.jpg', type: 'fallback' }  (dev only)
// ]
```

### `SmartImage` Component

React component with automatic fallback handling.

```tsx
<SmartImage
  src="/images/photo.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}
  className="rounded-lg"
/>
```

## Benefits

✅ **Offline Development**: Work locally without network
✅ **Production Ready**: Clean servers, no local storage
✅ **Automatic Fallback**: Seamless experience
✅ **Easy Migration**: One-time script to move files
✅ **Centralized Logic**: All URL resolution in one place
✅ **No Code Changes**: Components work in both modes
✅ **Scalable**: Handle thousands of files
✅ **CDN Ready**: Supabase CDN serves files globally

## Troubleshooting

### Images not loading in development

1. Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL`
2. Verify local files exist in `/public/images/`
3. Check browser console for exact URL being requested
4. Run migration script: `npx ts-node prisma/migrateImagesToSupabase.ts`

### Images loading slowly

1. Supabase bucket might be in different region
2. Check CDN settings in Supabase dashboard
3. Use `priority` prop for above-fold images in SmartImage

### Old local paths still in database

1. Run seed script: `npm run seed`
2. Or update records manually with Supabase URLs

## Best Practices

✅ Always use `SmartImage` component for images
✅ Use `getSupabaseUrl()` when storing URLs in database
✅ Keep local files in `/public/` for dev fallback
✅ Never hardcode local paths in production code
✅ Use relative paths: `/images/...` not `public/images/...`
✅ Run migration script once after setup
✅ Test in both development and production modes
