import { supabase } from './supabase';

export async function getContent(id: string, fallback: string) {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('text')
      .eq('id', id)
      .single();
    
    if (error || !data) return fallback;
    return data.text;
  } catch (err) {
    return fallback;
  }
}

export async function getAllContent() {
  const { data, error } = await supabase.from('site_content').select('*');
  if (error) return [];
  return data;
}
