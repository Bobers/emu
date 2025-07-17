import { createServerSupabaseClient } from './supabase-server';

export async function getServerUser() {
  const supabase = await createServerSupabaseClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  return user;
}