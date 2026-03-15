import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl.includes('supabase.co') && !supabaseAnonKey.includes('your-anon-key');

export function createClient() {
  if (!isConfigured) {
    console.warn('Supabase not configured. Using mock client for development.');
  }
  return createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
}

export function isSupabaseConfigured(): boolean {
  return isConfigured;
}
