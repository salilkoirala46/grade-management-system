import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://hhhrpbqjtotswvmtcbyz.supabase.co';  // Replace with your Supabase URL
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoaHJwYnFqdG90c3d2bXRjYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNTI5MDYsImV4cCI6MjA1NDcyODkwNn0.rQ6O3b6g5dXJJskJXH8gtfJHXFpRKSuHLqJST5mqFX8';  // Replace with your Supabase anon key

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
