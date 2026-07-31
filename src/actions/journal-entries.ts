'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/client';
import { type JournalEntry, type JournalCategory } from '@/types';

// ---------- PUBLIC ACTIONS ----------

export async function getAllJournalEntries(): Promise<JournalEntry[]> {
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

export async function getJournalEntryBySlug(slug: string): Promise<JournalEntry | null> {
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

export async function getJournalSlugs(): Promise<{ slug: string }[]> {
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

export async function getJournalEntriesByCategory(category: JournalCategory): Promise<JournalEntry[]> {
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

export async function getAvailableCategories(): Promise<JournalCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('categories')
      .eq('published', true);

    if (error) throw error;

    const categorySet = new Set<JournalCategory>();
    data?.forEach(entry => {
      if (entry.categories) {
        entry.categories.forEach((cat: JournalCategory) => categorySet.add(cat));
      }
    });

    const available = Array.from(categorySet);
    return available.length > 0 ? available : ['reflections', 'projects', 'resources'] as JournalCategory[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['reflections', 'projects', 'resources'] as JournalCategory[];
  }
}

// ---------- ADMIN ACTIONS ----------

export async function getAllEntriesForAdmin(): Promise<JournalEntry[]> {
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

    revalidatePath('/journal');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return { success: false, error: (error as Error).message };
  }
}