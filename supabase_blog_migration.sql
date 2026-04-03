-- Update announcements to support blog features
ALTER TABLE if exists announcements 
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'MO SRZ Spišská Belá',
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS importance TEXT DEFAULT 'normal'; -- 'urgent', 'important', 'normal'

-- Create documents table for sidebar
CREATE TABLE IF NOT EXISTS site_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'Legislatíva', -- 'Legislatíva', 'Zmluvy', 'Ostatné'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed some documents
INSERT INTO site_documents (title, url, category)
VALUES 
  ('Zákon o rybárstve č. 216/2018 Z. z.', 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2018/216/', 'Legislatíva'),
  ('Vyhláška č. 381/2018 Z. z. k zákonu', 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2018/381/', 'Legislatíva'),
  ('Miestny rybársky poriadok 2026', '#', 'Dokumenty'),
  ('Brigádnický poriadok', '#', 'Dokumenty')
ON CONFLICT DO NOTHING;
