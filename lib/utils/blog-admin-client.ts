import { createClientClient } from '@/lib/supabase/client';
import { BlogPost } from '@/types/blog';
import { transformBlogPost } from './blog-client';

/**
 * Fetches a blog post by ID for admin editing (client-side version)
 * @param id The blog post ID
 * @returns Blog post or null if not found
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = createClientClient();
  
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

/**
 * Creates a new blog post (client-side version)
 * @param post Blog post data
 * @returns Created blog post or null if error
 */
export async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'content_html'>
): Promise<BlogPost | null> {
  const supabase = createClientClient();
  
  try {
    // Check authentication first
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('Error creating blog post: Not authenticated');
      return null;
    }
    
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        featured_image: post.featured_image,
        published: post.published,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error.message, error.details, error.hint);
      return null;
    }
    
    if (!data) {
      console.error('Error creating blog post: No data returned');
      return null;
    }
    
    return transformBlogPost(data);
  } catch (error: unknown) {
    console.error('Exception creating blog post:', error);
    return null;
  }
}

/**
 * Updates an existing blog post (client-side version)
 * @param id Blog post ID
 * @param post Blog post data
 * @returns Updated blog post or null if error
 */
export async function updateBlogPost(
  id: string,
  post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'content_html'>
): Promise<BlogPost | null> {
  const supabase = createClientClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .update({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      published: post.published,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error || !data) {
    console.error(`Error updating blog post with id ${id}:`, error);
    return null;
  }
  
  return transformBlogPost(data);
}

/**
 * Deletes a blog post (client-side version)
 * @param id Blog post ID
 * @returns Success boolean
 */
export async function deleteBlogPost(id: string): Promise<boolean> {
  const supabase = createClientClient();
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting blog post with id ${id}:`, error);
    return false;
  }
  
  return true;
}

/**
 * Uploads a featured image for a blog post (client-side version)
 * @param file Image file
 * @param filename Filename
 * @returns URL of uploaded image or null if error
 */
export async function uploadBlogImage(
  file: File,
  filename: string
): Promise<string | null> {
  const supabase = createClientClient();
  
  // Create a unique filename to prevent collisions
  const uniqueFilename = `${Date.now()}-${filename}`;
  
  // Upload the file to Supabase Storage
  const { data, error } = await supabase
    .storage
    .from('blog-images')
    .upload(uniqueFilename, file, {
      cacheControl: '3600',
      upsert: false,
    });
  
  if (error || !data) {
    console.error('Error uploading blog image:', error);
    return null;
  }
  
  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('blog-images')
    .getPublicUrl(data.path);
  
  return publicUrl;
}
