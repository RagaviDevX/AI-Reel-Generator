-- ============================================================
-- ReelForge AI — ONE-TIME SETUP (run entire file in Supabase SQL Editor)
-- Fixes: dashboard crash, missing profiles, saved reels
-- ============================================================

-- Tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  generations_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reel_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  niche TEXT NOT NULL,
  tone TEXT NOT NULL,
  platform TEXT NOT NULL,
  viral_hook TEXT NOT NULL,
  reel_script TEXT NOT NULL,
  scene_breakdown JSONB NOT NULL DEFAULT '[]',
  captions JSONB NOT NULL DEFAULT '[]',
  hashtags JSONB NOT NULL DEFAULT '[]',
  cta TEXT NOT NULL DEFAULT '',
  camera_angles JSONB NOT NULL DEFAULT '[]',
  editing_suggestions JSONB NOT NULL DEFAULT '[]',
  broll_ideas JSONB NOT NULL DEFAULT '[]',
  is_saved BOOLEAN NOT NULL DEFAULT FALSE,
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reel_generations_user_id ON public.reel_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_reel_generations_created_at ON public.reel_generations(created_at DESC);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.increment_generations_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET generations_count = generations_count + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Triggers (drop first so re-run is safe)
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS reel_generations_updated_at ON public.reel_generations;
CREATE TRIGGER reel_generations_updated_at
  BEFORE UPDATE ON public.reel_generations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_reel_generation_created ON public.reel_generations;
CREATE TRIGGER on_reel_generation_created
  AFTER INSERT ON public.reel_generations
  FOR EACH ROW EXECUTE FUNCTION public.increment_generations_count();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reel_generations ENABLE ROW LEVEL SECURITY;

-- Policies (drop + recreate = safe to re-run)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own reels" ON public.reel_generations;
DROP POLICY IF EXISTS "Users can insert own reels" ON public.reel_generations;
DROP POLICY IF EXISTS "Users can update own reels" ON public.reel_generations;
DROP POLICY IF EXISTS "Users can delete own reels" ON public.reel_generations;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own reels" ON public.reel_generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reels" ON public.reel_generations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reels" ON public.reel_generations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reels" ON public.reel_generations FOR DELETE USING (auth.uid() = user_id);

-- Backfill profiles for users who already signed up (e.g. Google OAuth)
INSERT INTO public.profiles (id, email, full_name, avatar_url)
SELECT
  u.id,
  COALESCE(u.email, ''),
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name'),
  u.raw_user_meta_data->>'avatar_url'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Done
SELECT 'ReelForge setup complete!' AS status;
