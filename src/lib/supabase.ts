import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxvhgpejwgrlxksnqtxk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 