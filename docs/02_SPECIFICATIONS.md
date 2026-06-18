# Project Specifications — Khargharcha Maharaja

**Organisation:** Navnirman Sevabhavi Sanstha  
**Project:** Khargharcha Maharaja — Official Website  
**Location:** Kharghar, Navi Mumbai — 410210  
**Last Updated:** June 2026

---

## Organisation Details

| Field | Details |
|---|---|
| Organisation Name | Navnirman Sevabhavi Sanstha |
| Registration No. | महाराष्ट्र / १४६/२०१७ / रायगड |
| 80G Number | AACTN6650RF20241 |
| Address | Shop No.14, Sai Srushti CHS Ltd, Plot No.15, Sector 20, Kharghar, Navi Mumbai — 410210 |
| Phone | +91 9773801884 |
| Email | navnirmansevabhavisanstha2018@gmail.com |
| Instagram | @kharghar_cha_maharaja |
| YouTube | @khargharChaMaharaja |
| Website | https://khargharchamaharaja.com |

---

## Website Goals

1. Digital presence for the organisation's Ganesh Utsav and social activities
2. Enable visitor registration for events
3. Accept online donations with 80G tax benefit
4. Multilingual access for all regional communities in Kharghar
5. Live streaming integration for Ganesh darshan
6. Gallery of past events
7. Volunteer and membership registration

---

## Pages & Features

### Home Page
- Hero section with branded title image + background
- Stats strip (members, donations, events, volunteers)
- Donation widget with category + amount selection
- Advertisement section (for sponsors)
- Sponsors section
- Events preview (4 upcoming events)
- News & announcements
- Live streaming button
- Contact strip (address, phone, email, social links)

### Events Page
- Full list of 10 events with images, dates, venues
- Filter by category (Ganesh Utsav, Social Welfare, Medical, Cultural, National)
- Click-to-register (gated for registered users)

### Events List
| Event | Date | Type |
|---|---|---|
| Ganesh Utsav | 14 Sep 2026 (Friday) | Ganesh Utsav |
| Dahi Handi | 05 Sep 2026 (Saturday) | Festival |
| Holi | Mar 2027 | Cultural |
| Independence Day | 15 Aug 2026 | National |
| Republic Day | 26 Jan 2027 | National |
| Agri Koli Mohotsav | TBD 2026 | Cultural |
| School Book Donation | Jun 2026 | Social Welfare |
| Medical Camp | TBD 2026 | Medical |
| Blood Donation | TBD 2026 | Social Welfare |
| Social Awareness | TBD 2026 | Social Welfare |

### About Page
- Organisation history and mission
- Leadership team

### Gallery Page
- Photo gallery from past events
- Images: IMG_9487, IMG_9534, IMG_9535, IMG_9536, IMG_9537, IMG_9570

### Live Page
- YouTube live stream embed
- Schedule for live darshan

### Donate Page
- Amount selection (₹501, ₹1001, ₹2100, ₹5100, ₹11000, ₹21000 + custom)
- Category selection (Ganesh Utsav, Annadan, Medical, Education, Disaster Relief, General)
- 80G tax benefit information
- (Payment gateway integration — Phase 2)

### Contact Page
- Address with Google Maps link
- Phone, email
- Social media links
- Registration details (Reg. No. + 80G)
- Contact form

### Volunteer / Membership Pages
- Registration form (gated)

---

## Registration Form Specification

### User Profile Fields
| Field | Required | Notes |
|---|---|---|
| Name | Yes | Full name |
| Mobile | Yes | 10-digit Indian mobile |
| Email | No | Optional |
| Address Line 1 | Yes | |
| Address Line 2 | No | |
| Address Line 3 | No | |
| City | Yes | |
| State | Yes | |
| Pincode | Yes | 6-digit |

### Form Flow (4 Steps)
1. **Personal** — Name
2. **Address** — Line1, Line2, Line3, City, State, Pincode
3. **Contact** — Mobile, Email (optional)
4. **Done** — Confirmation screen

### Data Storage
- `localStorage` key: `km_user_profile`
- Phase 2: Supabase `registrations` table

---

## Internationalisation Specification

### Supported Languages
| Code | Language | Script |
|---|---|---|
| mr | Marathi | Devanagari (default) |
| hi | Hindi | Devanagari |
| en | English | Latin |
| gu | Gujarati | Gujarati |
| bn | Bengali | Bengali |
| pa | Punjabi | Gurmukhi |
| ta | Tamil | Tamil |
| te | Telugu | Telugu |
| ml | Malayalam | Malayalam |
| kn | Kannada | Kannada |

### Language Persistence
- Saved to `localStorage` key: `km_locale`
- Auto-redirect on next visit via `LocaleSync` component
- Session guard via `sessionStorage` key: `km_locale_redirected` (prevents redirect loops)

---

## Branding Specification

### Fonts
| Font | Usage |
|---|---|
| Yatra One | Hero title, Navbar brand name |
| Noto Sans Devanagari | Devanagari body text |
| Cinzel | Display headings |
| Inter | General body text |

### Colors
| Name | Hex | Usage |
|---|---|---|
| Saffron 500 | #ff6b00 | Primary brand colour |
| Saffron 700 | #c04b00 | Text on white (WCAG AA) |
| Maroon 950 | ~#2d0a0a | Dark backgrounds |
| Gold 400 | #fbbf24 | Accents |

### Logo
- File: `public/images/logo.jpg`
- Used in: Navbar only

### Brand Image (Hero Title)
- File: `public/images/KhargharchaMaharaja_Tbg.png`
- Transparent background PNG
- Displayed in HeroSection replacing text title

---

## Phase Roadmap

### Phase 1 — Complete ✅
- Full website UI (all pages, all languages)
- Registration modal (localStorage)
- Event images
- Favicon, SEO meta tags
- Performance optimisation
- Deployed to Vercel + custom domain

### Phase 2 — Pending (post-approval)
- Supabase integration (registration → database)
- Admin panel (manage events, registrations, donations)
- CMS for gallery/news/events
- Payment gateway (Razorpay) for donations
- Contact form email (Resend/SendGrid)
- Live streaming management

### Phase 3 — Future
- Mobile app (React Native)
- Push notifications for events
- QR code check-in for events
- Annual donor report generation
