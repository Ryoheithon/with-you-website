import { createServerClient } from '@/lib/supabase/server';
import { BlogPost } from '@/types/blog';
import { transformBlogPost } from './blog';

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

/**
 * Creates a new blog post
 * @param post Blog post data
 * @returns Created blog post or null if error
 */
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'content_html'>): Promise<BlogPost | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .insert([post])
    .select()
    .single();
  
  if (error || !data) {
    console.error('Error creating blog post:', error);
    return null;
  }
  
  return transformBlogPost(data);
}

/**
 * Updates an existing blog post
 * @param id Blog post ID
 * @param post Blog post data
 * @returns Updated blog post or null if error
 */
export async function updateBlogPost(
  id: string,
  post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'content_html'>
): Promise<BlogPost | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .update(post)
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
 * Deletes a blog post
 * @param id Blog post ID
 * @returns Success boolean
 */
export async function deleteBlogPost(id: string): Promise<boolean> {
  const supabase = createServerClient();
  
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
 * Uploads a featured image for a blog post
 * @param file Image file
 * @param filename Filename
 * @returns URL of uploaded image or null if error
 */
export async function uploadBlogImage(
  file: File,
  filename: string
): Promise<string | null> {
  const supabase = createServerClient();
  
  // Create a unique filename
  const uniqueFilename = `${Date.now()}_${filename}`;
  
  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(uniqueFilename, file);
  
  if (error || !data) {
    console.error('Error uploading blog image:', error);
    return null;
  }
  
  const { data: urlData } = supabase.storage
    .from('blog-images')
    .getPublicUrl(uniqueFilename);
  
  return urlData.publicUrl;
}
