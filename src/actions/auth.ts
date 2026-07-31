'use server';

import { createClient } from '@/lib/supabase/server';

export async function getSession() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export async function getUser() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}