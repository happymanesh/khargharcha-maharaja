# Deployment Guide — Khargharcha Maharaja

**Last Updated:** June 2026

---

## Live URLs

| URL | Purpose |
|---|---|
| https://khargharchamaharaja.com | Primary domain |
| https://www.khargharchamaharaja.com | WWW redirect |
| https://website-pi-ruddy-23.vercel.app | Vercel default URL |

---

## Accounts & Access

| Service | Account | URL |
|---|---|---|
| GitHub | happymanesh | https://github.com/happymanesh/khargharcha-maharaja |
| Vercel | happymanesh-9514 | https://vercel.com |
| GoDaddy | (owner account) | https://godaddy.com |
| Supabase | (Phase 2) | https://supabase.com |

---

## How to Deploy a New Update

### Option A — Automatic (Recommended for future)
Connect GitHub to Vercel for auto-deploy on every push:
1. Go to Vercel Dashboard → Project Settings → Git
2. Connect to `happymanesh/khargharcha-maharaja`
3. Set Root Directory to `apps/website`
4. Every `git push` to `master` will auto-deploy

### Option B — Manual via CLI (Current method)
```bash
# 1. Make your changes in the code
# 2. Commit
git add .
git commit -m "your message"
git push origin master

# 3. Deploy to Vercel
cd apps/website
vercel --prod --yes
```

---

## DNS Configuration (GoDaddy)

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |
| NS | @ | (GoDaddy default — DO NOT CHANGE) | — |
| SOA | @ | (Auto-managed — DO NOT CHANGE) | — |
| TXT | @ | (Verification records — DO NOT CHANGE) | — |

---

## Vercel Project Settings

| Setting | Value |
|---|---|
| Framework | Next.js |
| Root Directory | `apps/website` |
| Build Command | `pnpm build` |
| Output Directory | `.next` |
| Node.js Version | 20.x |
| Region | Washington D.C. (iad1) |

---

## Adding a New Language

1. Create `apps/website/messages/{locale}/common.json` (copy from `en/common.json`)
2. Translate all values
3. Add locale to `apps/website/src/i18n/routing.ts` locales array
4. Add locale label to `localeLabels` in `Navbar.tsx`
5. Deploy

---

## Adding a New Event Image

1. Place image in `apps/website/public/images/`
2. Compress if >500KB: `node -e "require('sharp')('input.jpg').jpeg({quality:70}).toFile('output.jpg')"`
3. Update image path in `apps/website/src/app/[locale]/events/page.tsx`
4. If shown on home page, also update `apps/website/src/components/home/EventsPreview.tsx`
5. Commit and deploy

---

## Emergency Rollback

```bash
# View recent deployments
vercel ls

# Roll back to previous deployment
vercel rollback [deployment-url]
```

---

## Phase 2 Supabase Setup (When Ready)

### 1. Create Supabase project at supabase.com

### 2. Create registrations table
```sql
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  address_line3 TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  language TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Add environment variables to Vercel
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Install Supabase client
```bash
pnpm --filter website add @supabase/supabase-js
```
