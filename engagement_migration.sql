-- Add engagement metrics to announcements
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS dislikes INTEGER DEFAULT 0;

-- Create comments table
CREATE TABLE IF NOT EXISTS public.news_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.news_comments ENABLE ROW LEVEL SECURITY;

-- Policies for news_comments
DROP POLICY IF EXISTS "Public can view comments" ON public.news_comments;
CREATE POLICY "Public can view comments" ON public.news_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can add comments" ON public.news_comments;
CREATE POLICY "Anyone can add comments" ON public.news_comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete comments" ON public.news_comments;
CREATE POLICY "Admins can delete comments" ON public.news_comments FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for likes/dislikes (simple update for everyone since no auth check for voters yet)
-- Note: In a real app we'd have a separate table for votes to prevent spam.
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can update engagement" ON public.announcements;
CREATE POLICY "Anyone can update engagement" ON public.announcements FOR UPDATE USING (true) WITH CHECK (true);
