import { createServerClient } from '@/lib/supabase/server';
import { BlogPost } from '@/types/blog';
import { marked } from 'marked';

/**
 * Type definition for raw blog post data from Supabase
 */
interface RawBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string | null;
}

/**
 * Fetches all published blog posts from Supabase
 * @returns Array of blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  // 非同期で変換する
  const transformedPosts = await Promise.all(data.map(transformBlogPost));
  return transformedPosts;
}

/**
 * Fetches a single blog post by slug
 * @param slug The blog post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error || !data) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
  
  return await transformBlogPost(data);
}

/**
 * Fetches all blog posts (published and unpublished) for admin
 * @returns Array of blog posts
 */
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
  
  // 非同期で変換する
  const transformedPosts = await Promise.all(data.map(transformBlogPost));
  return transformedPosts;
}

/**
 * Transforms a raw blog post from Supabase into the BlogPost type
 * @param post Raw blog post from database
 * @returns Transformed BlogPost
 */
export async function transformBlogPost(post: RawBlogPost): Promise<BlogPost> {
  // Convert markdown content to HTML if it exists
  const content_html = post.content ? await marked(post.content) : '';
  
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content || '',
    content_html,
    excerpt: post.excerpt || '',
    featured_image: post.featured_image || '',
    published: post.published,
    created_at: post.created_at,
    updated_at: post.updated_at,
  };
}

/**
 * Generates a slug from a title
 * @param title The title to slugify
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}
