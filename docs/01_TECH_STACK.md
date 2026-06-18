# Tech Stack — Khargharcha Maharaja Website

**Project:** Navnirman Sevabhavi Sanstha — Khargharcha Maharaja  
**Last Updated:** June 2026

---

## Overview

Monorepo architecture managed with **pnpm workspaces + Turborepo**, containing three apps: website, admin, and API.

---

## Repository Structure

```
KhargharchaMaharaja/
├── apps/
│   ├── website/        ← Public-facing website (LIVE)
│   ├── admin/          ← Admin dashboard (Phase 2)
│   └── api/            ← Backend REST API (Phase 2)
├── packages/           ← Shared utilities/types
├── docs/               ← This documentation
├── turbo.json
└── pnpm-lock.yaml
```

---

## Website (apps/website)

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 15.5.19 | App Router, RSC |
| Language | TypeScript | 5.x | Strict mode |
| React | React | 19.2.7 | |
| Styling | Tailwind CSS | 3.x | Custom color palette |
| i18n | next-intl | Latest | 10 locales |
| Icons | Lucide React | Latest | |
| Images | Next.js Image | Built-in | Auto WebP, lazy load |
| Fonts | Google Fonts | — | Yatra One, Noto Sans Devanagari, Cinzel |
| Package Manager | pnpm | 10.x | |

### Routing
- App Router (`/app/[locale]/...`)
- Dynamic locale prefix: `/mr`, `/hi`, `/en`, etc.
- Middleware handles locale detection and redirects

### Internationalisation (i18n)
- **Library:** `next-intl`
- **Locales:** Marathi (default), Hindi, English, Gujarati, Bengali, Punjabi, Tamil, Telugu, Malayalam, Kannada
- **Message files:** `apps/website/messages/{locale}/common.json`
- **Locale persistence:** `localStorage` key `km_locale`, session guard via `km_locale_redirected`

### Custom Tailwind Colors
```
saffron: 50–900  (base: #ff6b00)
maroon:  50–950  (base: #8B0000)
gold:    50–900  (base: #fbbf24)
```

---

## Admin Panel (apps/admin) — Phase 2

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Auth | Supabase Auth |
| Database client | Supabase JS SDK |
| UI | Tailwind CSS + shadcn/ui |

---

## API (apps/api) — Phase 2

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL via Supabase |
| ORM | Prisma (planned) |

---

## Infrastructure & Hosting

| Service | Platform | Tier | Purpose |
|---|---|---|---|
| Website hosting | Vercel | Free | Next.js deployment, CDN, SSL |
| Admin hosting | Vercel | Free | Separate Vercel project |
| Database | Supabase | Free (500MB) | PostgreSQL + Auth |
| Media storage | Supabase Storage / Cloudinary | Free | Event photos |
| Domain registrar | GoDaddy | Paid | khargharchamaharaja.com |
| Source control | GitHub | Free | happymanesh/khargharcha-maharaja |

### DNS Configuration
| Type | Name | Value |
|---|---|---|
| A | @ | 76.76.21.21 (Vercel) |
| CNAME | www | cname.vercel-dns.com |

### Live URLs
- **Production:** https://khargharchamaharaja.com
- **www:** https://www.khargharchamaharaja.com
- **Vercel default:** https://website-pi-ruddy-23.vercel.app
- **GitHub:** https://github.com/happymanesh/khargharcha-maharaja

---

## Development Setup

### Prerequisites
- Node.js 20+
- pnpm 10+

### Local Development
```bash
# Clone repository
git clone https://github.com/happymanesh/khargharcha-maharaja.git
cd khargharcha-maharaja

# Install dependencies
pnpm install

# Start website dev server
pnpm --filter website dev --port 3000

# Build for production
pnpm --filter website build
```

### Environment Variables (Phase 2)
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Performance (Lighthouse — Live Vercel)

| Metric | Score |
|---|---|
| Performance | 62 (mobile sim) |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 92 |
| TTFB | 10ms |

---

## Build Output (Production)

| Page | First Load JS |
|---|---|
| Home `/[locale]` | 145 kB |
| Events | 140 kB |
| Contact | 139 kB |
| Shared bundle | 102 kB |
