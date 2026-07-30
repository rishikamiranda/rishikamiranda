'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function signInWithPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      success: false, 
      error: (error as Error).message || 'Invalid email or password' 
    };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/admin');
    redirect('/admin/login');
  } catch (error) {
    console.error('Sign out error:', error);
    redirect('/admin/login');
  }
}

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