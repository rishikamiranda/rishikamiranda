'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
export type JournalCategory = Database['public']['Enums']['journal_category'];

export const categoryDisplayNames: Record<JournalCategory, string> = {
  reflections: 'Reflections',
  projects: 'Projects',
  resources: 'Resources',
};

export const ALL_CATEGORIES: JournalCategory[] = ['reflections', 'projects', 'resources'];

// ---------- PUBLIC ACTIONS ----------

export async function getAllJournalEntries() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return [];
  }
}

export async function getJournalEntryBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    return null;
  }
}

export async function getJournalSlugs() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('slug')
      .eq('published', true);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching journal slugs:', error);
    return [];
  }
}

export async function getJournalEntriesByCategory(category: JournalCategory) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('published', true)
      .contains('categories', [category])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching journal entries for category ${category}:`, error);
    return [];
  }
}

// ---------- ADMIN ACTIONS ----------

export async function getAllEntriesForAdmin() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all entries:', error);
    return [];
  }
}

type JournalEntryInput = {
  title: string;
  slug: string;
  content?: string | null;
  categories?: JournalCategory[] | null;
  published?: boolean;
  cover_image?: string | null;
  images?: any[] | null;
  description?: string | null;
  author?: string | null;
  reading_time?: number | null;
  tags?: string[] | null;
  linkedin_link_url?: string | null;
  featured?: boolean;
};

export async function createJournalEntry(data: JournalEntryInput) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('journal_entries')
      .insert([data])
      .select()
      .single();

    if (error) throw error;

    // Revalidate the journal pages
    revalidatePath('/journal');
    revalidatePath('/');
    revalidatePath(`/journal/${data.slug}`);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating journal entry:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateJournalEntry(id: string, data: Partial<JournalEntryInput>) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('journal_entries')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Revalidate the journal pages
    revalidatePath('/journal');
    revalidatePath('/');
    if (data.slug) {
      revalidatePath(`/journal/${data.slug}`);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating journal entry:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteJournalEntry(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Revalidate the journal pages
    revalidatePath('/journal');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return { success: false, error: (error as Error).message };
  }
}

// ---------- HELPERS ----------

export function getCoverImage(entry: JournalEntry): string | null {
  return entry.cover_image || (entry.images?.[0] as any)?.url || null;
}

export function getImageUrls(entry: JournalEntry): string[] {
  if (!entry.images) return [];
  return (entry.images as any[]).map(img => img.url).filter(Boolean);
}