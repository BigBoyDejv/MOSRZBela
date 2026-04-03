import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdmin() {
  const email = 'admin1@azet.com'
  const password = '123123'

  console.log(`Zasielam požiadavku na vytvorenie účtu: ${email}...`)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('User already registered')) {
        console.log('✅ Účet už existuje.')
    } else {
        console.error('❌ Chyba pri vytváraní účtu:', error.message)
    }
  } else {
    console.log('✅ Požiadavka bola úspešne odoslaná.')
    console.log('Ak máte zapnuté potvrdzovacie emaily, skontrolujte si admin1@azet.com (alebo vypnite confirmation v Supabase Auth settings).')
  }
}

createAdmin()
