import { createServerClient } from '@/lib/supabase/server';
import { BlogPost } from '@/types/blog';
import { transformBlogPost } from './blog-server';

/**
 * Fetches a blog post by ID for admin editing
 * @param id The blog post ID
 * @returns Blog post or null if not found
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !data) {
    console.error(`Error fetching blog post with id ${id}:`, error);
    return null;
  }
  
  return transformBlogPost(data);
}
