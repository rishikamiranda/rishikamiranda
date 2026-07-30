// src/lib/content/journal-entries.ts

import { createClient } from "../supabase/server";
import { Database } from "@/types/supabase";

export type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
export type JournalCategory = Database['public']['Enums']['journal_category'];

// Type for image objects in the images array
export type JournalImage = {
  url: string;
  title?: string;
  alt?: string;
};

export const categoryDisplayNames: Record<JournalCategory, string> = {
  reflections: 'Reflections',
  projects: 'Projects',
  resources: 'Resources',
};

// Helper: Get first image URL from images array
export function getFirstImage(entry: JournalEntry): string | null {
  if (!entry.images || entry.images.length === 0) return null;
  const firstImage = entry.images[0] as JournalImage;
  return firstImage?.url || null;
}

export function getCoverImage(entry: JournalEntry): string | null {
  return entry.cover_image || getFirstImage(entry);
}

// Helper: Get all image URLs
export function getImageUrls(entry: JournalEntry): string[] {
  if (!entry.images) return [];
  return (entry.images as JournalImage[])
    .map(img => img.url)
    .filter(Boolean);
}

// Helper: Get image alt text
export function getImageAlt(entry: JournalEntry, index: number): string {
  if (!entry.images || index >= entry.images.length) return entry.title;
  const image = entry.images[index] as JournalImage;
  return image?.alt || image?.title || entry.title;
}


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

export async function createJournalEntry(data: any): Promise<JournalEntry | null> {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('journal_entries')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating journal entry:', error);
      return null;
    }
    return result;
  } catch (error) {
    console.error('Unexpected error creating journal entry:', error);
    return null;
  }
}

// Admin: Update a journal entry
export async function updateJournalEntry(id: string, data: any): Promise<JournalEntry | null> {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('journal_entries')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating journal entry:', error);
      return null;
    }
    return result;
  } catch (error) {
    console.error('Unexpected error updating journal entry:', error);
    return null;
  }
}

// Admin: Delete a journal entry
export async function deleteJournalEntry(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting journal entry:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error deleting journal entry:', error);
    return false;
  }
}

// Admin: Get all entries (including unpublished)
export async function getAllEntriesForAdmin(): Promise<JournalEntry[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all entries:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching all entries:', error);
    return [];
  }
}