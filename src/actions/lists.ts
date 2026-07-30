'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type List = Database['public']['Tables']['lists']['Row'];
export type ListCategory = 'shopping' | 'style-guide';
export type ListItem = Database['public']['Tables']['list_items']['Row'];

export const categoryDisplayNames: Record<ListCategory, string> = {
  shopping: 'Shopping',
  'style-guide': 'Style Guide',
};

export const ALL_CATEGORIES: ListCategory[] = ['shopping', 'style-guide'];

// ---------- PUBLIC ACTIONS ----------

export async function getAllLists() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [];
  }
}

export async function getListBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching list:', error);
    return null;
  }
}

export async function getListSlugs() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('slug')
      .eq('published', true);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching list slugs:', error);
    return [];
  }
}

export async function getListsByCategory(category: ListCategory) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching lists for category ${category}:`, error);
    return [];
  }
}

// ---------- LIST ITEMS ACTIONS ----------

export async function getListItems(listId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('list_items')
      .select('*')
      .eq('list_id', listId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching list items:', error);
    return [];
  }
}

export async function getListWithItems(slug: string) {
  try {
    const supabase = await createClient();
    const list = await getListBySlug(slug);
    if (!list) return null;

    const items = await getListItems(list.id);
    return { ...list, items };
  } catch (error) {
    console.error('Error fetching list with items:', error);
    return null;
  }
}

// ---------- ADMIN ACTIONS ----------

type ListInput = {
  title: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  cover_image?: string | null;
  category: ListCategory;
  published?: boolean;
};

type ListItemInput = {
  list_id?: string | null;
  image_url?: string | null;
  image_description?: string | null;
  price?: number | null;
  view_url?: string | null;
  buy_url?: string | null;
};

export async function getAllListsForAdmin() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all lists:', error);
    return [];
  }
}

export async function createList(data: ListInput) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('lists')
      .insert([data])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/lists');
    revalidatePath('/');
    revalidatePath(`/lists/${data.category}/${data.slug}`);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating list:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateList(id: string, data: Partial<ListInput>) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('lists')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/lists');
    revalidatePath('/');
    if (data.slug) {
      revalidatePath(`/lists/${result.category}/${data.slug}`);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating list:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteList(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('lists')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/lists');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting list:', error);
    return { success: false, error: (error as Error).message };
  }
}

// ---------- LIST ITEMS ADMIN ACTIONS ----------

export async function getAllListItemsForAdmin() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('list_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all list items:', error);
    return [];
  }
}

export async function getUnassignedListItems() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('list_items')
      .select('*')
      .is('list_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching unassigned list items:', error);
    return [];
  }
}

export async function createListItem(data: ListItemInput) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('list_items')
      .insert([data])
      .select()
      .single();

    if (error) throw error;

    if (data.list_id) {
      revalidatePath(`/lists/${data.list_id}`);
    }
    revalidatePath('/lists');

    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating list item:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateListItem(id: string, data: Partial<ListItemInput>) {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('list_items')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (result.list_id) {
      revalidatePath(`/lists/${result.list_id}`);
    }
    revalidatePath('/lists');

    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating list item:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteListItem(id: string) {
  try {
    const supabase = await createClient();
    const { data: item } = await supabase
      .from('list_items')
      .select('list_id')
      .eq('id', id)
      .single();

    const { error } = await supabase
      .from('list_items')
      .delete()
      .eq('id', id);

    if (error) throw error;

    if (item?.list_id) {
      revalidatePath(`/lists/${item.list_id}`);
    }
    revalidatePath('/lists');

    return { success: true };
  } catch (error) {
    console.error('Error deleting list item:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function addItemsToList(listId: string, itemIds: string[]) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('list_items')
      .update({ list_id: listId })
      .in('id', itemIds);

    if (error) throw error;

    revalidatePath(`/lists/${listId}`);
    revalidatePath('/lists');

    return { success: true };
  } catch (error) {
    console.error('Error adding items to list:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeItemFromList(itemId: string) {
  try {
    const supabase = await createClient();
    const { data: item } = await supabase
      .from('list_items')
      .select('list_id')
      .eq('id', itemId)
      .single();

    const { error } = await supabase
      .from('list_items')
      .update({ list_id: null })
      .eq('id', itemId);

    if (error) throw error;

    if (item?.list_id) {
      revalidatePath(`/lists/${item.list_id}`);
    }
    revalidatePath('/lists');

    return { success: true };
  } catch (error) {
    console.error('Error removing item from list:', error);
    return { success: false, error: (error as Error).message };
  }
}