import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ddagjnmyozbcwoymmuvo.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWdqbm15b3piY3dveW1tdXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODI4MzYsImV4cCI6MjA1MTg1ODgzNn0.c7_otnxWo9ODWmhRMkJwcYZ8jOQx7BR9pVylGD8xyY4'

console.log('Initializing Supabase with:', {
  url: supabaseUrl,
  anonKey: supabaseAnonKey && supabaseAnonKey.substring(0, 10) + '...',
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
