-- ═══ Native Gallery System Migration ═══

-- Create gallery_albums table
CREATE TABLE IF NOT EXISTS gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT, -- Main thumb for the card
    category TEXT DEFAULT 'Organizácia', -- 'Súťaž', 'Príroda', 'Brigáda', 'Ostatné'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;

-- 1. Everyone can view albums
CREATE POLICY "Public: View Albums" ON gallery_albums FOR SELECT USING (true);

-- 2. Authenticated users (Admin) can Manage everything
CREATE POLICY "Admin: Full Access on Albums" ON gallery_albums FOR ALL USING (auth.role() = 'authenticated');
