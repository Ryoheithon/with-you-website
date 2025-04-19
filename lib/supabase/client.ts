import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types';

/**
 * Creates a Supabase client for use in Client Components
 * This function is safe to use in both app/ and pages/ directories
 * and in client-side components
 */
export const createClientClient = () => {
  return createClientComponentClient<Database>();
}
