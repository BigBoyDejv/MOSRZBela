-- Supabase Setup Script for Rybky Web
-- 1. Announcements Table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Všeobecné',
  is_pinned BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Permit Orders Table
CREATE TABLE permit_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  permit_type TEXT NOT NULL,
  status TEXT DEFAULT 'nová',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) - Basic public read for announcements
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON announcements FOR SELECT USING (true);

-- Permit orders should only be insertable by everyone, but readable by admins?
-- For now, allow everyone to insert their own requests.
ALTER TABLE permit_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert-only" ON permit_orders FOR INSERT WITH CHECK (true);

-- Seed Data (Announcements)
INSERT INTO announcements (title, excerpt, content, category, is_pinned)
VALUES 
('Zákaz lovu na revíri č. 4', 'Z dôvodu čistenia rybníka Beliansky je v dňoch 15. - 20. mája vyhlásený dočasný zákaz lovu.', 'Prosíme všetkých členov o trpezlivosť...', 'Dôležité', true),
('Jarné zarybňovanie prebehlo úspešne', 'Do našich vôd sme vypustili vyše 500kg kapra rybničného.', 'Zarybňovanie sa uskutočnilo v piatok popoludní...', 'Oznamy', false);
