import { createClient } from "../supabase/server";
import { Database } from "@/types/supabase";

export type ListCategory = 'shopping' | 'style-guide';

export type List = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  description: string | null;
  cover_image: string | null;
  category: ListCategory;
  published: boolean;
  created_at: string;
  updated_at: string;
  user_id: string | null;
};

export const categoryDisplayNames: Record<ListCategory, string> = {
  'shopping': 'Shopping',
  'style-guide': 'Style Guide',
};

export const ALL_CATEGORIES: ListCategory[] = ['shopping', 'style-guide'];

export async function getAllLists(): Promise<List[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lists:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching lists:', error);
    return [];
  }
}

export async function getListBySlug(slug: string): Promise<List | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching list:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching list:', error);
    return null;
  }
}

export async function getListSlugs(): Promise<{ slug: string }[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('slug')
      .eq('published', true);

    if (error) {
      console.error('Error fetching list slugs:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching list slugs:', error);
    return [];
  }
}

export async function getListsByCategory(category: ListCategory): Promise<List[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching lists for category ${category}:`, error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching lists:', error);
    return [];
  }
}

export async function getAvailableListCategories(): Promise<ListCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('category')
      .eq('published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      return ALL_CATEGORIES;
    }

    const categorySet = new Set<ListCategory>();
    data?.forEach(list => {
      if (list.category) {
        categorySet.add(list.category as ListCategory);
      }
    });

    const available = Array.from(categorySet);
    return available.length > 0 ? available : ALL_CATEGORIES;
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return ALL_CATEGORIES;
  }
}