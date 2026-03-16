-- Database Schema for TechWorld (Supabase PostgreSQL)

-- Enable Row Level Security
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'buyer' CHECK (role IN ('buyer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (for TechWorld store items)
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Games/Releases table
CREATE TABLE public.games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  version TEXT DEFAULT '1.0.0',
  category TEXT DEFAULT 'Gaming' CHECK (category IN ('AI', 'Gaming')),
  is_free BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  file_size BIGINT,
  file_name TEXT,
  storage_path TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchases table (tracks user purchases)
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  stripe_payment_id TEXT,
  stripe_customer_id TEXT,
  paypal_payment_id TEXT,
  paypal_order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'refunded', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies

-- Profiles: Users can read their own profile, admins can read all
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile (needed for signup)
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow service role to insert profiles
CREATE POLICY "Service role can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- Products: Everyone can read active products
CREATE POLICY "Anyone can read active products" ON public.products
  FOR SELECT USING (is_active = true);

-- Games: Everyone can read active games
CREATE POLICY "Anyone can read active games" ON public.games
  FOR SELECT USING (is_active = true);

-- Purchases: Users can read their own purchases
CREATE POLICY "Users can read own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Storage Bucket for APK files
-- Run this in Supabase Dashboard > Storage > Create bucket
-- Bucket name: game-files
-- Public bucket: true

-- Storage Policies for game-files bucket
-- Allow public read access
CREATE POLICY "Public can download game files" ON storage.objects
  FOR SELECT USING (bucket_id = 'game-files');

-- Allow authenticated users to upload
CREATE POLICY "Auth users can upload game files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'game-files' 
    AND auth.role() IN ('authenticated', 'anon')
  );

-- Allow admins to delete
CREATE POLICY "Admins can delete game files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'game-files'
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
