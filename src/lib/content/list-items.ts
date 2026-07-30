import { createClient } from "../supabase/server";
import { Database } from "@/types/supabase";

export type ListItem = Database['public']['Tables']['list_items']['Row'];

// Get all items (for the library/browse view)
export async function getAllListItems(): Promise<ListItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('list_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching list items:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching list items:', error);
    return [];
  }
}

// Get items for a specific list
export async function getListItemsByListId(listId: string): Promise<ListItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('list_items')
      .select('*')
      .eq('list_id', listId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(`Error fetching items for list ${listId}:`, error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching list items:', error);
    return [];
  }
}

// Get list with its items
export async function getListWithItems(listId: string) {
  try {
    const supabase = await createClient();
    const [listResult, itemsResult] = await Promise.all([
      supabase.from('lists').select('*').eq('id', listId).single(),
      supabase.from('list_items').select('*').eq('list_id', listId).order('created_at', { ascending: true })
    ]);

    if (listResult.error) {
      console.error('Error fetching list:', listResult.error);
      return null;
    }

    return {
      ...listResult.data,
      items: itemsResult.data || []
    };
  } catch (error) {
    console.error('Unexpected error fetching list with items:', error);
    return null;
  }
}

// Create a new list item (for Scenario 2)
export async function createListItem(data: Omit<ListItem, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<ListItem | null> {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('list_items')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error creating list item:', error);
      return null;
    }
    return result;
  } catch (error) {
    console.error('Unexpected error creating list item:', error);
    return null;
  }
}

// Update a list item
export async function updateListItem(id: string, data: Partial<ListItem>): Promise<ListItem | null> {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from('list_items')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating list item ${id}:`, error);
      return null;
    }
    return result;
  } catch (error) {
    console.error('Unexpected error updating list item:', error);
    return null;
  }
}

// Delete a list item
export async function deleteListItem(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('list_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting list item ${id}:`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error deleting list item:', error);
    return false;
  }
}

// Bulk add items to a list (for Scenario 1)
export async function addItemsToList(listId: string, itemIds: string[]): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('list_items')
      .update({ list_id: listId })
      .in('id', itemIds);

    if (error) {
      console.error(`Error adding items to list ${listId}:`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error adding items to list:', error);
    return false;
  }
}

// Remove an item from a list (set list_id to null)
export async function removeItemFromList(itemId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('list_items')
      .update({ list_id: null })
      .eq('id', itemId);

    if (error) {
      console.error(`Error removing item ${itemId} from list:`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error removing item from list:', error);
    return false;
  }
}