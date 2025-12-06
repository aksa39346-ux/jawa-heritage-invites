import { createClient } from '@supabase/supabase-js';

// Get from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase credentials not configured');
  console.info('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env file');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
