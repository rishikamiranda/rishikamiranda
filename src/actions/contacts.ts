'use server';

import { createClient } from '@/lib/supabase/server';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function submitContactForm(data: ContactFormData) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('contacts')
      .insert([{
        name: data.name,
        email: data.email,
        message: data.message,
        status: 'new',
      }]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { 
      success: false, 
      error: (error as Error).message || 'Failed to submit form' 
    };
  }
}

export async function getContacts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function updateContactStatus(id: string, status: 'new' | 'read' | 'replied' | 'archived') {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating contact status:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteContact(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { success: false, error: (error as Error).message };
  }
}