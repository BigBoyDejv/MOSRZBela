export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  is_pinned: boolean;
  image_url?: string;
  created_at: string;
}

export interface PermitOrder {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  permit_type: string;
  status: 'nová' | 'spracovaná' | 'zrušená';
  created_at?: string;
}
