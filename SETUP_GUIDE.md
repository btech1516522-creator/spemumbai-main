# Smart File Resolution - Quick Setup Guide

## What Was Implemented ✅

### 1. Core Utility (fileResolver.ts)
- Smart URL resolution with Supabase/local fallback
- Functions: `getFileUrl()`, `getSupabaseUrl()`, `convertLocalPathToSupabaseUrl()`
- Environment-aware (development vs production)

### 2. Smart Image Component (SmartImage.tsx)
- React component with automatic fallback handling
- Tries Supabase first, falls back to local files in development
- Shows graceful error state if file not found

### 3. Updated Seed File (seed.ts)
- Now imports `convertLocalPathToSupabaseUrl` from fileResolver
- Maintains all seed data with Supabase URLs
- Cleaner code, no duplication

### 4. Example Components (ExamplesSmartFiles.tsx)
- 8 real-world usage examples
- Gallery, Leadership, Events, Reports
- Database creation patterns
- Error handling

### 5. Complete Documentation (SMART_FILES_SYSTEM.md)
- Architecture overview with diagrams
- Usage guide for all functions
- Environment setup for dev/production
- Migration workflow
- Troubleshooting guide
- API reference

## How It Works 🎯

```
Files Needed
    ↓
Check Environment (NODE_ENV)
    ↓
Production? → Supabase URL only ✅
    ↓
Development? → Try Supabase, Fallback to Local ✅
```

## Implementation Checklist

### Phase 1: Setup (Complete ✅)

- [x] Created `src/lib/fileResolver.ts` - URL resolution utility
- [x] Created `src/components/SmartImage.tsx` - Image component with fallback
- [x] Updated `prisma/seed.ts` - Use fileResolver instead of local function
- [x] Updated database (npm run seed) - Seeds with Supabase URLs
- [x] Created examples and documentation

### Phase 2: Verify Everything Works

```bash
# 1. Check syntax
npm run build

# 2. Run tests if you have them
npm test

# 3. Start dev server
npm run dev

# 4. Test in browser at localhost:3000
```

### Phase 3: Migration (When Ready)

```bash
# 1. Backup existing local files
# 2. Run migration to Supabase
npx ts-node prisma/migrateImagesToSupabase.ts

# 3. Verify migration output
# 4. Seed database with Supabase URLs
npm run seed

# 5. Test website still works
# 6. For production: delete /public/images and /public/pdf
```

### Phase 4: Production Deployment

```bash
# 1. Build production bundle
npm run build

# 2. Delete local files (optional, server will ignore them)
# rm -r public/images
# rm -r public/pdf

# 3. Deploy to production
# All files load from Supabase bucket
```

## Using in Your Components 📝

### Quick Start: Display Image with Fallback

```tsx
import { SmartImage } from '@/components/SmartImage'

export function MyComponent() {
  return (
    <SmartImage
      src="/images/gallery/photo.jpg"
      alt="My photo"
      width={300}
      height={200}
    />
  )
}
```

**That's it!** Component handles:
- Supabase URL construction
- Local fallback in dev
- Error handling
- Graceful degradation

### For URLs Directly

```tsx
import { getFileUrl, getSupabaseUrl } from '@/lib/fileResolver'

// Get with fallback info
const { primary, fallback } = getFileUrl('/images/photo.jpg')

// Get Supabase URL only
const url = getSupabaseUrl('/images/photo.jpg')

// For database storage
import { convertLocalPathToSupabaseUrl } from '@/lib/fileResolver'
const url = convertLocalPathToSupabaseUrl('/images/photo.jpg')
```

## Environment Variables 🔧

Ensure `.env.local` (dev) has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=development
```

And `.env.production` (or deployment) has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

## Test Checklist ✅

- [ ] Development: SmartImage loads from Supabase
- [ ] Development: Falls back to local file if offline
- [ ] Development: npm run seed works
- [ ] Production: Images only load from Supabase
- [ ] Production: No local file fallback
- [ ] Upload: New files go to Supabase bucket
- [ ] Delete: Deleting from admin removes from bucket
- [ ] Error: Broken images show graceful message

## File Structure After Setup

```
src/
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── fileResolver.ts          ← NEW: URL resolution
├── components/
│   ├── SmartImage.tsx           ← NEW: Image with fallback
│   ├── ExamplesSmartFiles.tsx   ← NEW: Usage examples
│   └── ... (existing)
└── app/
    └── ... (existing)

prisma/
├── seed.ts                       ← UPDATED: Uses fileResolver
├── migrateImagesToSupabase.ts    ← EXISTING: Migration script
└── schema.prisma

public/
├── images/                       ← Keep for dev, delete for prod
└── pdf/                          ← Keep for dev, delete for prod

SMART_FILES_SYSTEM.md            ← NEW: Full documentation
```

## Next Steps

1. **Review** [SMART_FILES_SYSTEM.md](SMART_FILES_SYSTEM.md) for complete documentation
2. **Test** - Run `npm run dev` and check dev console
3. **Update Components** - Start using `SmartImage` in your pages
4. **Migrate** - Run migration script when ready
5. **Deploy** - Works seamlessly in production

## Troubleshooting

**Q: Images not loading in development?**
A: Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and files exist in `/public/images/`

**Q: Want to see which URL is being used?**
A: Import `getFileUrl()` and log the result: `const { primary, fallback } = getFileUrl(path)`

**Q: Already have images in database as local paths?**
A: Run `npm run seed` to update them to Supabase URLs

**Q: Need to upload new files?**
A: Use admin panel - automatically goes to Supabase

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT MODE                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Browser Request → SmartImage or getFileUrl()               │
│         ↓                                                     │
│  Try: https://supabase/.../images/gallery/photo.jpg         │
│         ↓                                                     │
│  Success: Use it ✓                                           │
│  Fails: Fall back to /images/gallery/photo.jpg ✓            │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION MODE                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Browser Request → SmartImage or getFileUrl()               │
│         ↓                                                     │
│  Use: https://supabase/.../images/gallery/photo.jpg only ✓  │
│         ↓                                                     │
│  Success: Display                                            │
│  Fails: Show error state                                     │
│                                                               │
│  (Local files completely ignored)                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FILE UPLOADS                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Admin uploads file                                          │
│         ↓                                                     │
│  /api/upload endpoint                                        │
│         ↓                                                     │
│  Always → Supabase bucket (both dev & prod)                 │
│         ↓                                                     │
│  Returns: https://supabase/.../file.jpg                     │
│         ↓                                                     │
│  Store in database with this URL                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Summary

✅ **Setup Complete!** You now have:

- Smart file resolution with Supabase + local fallback
- Automatic image component with error handling
- Updated seed system using centralized utilities
- Full documentation and examples
- Ready for development and production

**All new uploads go straight to Supabase**, existing files can fallback to local in development, and production is completely clean with no local storage needed!
