import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';

/**
 * Creates a Supabase client for use in Server Components only
 * IMPORTANT: This function can only be used in Server Components in the app/ directory
 * For client components or pages/ directory, use the client.ts version
 */
export const createServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
}

/**
 * Creates a Supabase client for use in static generation contexts
 * This client doesn't use cookies and is suitable for generateStaticParams
 */
export const createStaticClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
