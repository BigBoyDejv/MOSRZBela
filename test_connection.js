const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- Testing Connection ---');
console.log('URL:', supabaseUrl);
console.log('Key Sample:', supabaseAnonKey?.substring(0, 10));

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Checking gallery_albums...');
  const { data: albums, error: err1 } = await supabase.from('gallery_albums').select('*').limit(1);
  if (err1) {
    console.error('❌ Gallery Error:', err1.message);
  } else {
    console.log('✅ Gallery connected! Found:', albums.length, 'albums.');
  }

  console.log('Checking announcements...');
  const { data: news, error: err2 } = await supabase.from('announcements').select('*').limit(1);
  if (err2) {
    console.error('❌ News Error:', err2.message);
  } else {
    console.log('✅ News connected! Found:', news.length, 'entries.');
  }
}

test();
