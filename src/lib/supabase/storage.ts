import { createClient } from './client';

// ----------------------------
// Types
// ----------------------------

export interface UploadedImage {
  path: string;
  url: string;
}

// ----------------------------
// Upload functions
// ----------------------------

const supabase = createClient();

export async function uploadJournalImage(file: File, path?: string): Promise<UploadedImage> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : `journal/${fileName}`;

  const { data, error } = await supabase.storage
    .from('journal-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('journal-images')
    .getPublicUrl(filePath);

  return {
    path: data?.path || filePath,
    url: urlData.publicUrl,
  };
}

export async function uploadListImage(file: File, path?: string): Promise<UploadedImage> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : `lists/${fileName}`;

  const { data, error } = await supabase.storage
    .from('list-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('list-images')
    .getPublicUrl(filePath);

  return {
    path: data?.path || filePath,
    url: urlData.publicUrl,
  };
}

export async function uploadListItemImage(file: File, path?: string): Promise<UploadedImage> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : `list-items/${fileName}`;

  const { data, error } = await supabase.storage
    .from('list-item-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('list-item-images')
    .getPublicUrl(filePath);

  return {
    path: data?.path || filePath,
    url: urlData.publicUrl,
  };
}

// ----------------------------
// Upload multiple images
// ----------------------------

export async function uploadJournalImages(files: File[], path?: string): Promise<UploadedImage[]> {
  const uploadPromises = files.map((file) => uploadJournalImage(file, path));
  return Promise.all(uploadPromises);
}

export async function uploadListImages(files: File[], path?: string): Promise<UploadedImage[]> {
  const uploadPromises = files.map((file) => uploadListImage(file, path));
  return Promise.all(uploadPromises);
}

export async function uploadListItemImages(files: File[], path?: string): Promise<UploadedImage[]> {
  const uploadPromises = files.map((file) => uploadListItemImage(file, path));
  return Promise.all(uploadPromises);
}

// ----------------------------
// Get public URL
// ----------------------------

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ----------------------------
// Delete images
// ----------------------------

export async function deleteJournalImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from('journal-images')
    .remove([path]);

  if (error) throw error;
}

export async function deleteListImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from('list-images')
    .remove([path]);

  if (error) throw error;
}

export async function deleteListItemImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from('list-item-images')
    .remove([path]);

  if (error) throw error;
}

// ----------------------------
// Delete multiple images
// ----------------------------

export async function deleteJournalImages(paths: string[]): Promise<void> {
  const { error } = await supabase.storage
    .from('journal-images')
    .remove(paths);

  if (error) throw error;
}

export async function deleteListImages(paths: string[]): Promise<void> {
  const { error } = await supabase.storage
    .from('list-images')
    .remove(paths);

  if (error) throw error;
}

export async function deleteListItemImages(paths: string[]): Promise<void> {
  const { error } = await supabase.storage
    .from('list-item-images')
    .remove(paths);

  if (error) throw error;
}