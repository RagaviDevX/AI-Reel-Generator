# Deploy to Vercel + Environment Variables

Repo: [github.com/RagaviDevX/AI-Reel-Generator](https://github.com/RagaviDevX/AI-Reel-Generator)

---

## 1. Push code (already done)

```bash
git remote add origin https://github.com/RagaviDevX/AI-Reel-Generator.git
git branch -M main
git push -u origin main
```

---

## 2. Supabase setup (do this first)

### Database
1. [supabase.com/dashboard](https://supabase.com/dashboard) → New project
2. **SQL Editor** → paste & run `supabase/schema.sql`

### Auth URLs (replace with your Vercel URL after deploy)
| Setting | Value |
|---------|--------|
| Site URL | `https://YOUR-APP.vercel.app` |
| Redirect URLs | `https://YOUR-APP.vercel.app/auth/callback` |

For local dev also add:
- `http://localhost:3000`
- `http://localhost:3000/auth/callback`

### Google OAuth (optional)
1. [Google Cloud Console](https://console.cloud.google.com) → Credentials → OAuth 2.0 Client
2. Authorized redirect URI: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
3. Supabase → **Authentication → Providers → Google** → paste Client ID & Secret

### API keys
**Project Settings → API**:
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (optional)

---

## 3. Groq API key

1. [console.groq.com](https://console.groq.com) → API Keys → Create
2. Copy key → `GROQ_API_KEY` in Vercel

---

## 4. Deploy on Vercel

### Option A: Import from GitHub (recommended)
1. [vercel.com/new](https://vercel.com/new)
2. Import **RagaviDevX/AI-Reel-Generator**
3. Framework: **Next.js** (auto-detected)
4. Root Directory: `.` (default)
5. Add environment variables (section below)
6. Click **Deploy**

### Option B: Vercel CLI
```bash
npm i -g vercel
cd AI-REEL-GENERATOR
vercel
vercel --prod
```

---

## 5. Vercel environment variables

Go to **Project → Settings → Environment Variables**. Add for **Production**, **Preview**, and **Development**:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your live Vercel URL (no trailing slash) |
| `NEXT_PUBLIC_APP_NAME` | `ReelForge AI` | Display name |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | From Supabase API settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` | Optional; server-only |
| `GROQ_API_KEY` | `gsk_...` | From Groq console |

**Important:** After first deploy, update `NEXT_PUBLIC_APP_URL` to the real Vercel URL and **redeploy**.

---

## 6. Post-deploy checklist

- [ ] Redeploy after setting correct `NEXT_PUBLIC_APP_URL`
- [ ] Supabase Site URL = your Vercel domain
- [ ] Supabase redirect URL includes `/auth/callback`
- [ ] Google OAuth redirect URI points to Supabase callback
- [ ] Test signup at `/signup`
- [ ] Test generate at `/generate` (needs `GROQ_API_KEY`)

---

## 7. Redeploy after env changes

Vercel → **Deployments** → latest → **⋯** → **Redeploy**

Or push any commit to `main` to trigger a new build.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Google login redirects wrong | Match Supabase redirect URLs + `NEXT_PUBLIC_APP_URL` |
| "Unauthorized" on generate | Log in first; check Supabase keys |
| "AI service not configured" | Add `GROQ_API_KEY` in Vercel and redeploy |
| Database errors | Run `supabase/schema.sql` in Supabase SQL Editor |
| Build fails | Run `npm run build` locally; fix errors before push |
