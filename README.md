# SPE Mumbai Section Website

A modern, responsive website for the **Society of Petroleum Engineers (SPE) Mumbai Section** built with Next.js, Tailwind CSS, TypeScript, Prisma ORM, and SQLite.

🔗 **Repository:** [github.com/Petroinnovate/spemumbai](https://github.com/Petroinnovate/spemumbai)

---

## 📋 Changelog

### v1.3.0 — Live Data on Public Pages & Admin Save Fix (Mar 7, 2026)

#### ✅ Database Seeding
- Created `prisma/seed.js` — a plain Node.js script that populates the empty database with all existing static content
- Seeds **15 leadership members**, **3 reports** (Trending Stories, Spectrum 2025, Spectrum 2024), **1 event** (Tech Connect Session), and hero text
- Script is idempotent — skips seeding if data already exists (safe to re-run)
- Run manually with:
  ```bash
  node prisma/seed.js
  ```
- Added `"seed": "node prisma/seed.js"` to `package.json` scripts

#### ✅ Admin Panel — Save Fix
- **Bug fixed:** Previously, clicking "Done" after editing only closed the form without saving to the database — changes were lost on page refresh
- All three admin pages (Events, Leadership, Reports) now have a **"Save Changes"** button inside the edit form that saves directly to the database and closes the form in one click
- Removed the separate "Save All" button at the bottom of each page — no longer needed

#### ✅ Public Pages Connected to Database
Previously all public pages used hardcoded static data files — admin changes had no effect on the live site. All three are now fully database-driven:

| Public Page | Before | After |
|---|---|---|
| `/leadership` | Hardcoded `data/leadership.ts` | Reads from `LeadershipMember` DB table |
| `/reports` | Hardcoded static array | Reads from `Report` DB table |
| `/events` (FeaturedEvents) | Hardcoded static array | Fetches from `/api/content?type=events` |

- All public pages have a **static fallback** to the original hardcoded data if the database is empty
- `revalidate = 0` set on server components so changes appear immediately on refresh — no cache delay

#### ✅ Bug Fix
- Fixed TypeScript error in `reports/page.tsx` — `coverImage` from database is `string | null`; converted to `string | undefined` using `?? undefined` so it fits the `<img src>` type

---

### v1.2.0 — Database Integration & Change History (Mar 7, 2026)

#### ✅ Database — Prisma ORM + SQLite
- Migrated from file-based JSON storage to a proper **SQLite database** (`dev.db`)
- **Prisma ORM** used as the query layer — no raw SQL anywhere in the app
- Schema defined in `prisma/schema.prisma` (single source of truth for all tables)
- Database file lives at the project root: `dev.db`
- Migrations tracked in `prisma/migrations/`

#### ✅ Database Tables

| Table | What it stores |
|---|---|
| `SiteContent` | Hero title, subtitle, and other key-value site text |
| `Announcement` | Announcements shown on the homepage |
| `Event` | Events with title, date, location, description |
| `LeadershipMember` | Committee members with photo, bio, LinkedIn |
| `Report` | Reports with PDF links and cover images |
| `AuditLog` | Full history of every admin change (see below) |

#### ✅ Change History & Audit Log
- Every time an admin saves any content, a row is written to `AuditLog` automatically
- Records: which table changed, the **full JSON snapshot before**, the **full JSON snapshot after**, who changed it, and when
- New admin page at `/admin/history` to browse all changes
- Filter by section (Events, Announcements, Leadership, Reports, Site Content)
- Each entry shows Previous Data (red) vs New Data (green) — expandable JSON view
- History is **never deleted** — permanent record of all changes

#### ✅ New API
- `GET /api/audit` — returns full change history (admin-only)
- `GET /api/audit?table=Event` — filter history by table name

#### ✅ Admin Panel — History Tab
- New **History** sidebar link added to admin panel
- Clock icon in sidebar navigation
- Shows newest changes first
- Works on both desktop and mobile sidebar

---

### v1.1.0 — Admin Panel & Role-Based Access Control (Feb 28, 2026)

#### ✅ Authentication System
- Integrated **NextAuth.js** with credentials-based login
- Admin-only authentication (no public sign-up)
- JWT session strategy with role stored in token
- Login page at `/auth/login` titled **"Admin Login"**
- Unauthorized access page at `/auth/unauthorized`

#### ✅ Role-Based Access Control (RBAC)
- **Admin role** — full access to view, create, edit, and delete all content
- **Non-admin users** — can browse the public site but cannot access `/admin` routes
- Middleware protection on all `/admin/*` routes — redirects unauthorized users
- Custom `useRole` React hook for role checks
- `AdminOnly` wrapper component to conditionally render admin-only UI
- `AdminEditButton` and `RoleBadge` reusable components

#### ✅ Admin Panel (`/admin`)
| Page | Route | Description |
|------|-------|-------------|
| Overview | `/admin` | Dashboard with stats, quick actions, and permissions table |
| Content | `/admin/content` | Edit hero section title/subtitle and manage announcements |
| Events | `/admin/events` | Create, edit, and delete events |
| Leadership | `/admin/leadership` | Add/edit/remove committee members |
| Reports | `/admin/reports` | Manage downloadable reports and publications |
| History | `/admin/history` | Full audit log of every admin change with before/after data |

- Responsive sidebar layout with navigation
- User info panel with role badge and sign-out
- "View Site" link to return to the public website

#### ✅ Content Management API
- `GET /api/content` — fetch all content or by type (public)
- `PUT /api/content` — update content (admin-only, returns 403 for non-admins)
- All data stored in SQLite database via Prisma

#### ✅ Navigation Updates
- Added a **three-bar (☰) dropdown menu** at the top-right of the navbar
- When not logged in → shows **"Admin Login"** link
- When logged in as admin → shows user name, **"Admin Panel"** link, and **"Logout"** button
- Same behavior on mobile navigation

---

### v1.0.0 — Initial Website (Cloned from repo)

#### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, featured events, news, leadership preview, sponsors, CTA |
| Leadership | `/leadership` | Committee members grid with photos and details |
| Dashboard | `/dashboard` | Performance metrics with 9 interactive graph cards |
| Events | `/events` | All upcoming and past events |
| Students | `/students` | 4 student chapters with tab-based switching |
| Volunteering | `/volunteering` | Volunteer opportunities across 4 categories |
| Reports | `/reports` | 3 downloadable reports (PDFs) |
| Gallery | `/gallery` | Event photo galleries with sub-pages |
| Contact | `/contact` | Contact form, info, and Google Maps |
| FAQ | `/faq` | 10 FAQs with category filter and accordion |

#### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Heroicons, React Icons
- **Auth:** NextAuth.js
- **Database:** SQLite via Prisma ORM

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/Petroinnovate/spemumbai.git
cd spemumbai
npm install
```

### Environment Setup
The `.env` file in the root already contains the database URL for local development:
```env
DATABASE_URL="file:./dev.db"
```

Create a `.env.local` file for auth secrets:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@spemumbai.org
ADMIN_PASSWORD=admin123
```

### Database Setup (first time only)
```bash
# Apply all migrations to create the database tables
npx prisma migrate deploy

# Regenerate the Prisma client
npx prisma generate

# Seed the database with initial content (leadership, reports, events)
node prisma/seed.js
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

> If port 3000 is busy, stop all Node processes first:
> ```powershell
> Get-Process -Name "node" | Stop-Process -Force
> ```

### Build for Production
```bash
npm run build
npm start
```

---

## � Prisma ORM

### What is Prisma?
Prisma is an **ORM (Object Relational Mapper)** — it sits between the app code and the database so you never write raw SQL. All queries are written in TypeScript and Prisma translates them into the correct SQL automatically.

### Without Prisma vs With Prisma

**Without Prisma (raw SQL):**
```js
db.query("SELECT * FROM Event WHERE active = 1 ORDER BY sortOrder ASC")
```

**With Prisma:**
```ts
prisma.event.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } })
```
Same result — but written in TypeScript, auto-completed by VS Code, and type-safe.

### Why Prisma is Used Here

| Reason | Explanation |
|---|---|
| **No raw SQL** | All queries are TypeScript — easier to read and maintain |
| **Type safety** | If you query a field that doesn't exist, TypeScript catches it before runtime |
| **Schema as source of truth** | `prisma/schema.prisma` defines all tables in one place |
| **Auto migrations** | Run one command and Prisma creates/updates DB tables automatically |
| **Database flexibility** | Change `provider = "sqlite"` → `"postgresql"` and all queries work on AWS RDS without any rewrite |
| **Prisma Studio** | Free built-in browser UI to view and edit database data visually |

### How It Works in This Project

```
Admin saves data in the panel
        ↓
