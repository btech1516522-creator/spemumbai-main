# Storage Structure: Local vs Supabase Bucket

## BEFORE Migration (Local Files Only)

```
/public/
├── images/
│   ├── dashboard/          (9 images - dashboard graphs)
│   ├── events/             (2 images - event thumbnails)
│   ├── gallery1/           (4 images - gallery 1 photos)
│   ├── gallery2/           (9 images - gallery 2 photos)
│   ├── gallery3/           (5 images - gallery 3 photos)
│   ├── gallery4/           (4 images - gallery 4 photos)
│   ├── gallery5/           (10 images - gallery 5 photos)
│   ├── leadership/         (16 images - leader photos)
│   ├── news/               (3 images - news thumbnails)
│   ├── report/             (3 images - report covers)
│   ├── sponsers/           (13 images - sponsor logos)
│   ├── student-chapters/   (25 images - chapter logos/photos)
│   ├── uploads/            (8 images - admin uploads)
│   └── [loose images]      (7 images - hero, placeholder, etc.)
│
└── pdf/
    ├── Spectrum-2024.pdf   (1 PDF)
    ├── Spectrum-2025.pdf   (1 PDF)
    └── Trending-Stories.pdf (1 PDF)

TOTAL: 131 images + 3 PDFs = 134 files
PROBLEM: ❌ Files stuck on local server (can't scale, can't backup easily)
```

## AFTER Migration (Supabase Bucket)

```
Supabase Bucket: "spe_mumbai"
│
├── images/
│   ├── dashboard/
│   │   ├── graph1.jpg
│   │   ├── graph2.jpg
│   │   ├── graph3.jpg
│   │   ├── graph4.jpg
│   │   ├── graph5.jpg
│   │   ├── graph6.jpg
│   │   ├── graph7.jpg
│   │   ├── graph8.jpg
│   │   └── graph9.jpg              (9 files)
│   │
│   ├── events/
│   │   ├── event-placeholder.jpg
│   │   └── tech_connect.jpeg        (2 files)
│   │
│   ├── gallery1/
│   │   ├── image1.jpeg
│   │   ├── image2.jpeg
│   │   ├── image3.jpeg
│   │   ├── img1.jpeg
│   │   ├── img2.jpeg
│   │   ├── img3.jpeg
│   │   └── img4.jpeg                (7 files)
│   │
│   ├── gallery2/
│   │   ├── img1.jpeg
│   │   ├── img2.jpeg
│   │   ├── img3.jpeg
│   │   ├── img4.jpeg
│   │   ├── img5.jpg
│   │   ├── img6.jpg
│   │   ├── img7.jpg
│   │   ├── img8.jpg
│   │   └── img9.jpeg                (9 files)
│   │
│   ├── gallery3/
│   │   ├── img1.jpeg
│   │   ├── img2.jpeg
│   │   ├── img3.jpeg
│   │   ├── img4.jpeg
│   │   └── img5.jpeg                (5 files)
│   │
│   ├── gallery4/
│   │   ├── ig19.jpg
│   │   ├── img1.jpg
│   │   ├── img2.jpg
│   │   └── img3.jpg                 (4 files)
│   │
│   ├── gallery5/
│   │   ├── photo1.jpeg
│   │   ├── photo10.jpeg
│   │   ├── photo2.jpeg
│   │   ├── photo3.jpeg
│   │   ├── photo4.jpeg
│   │   ├── photo5.jpeg
│   │   ├── photo6.jpeg
│   │   ├── photo7.jpeg
│   │   ├── photo8.jpeg
│   │   └── photo9.jpeg              (10 files)
│   │
│   ├── leadership/
│   │   ├── akshay-makhane.jpg
│   │   ├── bhartendu-bhardwaj.jpg
│   │   ├── manav-kanwar.jpg
│   │   ├── mohit-kapoor.jpg
│   │   ├── nk-mitra.jpg
│   │   ├── pankaj.jpg
│   │   ├── placeholder.jpg
│   │   ├── prem-kumar-verma.jpg
│   │   ├── rajiv-nischal.jpg
│   │   ├── ravi-shankar.jpg
│   │   ├── reghu-padmanabhan.jpg
│   │   ├── samarth-patwardhan.jpg
│   │   ├── sanjay-moitra.jpg
│   │   ├── shashank-jha.png
│   │   ├── tinku-nischal.jpg
│   │   └── tushar-garg.jpg          (16 files)
│   │
│   ├── news/
│   │   ├── news1.jpeg
│   │   ├── news2.jpeg
│   │   └── news3.jpeg               (3 files)
│   │
│   ├── report/
│   │   ├── rp.png
│   │   ├── rp2024.png
│   │   └── rp2025.png               (3 files)
│   │
│   ├── sponsers/
│   │   ├── abc.jpeg
│   │   ├── bp.jpeg
│   │   ├── chevron.jpeg
│   │   ├── energy.jpeg
│   │   ├── geolog.jpeg
│   │   ├── geoservice.jpeg
│   │   ├── lt.jpeg
│   │   ├── oe.jpeg
│   │   ├── oil_india.jpeg
│   │   ├── petroinnovate.jpeg
│   │   ├── sko.jpeg
│   │   ├── weatherford.jpeg
│   │   └── wellkin.jpeg             (13 files)
│   │
│   ├── student-chapters/
│   │   ├── ig1.jpg through ig19.jpg (19 files)
│   │   ├── img1.jpeg
│   │   ├── img1.jpg
│   │   ├── img2.jpeg
│   │   ├── img2.jpg
│   │   ├── img3.jpeg
│   │   ├── img3.jpg
│   │   ├── img4.jpeg
│   │   ├── img5.jpeg
│   │   ├── iitb-logo.png
│   │   ├── mitwpu-logo.png
│   │   ├── wadia-logo.png
│   │   └── wadia-logo.webp          (25 files)
│   │
│   ├── uploads/
│   │   ├── 1772897550156-sq3u968m09.jpg
│   │   ├── 1772897578619-9ooysjw5pfd.jpg
│   │   ├── 1773049541484-xzzj3rnnt3a.png
│   │   ├── 1773317825037-zz0y90d0vn.jpeg
│   │   ├── 1773319263432-ehs7e1978pm.jpeg
│   │   ├── 1773321211042-q0olq3n7keh.jpeg
│   │   └── 1773321745454-6k0wdeof8a7.jpeg (7 files)
│   │
│   └── [Root level images]
│       ├── baker_hughes.jpeg
│       ├── cairn_india.jpeg
│       ├── halliburton.jpeg
│       ├── hero-background.jpeg
│       ├── hero-bg.jpeg
│       ├── ongc.jpeg
│       ├── placeholder-logo.png
│       ├── placeholder-news.jpg
│       ├── reliance.jpeg
│       ├── schlumberger.jpeg
│       └── spe-logo.jpg             (11 files)
│
└── pdf/
    ├── Spectrum-2024.pdf
    ├── Spectrum-2025.pdf
    └── Trending-Stories.pdf         (3 files)

TOTAL IN BUCKET: 131 images + 3 PDFs

✅ BENEFITS:
  • Global CDN distribution (fast loading)
  • Scalable storage (unlimited)
  • Automatic backups
  • Built-in security
  • Version control
  • Easy sharing
```

