# ReelForge AI — AI Reel Generator SaaS

Production-ready full-stack SaaS for creators. Generate viral hooks, full reel scripts, captions, hashtags, scene breakdowns, camera angles, editing tips, and B-roll ideas powered by **Groq AI**, with **Supabase** auth & database.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ecf8e)

## Features

### Landing Page
- Premium dark SaaS UI with animated gradients & glassmorphism
- Hero, trusted creators, features, AI demo, testimonials, pricing, FAQ, CTA, footer
- Fully responsive (mobile → ultra-wide)

### Authentication
- Google OAuth login
- Email/password signup & login
- Protected dashboard routes via middleware
- Persistent sessions & logout
- User profile dropdown

### Dashboard
- Sidebar navigation (desktop) + bottom nav (mobile)
- Overview with analytics cards & recent generations
- Generate page with full AI output cards
- Saved reels, trending ideas, analytics
- Settings, profile, billing pages

### AI Generation
- Input: topic, niche, tone, platform
- Output: viral hook, script, scenes, captions, hashtags, CTA, camera angles, editing, B-roll
- Copy, save, download (JSON/TXT), regenerate actions

### Security
- Server-side Groq API calls only
- Protected API routes with Supabase session
- Row Level Security on all tables
- Environment variables for secrets

---

## Installation

### Prerequisites
- Node.js 18+
- npm or pnpm
- [Supabase](https://supabase.com) account
- [Groq](https://console.groq.com) API key
- [Google Cloud](https://console.cloud.google.com) (for OAuth)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd AI-REEL-GENERATOR
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (dev) |
| `NEXT_PUBLIC_APP_NAME` | App display name |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (optional, server) |
| `GROQ_API_KEY` | Groq API key |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

### 1. Create project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy **Project URL** and **anon key** to `.env.local`

### 2. Run database schema
1. Open **SQL Editor** in Supabase
2. Paste contents of `supabase/schema.sql`
3. Run the script

This creates:
- `profiles` — user profiles with plan & generation count
- `reel_generations` — all AI outputs with save/favorite flags
- RLS policies, triggers, indexes

### 3. Enable Google OAuth
1. **Authentication → Providers → Google** → Enable
2. Add Google OAuth credentials (see below)
3. Set **Site URL**: `http://localhost:3000`
4. Add **Redirect URL**: `http://localhost:3000/auth/callback`

### 4. Email auth (optional)
Enable **Email** provider under Authentication → Providers.

---

## Google OAuth Setup

1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
2. Create **OAuth 2.0 Client ID** (Web application)
3. Authorized redirect URIs:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy Client ID & Secret into Supabase Google provider settings

---

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Set `NEXT_PUBLIC_APP_URL` to your production URL
5. Deploy

**Vercel env checklist:**
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
GROQ_API_KEY=...
```

### Supabase (production)

1. Update **Site URL** to production domain
2. Add redirect URL: `https://your-domain.vercel.app/auth/callback`
3. Confirm RLS policies are enabled

---

## Folder Structure

```
app/
├── (dashboard)/          # Protected dashboard routes
│   ├── dashboard/
│   ├── generate/
│   ├── saved/
│   ├── trending/
│   ├── analytics/
│   ├── settings/
│   ├── profile/
│   └── billing/
├── api/                  # API routes
│   ├── generate/
│   ├── reels/
│   ├── analytics/
│   └── profile/
├── auth/callback/        # OAuth callback
├── login/
├── signup/
components/
├── ui/                   # Shadcn-style primitives
├── landing/
├── dashboard/
├── generate/
├── auth/
└── shared/
lib/
├── supabase/
├── constants.ts
├── metadata.ts
└── validations.ts
services/                 # Groq & reels business logic
hooks/
utils/
types/
store/
styles/
supabase/schema.sql
```

---

## Mobile Responsiveness

- Bottom navigation bar on mobile (`< lg`)
- Hamburger-style menu in dashboard header
- Touch-friendly button sizes (min 44px targets)
- Responsive grids: 1 → 2 → 3 columns
- Optimized typography scales per breakpoint

---

## Screenshots

> Add screenshots after deployment:
> - Landing hero
> - Generate page with output cards
> - Dashboard overview
> - Mobile bottom nav

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | Shadcn UI (Radix) |
| Animation | Framer Motion |
| Auth & DB | Supabase |
| AI | Groq (llama-3.3-70b-versatile) |
| Deploy | Vercel |

---

## License

MIT
