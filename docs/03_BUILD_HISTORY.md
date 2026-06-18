# Build History & Feature Log — Khargharcha Maharaja

**Project:** Navnirman Sevabhavi Sanstha Website  
**Development Period:** June 2026  
**Developer:** Claude Code (AI-assisted development)  
**Owner:** happymanesh@gmail.com

---

## Session 1 — Foundation & Core Pages

### Features Built
- Next.js 15 monorepo setup (pnpm + Turborepo)
- App Router with `[locale]` dynamic segment
- next-intl i18n for 10 languages
- Tailwind CSS with custom saffron/maroon/gold palette
- Core pages: Home, About, Events, Gallery, Live, Contact, Donate, Volunteer, Membership
- Navbar with language switcher + user profile dropdown
- Footer with quick links, contact, social links
- HeroSection with Ganesh background image
- StatsSection, DonateSection, EventsPreview, NewsSection, SponsorsSection
- AdvertisementSection
- Registration modal (4-step form)
- UserContext with localStorage persistence
- useGatedAction hook (prompts registration for protected actions)
- LocaleSync component (saves/restores language preference)

### Issues Fixed
- AdvertisementSection showing Marathi in all languages → added `ads` namespace to all 10 JSON files
- JSON parse errors in 8 language files (triple `}}}` from PowerShell regex)
- LiveButton crash ("Cannot read properties of undefined reading 'call'") → removed unused `Link` import
- Hydration error (gap-3 vs gap-2 on Navbar) → cleared `.next` cache
- Google Maps iframe broken → replaced with clickable card linking to maps.app.goo.gl
- Yatra_One font import failure on Vercel → switched to Google Fonts `<link>` tag

---

## Session 2 — UI Refinements

### Features Built / Changed
- Removed duplicate stats strip from HeroSection (old wrong values)
- Updated event dates: Ganesh Utsav → 14 Sep 2026 Friday, Dahi Handi → 05 Sep 2026 Saturday
- Removed "Register Now" button from event cards → whole card is now clickable
- Removed blood group field from registration form
- Replaced area/bloodGroup/language fields with address fields (Line1, Line2, Line3, City, State, Pincode)
- Added logo (logo.PNG) to Navbar
- Registration: added email as optional field in step 3
- HeroSection: decorative title styling (red fill + gold WebkitTextStroke + dark shadow, Yatra One font)
- Added Reg. No. (महाराष्ट्र / १४६/२०१७ / रायगड) and 80G No. (AACTN6650RF20241) as pills in HeroSection
- Updated mobile number to +91 9773801884 across all pages
- Fixed Google Maps location to correct Kharghar address

---

## Session 3 — Branding & Performance

### Features Built / Changed
- Replaced HeroSection text title with branded PNG image (`KhargharchaMaharaja_Tbg.png`)
- Removed white/grey background from title PNG using sharp (pixel-level processing)
- Updated logo from logo.PNG to logo.jpg
- Removed newsletter section from Footer
- Added HomeContactStrip section on home page (above Footer)
  - Address card → links to Google Maps
  - Phone card → click to call
  - Email card → click to mail
  - Registration details (Reg. No. + 80G)
  - Social media links
- Added Registration Details card to Contact page
- Added event images: REPUBLICDAY.jpg, independenceDay.PNG, medicalcamp.jpeg, book_fest.jpeg
- Updated news dates to match 2026 event calendar
- Fixed stale "2025" dates in news translations (all 10 languages)

### Performance Optimisations
- Compressed images: KhargharchaMaharaja_Tbg.png 1.2MB → 153KB (87% saving)
- Compressed gallery images IMG_9xxx: 3.5–4.5MB → 1.5–1.7MB (60–64% saving)
- Added `fetchPriority="high"` to hero title image
- Generated favicon.ico + apple-touch-icon.png from logo.jpg
- Fixed Google Fonts render-blocking → `preload` + `noscript` fallback
- Fixed WCAG color contrast: `text-saffron-500` → `text-saffron-700/800` across all pages
- Fixed donate section: `text-gray-400` → `text-gray-600` for contrast
- Best Practices score: 96 → 100
- TBT (Total Blocking Time): 1,230ms → 370ms

---

## Session 4 — Production Deployment

### Deployment Steps
1. Committed all changes to git (35 files, 471 insertions)
2. Pushed to GitHub: `github.com/happymanesh/khargharcha-maharaja`
3. Deployed to Vercel production via Vercel CLI (`vercel --prod --yes`)
4. Verified all 7 pages return HTTP 200
5. Verified all 10 language routes working
6. Added custom domain `khargharchamaharaja.com` via Vercel CLI
7. Added `www.khargharchamaharaja.com` via Vercel CLI
8. Configured GoDaddy DNS: A record `76.76.21.21`, CNAME `www → cname.vercel-dns.com`
9. DNS propagated, SSL certificate provisioned automatically
10. Confirmed live: `https://khargharchamaharaja.com/mr` → HTTP 200

### Final Live Lighthouse Scores (Vercel Production)
| Category | Score |
|---|---|
| Performance | 62 (mobile throttled simulation) |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 92 |
| TTFB | 10ms |

---

## Pending — Phase 2

| Feature | Priority | Notes |
|---|---|---|
| Supabase registration table | High | Wire form → DB |
| Admin panel | High | Pending org approval |
| CMS for events/gallery/news | High | Pending org approval |
| Razorpay payment gateway | High | Donation form |
| Contact form email (Resend) | Medium | |
| Remaining color contrast fixes | Low | RegistrationModal, SponsorsSection |
| Gallery page real photos | Medium | Add more event photos |
| SEO: structured data for events | Low | Schema.org Event type |