API Route  (src/app/api/content/route.ts)
        ↓
prisma.event.create(...)   ← Prisma translates this to SQL
        ↓
SQLite database  (dev.db)  ← Data saved
        ↓
prisma.auditLog.create(...)← Previous data snapshot also saved
        ↓
AuditLog table             ← Full history recorded
```

### Key Prisma Files

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Defines all database tables (the blueprint) |
| `prisma/migrations/` | Auto-generated SQL migration history |
| `src/lib/db.ts` | Prisma client singleton used across all API routes |
| `src/generated/prisma/` | Auto-generated typed client — **do not edit manually** |

---

## �🗄️ Database

### Where Data is Stored
All data is stored in a single SQLite file at the project root:
```
dev.db
```

### What's Inside
| Table | Contents |
|---|---|
| `SiteContent` | Hero title, subtitle, site text |
| `Announcement` | Homepage announcements |
| `Event` | Events listing |
| `LeadershipMember` | Committee members |
| `Report` | Reports and PDF references |
| `AuditLog` | Complete history of every admin change |

### Viewing the Database

**Option 1 — Prisma Studio (recommended, browser-based)**
```bash
npx prisma studio
```
Opens at `http://localhost:5555` — visual table browser, no extra install needed.

**Option 2 — DB Browser for SQLite (desktop app)**
Download from [sqlitebrowser.org](https://sqlitebrowser.org), then open `dev.db` from the project root.

**Option 3 — Admin History page**
Go to `/admin/history` in the running app — shows all changes made by admin in a human-readable format.

### Adding a New Migration
After editing `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name describe_your_change
npx prisma generate
```

---

## 🔐 Admin Access

| Field | Value |
|-------|-------|
| URL | `/auth/login` |
| Email | `admin@spemumbai.org` |
| Password | `admin123` |

> ⚠️ Change these credentials in `.env.local` before deploying to production.

### How to Access the Admin Panel
1. Click the **☰ menu** icon at the top-right of the navigation bar
2. Click **"Admin Login"**
3. Enter admin credentials
4. Click ☰ again → **"Admin Panel"**

### What Admin Can Do
| Section | Actions |
|---|---|
| **Content** | Edit hero title & subtitle on homepage |
| **Events** | Add, edit (click Edit → change fields → Save Changes), delete events |
| **Leadership** | Add, edit (click Edit → change fields → Save Changes), delete members with photos |
| **Reports** | Add, edit (click Edit → change fields → Save Changes), delete reports with PDF uploads |
| **Announcements** | Add, edit, delete announcements |
| **History** | View full change log — see what changed, by whom, and when |

> **Note:** After clicking **Save Changes** in the admin panel, the corresponding public page (`/leadership`, `/events`, `/reports`) will reflect the update immediately on the next page refresh — no server restart required.

---

## ☁️ Moving to AWS (Future)

The app is designed so switching from local SQLite to AWS PostgreSQL requires **zero code changes** — only environment variable changes.

### When You're Ready to Deploy on AWS

**Step 1 — Change the Prisma provider**

In `prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "sqlite"
}
```
to:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Step 2 — Update `.env` on AWS (e.g. EC2 or Elastic Beanstalk)**
```env
DATABASE_URL=postgresql://user:password@your-rds-endpoint.amazonaws.com:5432/spemumbai
NEXTAUTH_SECRET=strong-random-secret
NEXTAUTH_URL=https://your-domain.com
```

**Step 3 — Run migrations on AWS**
```bash
npx prisma migrate deploy
```

**That's it.** All your API routes, admin panel, and history logging work identically on AWS.

> Note: Uploaded images/PDFs are currently stored in `public/` on disk. On AWS, these should be moved to **S3** so they persist across server restarts.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin sidebar layout
│   │   ├── page.tsx            # Admin overview dashboard
│   │   ├── content/            # Content management
│   │   ├── events/             # Events management
│   │   ├── leadership/         # Leadership management
│   │   ├── reports/            # Reports management
│   │   └── history/            # Audit log / change history
│   ├── api/
│   │   ├── auth/               # NextAuth API route
│   │   ├── content/            # Content CRUD API (logs to AuditLog)
│   │   ├── audit/              # Audit log read API
│   │   └── upload/             # File upload API
│   ├── auth/
│   │   ├── login/              # Admin login page
│   │   └── unauthorized/       # Access denied page
│   ├── contact/
│   ├── dashboard/
│   ├── events/
│   ├── faq/
│   ├── gallery/
│   ├── leadership/
│   ├── reports/
│   ├── students/
│   ├── volunteering/
│   ├── layout.tsx              # Root layout with AuthProvider
│   └── page.tsx                # Home page
├── components/
│   ├── auth/
│   │   └── RoleGuard.tsx       # AdminOnly, AdminEditButton, RoleBadge
│   ├── common/
│   ├── layout/
│   │   ├── Navigation.tsx      # Main navbar with admin dropdown
│   │   └── Footer.tsx
│   ├── providers/
│   │   └── AuthProvider.tsx    # NextAuth SessionProvider
│   └── sections/
├── hooks/
│   └── useRole.ts              # Custom hook for role checks
├── lib/
│   ├── auth.ts                 # NextAuth configuration & user roles
│   └── db.ts                  # Prisma client singleton
├── generated/
│   └── prisma/                 # Auto-generated Prisma client (do not edit)
└── middleware.ts               # Route protection middleware
prisma/
├── schema.prisma               # Database schema — all tables defined here
├── seed.js                     # Seed script — populates DB with initial static data
└── migrations/                 # Migration history (auto-generated)
dev.db                          # SQLite database file (local only, not in Git)
```

---

## 👤 Author

**Prem** — SPE Mumbai Section

---
