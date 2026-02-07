-- ============================================
-- ADMIN SYSTEM MIGRATION
-- ============================================
-- This migration creates the profiles table with admin support,
-- site settings table, and necessary RLS policies.
-- ============================================

-- 1. Create profiles table
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    banned_at TIMESTAMPTZ,
    banned_reason TEXT,
    last_sign_in_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = TRUE;
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 2. Create site_settings table
-- ============================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES public.profiles(id)
);

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
    ('site_name', '"Your Channel Name"', 'The name displayed across the site'),
    ('tagline', '"Your creator website—ready to customize and ship."', 'The main tagline on the homepage'),
    ('maintenance_mode', 'false', 'When enabled, only admins can access the site'),
    ('allow_signups', 'true', 'Whether new user signups are allowed'),
    ('require_email_verification', 'true', 'Whether email verification is required')
ON CONFLICT (key) DO NOTHING;

-- 3. Enable Row Level Security
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for profiles
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND is_admin = TRUE
        )
    );

-- Users can update their own profile (but not admin status)
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        AND is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
        AND is_banned = (SELECT is_banned FROM public.profiles WHERE id = auth.uid())
    );

-- Admins can update any profile
CREATE POLICY "Admins can update all profiles"
    ON public.profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND is_admin = TRUE
        )
    );

-- 5. RLS Policies for site_settings
-- ============================================

-- Anyone can read site settings
CREATE POLICY "Anyone can read site settings"
    ON public.site_settings FOR SELECT
    USING (TRUE);

-- Only admins can modify site settings
CREATE POLICY "Admins can modify site settings"
    ON public.site_settings FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND is_admin = TRUE
        )
    );

-- 6. Function to handle new user signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    admin_email TEXT := '{{ADMIN_EMAIL}}'; -- Replace with your admin email
BEGIN
    INSERT INTO public.profiles (id, email, is_admin, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        LOWER(NEW.email) = LOWER(admin_email),
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger on auth.users insert
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Function to update last sign in
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_user_sign_in()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET last_sign_in_at = NOW(), updated_at = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Function to check if user is admin
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_id AND is_admin = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Function to get admin stats
-- ============================================
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Check if caller is admin
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    SELECT json_build_object(
        'total_users', (SELECT COUNT(*) FROM public.profiles),
        'admin_users', (SELECT COUNT(*) FROM public.profiles WHERE is_admin = TRUE),
        'banned_users', (SELECT COUNT(*) FROM public.profiles WHERE is_banned = TRUE),
        'users_today', (SELECT COUNT(*) FROM public.profiles WHERE created_at >= CURRENT_DATE),
        'users_this_week', (SELECT COUNT(*) FROM public.profiles WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'),
        'users_this_month', (SELECT COUNT(*) FROM public.profiles WHERE created_at >= CURRENT_DATE - INTERVAL '30 days')
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Function to get user signups over time (for charts)
-- ============================================
CREATE OR REPLACE FUNCTION public.get_signup_analytics(days_back INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Check if caller is admin
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    SELECT json_agg(
        json_build_object(
            'date', date_series::date,
            'count', COALESCE(signup_count, 0)
        )
        ORDER BY date_series
    )
    FROM generate_series(
        CURRENT_DATE - (days_back || ' days')::interval,
        CURRENT_DATE,
        '1 day'::interval
    ) AS date_series
    LEFT JOIN (
        SELECT DATE(created_at) as signup_date, COUNT(*) as signup_count
        FROM public.profiles
        WHERE created_at >= CURRENT_DATE - (days_back || ' days')::interval
        GROUP BY DATE(created_at)
    ) signups ON date_series::date = signups.signup_date
    INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Updated_at trigger function
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
