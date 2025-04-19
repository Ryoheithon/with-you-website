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
  
  // 以前の画像を取得して、変更された場合は削除
  const { data: oldPost } = await supabase
    .from('blogs')
    .select('featured_image')
    .eq('id', id)
    .single();

  const oldImageUrl = oldPost?.featured_image;
  
  // 画像が変更された場合、古い画像を削除
  if (oldImageUrl && oldImageUrl !== post.featured_image) {
    await deleteBlogImage(oldImageUrl);
  }
  
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
  
  // 削除前に記事の情報を取得
  const { data } = await supabase
    .from('blogs')
    .select('featured_image')
    .eq('id', id)
    .single();
  
  // 画像があれば削除
  if (data?.featured_image) {
    await deleteBlogImage(data.featured_image);
  }
  
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
 * ブログ画像を削除する
 * @param imageUrl 削除する画像URL
 * @returns 成功した場合true
 */
export async function deleteBlogImage(imageUrl: string): Promise<boolean> {
  // URLが空またはSupabaseのURLでない場合は無視
  if (!imageUrl || !imageUrl.includes('/storage/v1/object/public/blog-images/')) {
    return true;
  }
  
  try {
    const supabase = createClientClient();
    
    // URLからファイル名を抽出
    const filename = imageUrl.split('/').pop();
    if (!filename) {
      console.error('Could not extract filename from URL:', imageUrl);
      return false;
    }
    
    // Supabase Storageからファイルを削除
    const { error } = await supabase
      .storage
      .from('blog-images')
      .remove([filename]);
    
    if (error) {
      console.error('Error deleting image from storage:', error);
      return false;
    }
    
    console.log('Successfully deleted image from storage:', filename);
    return true;
  } catch (error) {
    console.error('Exception deleting blog image:', error);
    return false;
  }
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
  
  try {
    // ファイル名の無効な文字を置換
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // 一意のファイル名を生成
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    
    // Supabase Storageにアップロード
    const { data, error } = await supabase
      .storage
      .from('blog-images')
      .upload(uniqueFilename, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      console.error('Error uploading blog image:', error);
      return null;
    }
    
    if (!data?.path) {
      console.error('No path returned after upload');
      return null;
    }
    
    // 公開URLを取得
    const { data: { publicUrl } } = supabase
      .storage
      .from('blog-images')
      .getPublicUrl(data.path);
    
    return publicUrl;
  } catch (error) {
    console.error('Exception during blog image upload:', error);
    return null;
  }
}
