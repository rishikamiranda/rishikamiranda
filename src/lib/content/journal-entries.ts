// src/lib/content/journal-entries.ts

import { createClient } from "../supabase/server";
import { Database } from "@/types/supabase";

export type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
export type JournalCategory = Database['public']['Enums']['journal_category'];

export const categoryDisplayNames: Record<JournalCategory, string> = {
  reflections: 'Reflections',
  projects: 'Projects',
  resources: 'Resources',
};

export const ALL_CATEGORIES: JournalCategory[] = ['reflections', 'projects', 'resources'];

// Get all entries for static generation
export async function getAllJournalEntries(): Promise<JournalEntry[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all journal entries:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching all journal entries:', error);
    return [];
  }
}

// Get all slugs for static generation
export async function getJournalSlugs(): Promise<{ slug: string }[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('slug')
      .eq('published', true);

    if (error) {
      console.error('Error fetching journal slugs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching journal slugs:', error);
    return [];
  }
}

// Get a single entry by slug
export async function getJournalEntryBySlug(slug: string): Promise<JournalEntry | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching journal entry:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching journal entry:', error);
    return null;
  }
}

// Get entries by category
export async function getJournalEntriesByCategory(category: JournalCategory): Promise<JournalEntry[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('published', true)
      .contains('categories', [category])
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching journal entries for category ${category}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching journal entries:', error);
    return [];
  }
}

// Get available categories from existing entries
export async function getAvailableCategories(): Promise<JournalCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('categories')
      .eq('published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      return ALL_CATEGORIES;
    }

    const categorySet = new Set<JournalCategory>();
    data?.forEach(entry => {
      if (entry.categories) {
        entry.categories.forEach((cat: JournalCategory) => categorySet.add(cat));
      }
    });

    const available = Array.from(categorySet);
    return available.length > 0 ? available : ALL_CATEGORIES;
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return ALL_CATEGORIES;
  }
}