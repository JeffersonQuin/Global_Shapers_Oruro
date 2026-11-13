import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

// Using createClient without a Database generic so queries resolve to `any`
// instead of `never` when the generated types are incomplete or out of date.
// Re-add `createClient<Database>` once types are regenerated via `supabase gen types`.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
