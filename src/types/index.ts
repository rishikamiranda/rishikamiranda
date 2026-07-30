import { Database } from '@/types/supabase';

export type List = Database['public']['Tables']['lists']['Row'];
export type ListItem = Database['public']['Tables']['list_items']['Row'];
export type ListCategory = 'shopping' | 'style-guide';

export type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
export type JournalCategory = Database['public']['Enums']['journal_category'];

export const LIST_CATEGORIES: ListCategory[] = ['shopping', 'style-guide'];
export const LIST_CATEGORY_NAMES: Record<ListCategory, string> = {
  shopping: 'Shopping',
  'style-guide': 'Style Guide',
};

export const JOURNAL_CATEGORIES: JournalCategory[] = ['reflections', 'projects', 'resources'];
export const JOURNAL_CATEGORY_NAMES: Record<JournalCategory, string> = {
  reflections: 'Reflections',
  projects: 'Projects',
  resources: 'Resources',
};

// Helper functions with type guards
export function getListCategoryDisplayName(category: string): string {
  // Check if category is a valid ListCategory
  if (isListCategory(category)) {
    return LIST_CATEGORY_NAMES[category] || category;
  }
  return category;
}

export function getJournalCategoryDisplayName(category: string): string {
  // Check if category is a valid JournalCategory
  if (isJournalCategory(category)) {
    return JOURNAL_CATEGORY_NAMES[category] || category;
  }
  return category;
}

// Type guards
export function isListCategory(category: string): category is ListCategory {
  return LIST_CATEGORIES.includes(category as ListCategory);
}

export function isJournalCategory(category: string): category is JournalCategory {
  return JOURNAL_CATEGORIES.includes(category as JournalCategory);
}