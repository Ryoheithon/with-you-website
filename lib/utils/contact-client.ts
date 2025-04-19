import { createClientClient } from '@/lib/supabase/client';
import { Contact } from '@/types/contact';

/**
 * Fetches all contacts from Supabase (client-side version)
 * @returns Array of contacts
 */
export async function getAllContacts(): Promise<Contact[]> {
  const supabase = createClientClient();
  
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
 * Fetches unread contacts from Supabase (client-side version)
 * @returns Array of unread contacts
 */
export async function getUnreadContacts(): Promise<Contact[]> {
  const supabase = createClientClient();
  
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
 * Fetches a single contact by ID (client-side version)
 * @param id The contact ID
 * @returns Contact or null if not found
 */
export async function getContactById(id: string): Promise<Contact | null> {
  const supabase = createClientClient();
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching contact with ID ${id}:`, error);
    return null;
  }
  
  return data;
}

/**
 * Marks a contact as read (client-side version)
 * @param id The contact ID
 * @returns Success boolean
 */
export async function markContactAsRead(id: string): Promise<boolean> {
  const supabase = createClientClient();
  
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
 * Deletes a contact (client-side version)
 * @param id The contact ID
 * @returns Success boolean
 */
export async function deleteContact(id: string): Promise<boolean> {
  const supabase = createClientClient();
  
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