## URL Examples

### **Before Migration (Local Paths):**
```
Dashboard image: /images/dashboard/graph1.jpg
Report cover: /images/report/rp.png
Report PDF: /pdf/Spectrum-2024.pdf
Leadership photo: /images/leadership/pankaj.jpg
Gallery image: /images/gallery1/image1.jpeg
```

### **After Migration (Supabase URLs):**
```
Dashboard image: https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/dashboard/graph1.jpg
Report cover: https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/report/rp.png
Report PDF: https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/pdf/Spectrum-2024.pdf
Leadership photo: https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/leadership/pankaj.jpg
Gallery image: https://ioamrtgbhsntawawmdzr.supabase.co/storage/v1/object/public/spe_mumbai/images/gallery1/image1.jpeg
```

## What Happens If You DON'T Migrate?

### ❌ **Local Files Only:**
```
/public/images/ & /public/pdf/
├─ Files stored on server disk
├─ Not accessible globally
├─ Hard to backup
├─ Storage limited by server
├─ Can't scale with traffic
├─ Difficult to restore if server crashes
└─ Admin can't manage/delete easily
```

### ✅ **After Migration to Bucket:**
```
Supabase Bucket (spe_mumbai)
├─ Files accessible from anywhere
├─ Global CDN for fast delivery
├─ Automatic backups & versioning
├─ Unlimited, scalable storage
├─ Handles traffic spikes
├─ One-click restore if needed
└─ Admin can view/manage/delete all files
```

## Current Status (✅ AFTER MIGRATION)

| Category | Local Files | Bucket | Database | Website |
|----------|-------------|--------|----------|---------|
| Dashboard (9 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Leadership (16 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Gallery (32 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Events (2 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| News (3 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Reports (3 images + 3 PDFs) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Sponsors (13 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Student Chapters (25 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| Admin Uploads (7 images) | ✅ Still here | ✅ Moved | ✅ Using bucket | ✅ Loading from bucket |
| **TOTAL** | **131 + 3** | **131 + 3** | **URLs→Bucket** | **All from Bucket ✅** |

## File Loading Priority

```
Website Request for Image
    ↓
Check Database for URL
    ↓
Is it a Supabase URL?
    ├─ YES → Use it directly ✅
    └─ NO → Convert to Supabase URL
        ├─ Development: Try local fallback if offline
        └─ Production: Error (local files not loaded)
```

## Best Practices Going Forward

### 1. **New File Uploads (Admin Panel)**
```
Upload files → /api/upload endpoint → Supabase bucket
              ↓
          Database stores Supabase URL
              ↓
          Website displays from bucket
```

### 2. **New PDFs Should Be**
```
Uploads → `pdf/` folder in bucket
       → Database stores as:
          "pdfUrl": "https://bucket.../pdf/report-name.pdf"
```

### 3. **Organize by Category**
```
images/
├── dashboard/    (for dashboard graphs/stats)
├── events/       (for event photos)
├── gallery1-5/   (for gallery albums)
├── leadership/   (for member photos)
├── news/         (for news thumbnails)
├── report/       (for report covers)
├── sponsers/     (for sponsor logos)
├── student-chapters/ (for chapter photos)
└── uploads/      (for admin uploads)

pdf/
└── (all PDFs here)
```

## Summary

✅ **Status:** Migration Complete!
- All 131 images moved to Supabase bucket
- All 3 PDFs moved to Supabase bucket  
- Database updated with Supabase URLs
- Local files kept as fallback for development
- Website loads all content from bucket

✅ **Next Steps:**
- New uploads → Always go to bucket
- Deletes → Remove from bucket only
- Production → Delete local files if needed
- Development → Keep local files for offline work
