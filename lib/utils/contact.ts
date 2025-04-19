import { createServerClient } from '@/lib/supabase/server';
import { Contact } from '@/types/contact';

/**
 * Fetches all contacts from Supabase
 * @returns Array of contacts
 */
export async function getAllContacts(): Promise<Contact[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
  
  return data;
}

/**
 * Fetches unread contacts from Supabase
 * @returns Array of unread contacts
 */
export async function getUnreadContacts(): Promise<Contact[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('read', false)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching unread contacts:', error);
    return [];
  }
  
  return data;
}

/**
 * Fetches a single contact by ID
 * @param id The contact ID
 * @returns Contact or null if not found
 */
export async function getContactById(id: string): Promise<Contact | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !data) {
    console.error(`Error fetching contact with id ${id}:`, error);
    return null;
  }
  
  return data;
}

/**
 * Marks a contact as read
 * @param id The contact ID
 * @returns Success boolean
 */
export async function markContactAsRead(id: string): Promise<boolean> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('contacts')
    .update({ read: true })
    .eq('id', id);
  
  if (error) {
    console.error(`Error marking contact ${id} as read:`, error);
    return false;
  }
  
  return true;
}

/**
 * Deletes a contact
 * @param id The contact ID
 * @returns Success boolean
 */
export async function deleteContact(id: string): Promise<boolean> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting contact ${id}:`, error);
    return false;
  }
  
  return true;
}
