import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Gets the current authenticated session from Supabase
 * @returns Session object or null if not authenticated
 */
export async function getServerSession() {
  const cookieStore = cookies();
  const supabase = createServerClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  return session;
}

/**
 * Checks if the current user is authenticated and redirects if not
 * @returns Boolean indicating if user is authenticated
 */
export async function checkAuth() {
  const session = await getServerSession();
  return !!session;
}

/**
 * Checks if the current user is an admin
 * @returns Boolean indicating if user is an admin
 */
export async function isAdmin() {
  const session = await getServerSession();
  
  if (!session) {
    return false;
  }
  
  // Check if user email matches admin email from environment variable
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    console.warn('ADMIN_EMAIL environment variable is not set');
    return false;
  }
  
  return session.user.email === adminEmail;
}
