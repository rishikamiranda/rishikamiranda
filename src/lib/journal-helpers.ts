// src/lib/journal-helpers.ts
import { type JournalEntry } from '@/types';

export function getCoverImage(entry: JournalEntry): string | null {
  return entry.cover_image || (entry.images?.[0] as any)?.url || null;
}

export function getImageUrls(entry: JournalEntry): string[] {
  if (!entry.images) return [];
  return (entry.images as any[]).map(img => img.url).filter(Boolean);
}

export function getImageAlt(entry: JournalEntry, index: number): string {
  if (!entry.images || index >= entry.images.length) return entry.title;
  const image = entry.images[index] as any;
  return image?.alt || image?.title || entry.title;
}

export function getFirstImage(entry: JournalEntry): string | null {
  if (!entry.images || entry.images.length === 0) return null;
  const firstImage = entry.images[0] as any;
  return firstImage?.url || null;
}