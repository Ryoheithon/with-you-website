import { createClientClient } from '@/lib/supabase/client';
import { BlogPost } from '@/types/blog';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

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
 * Fetches all published blog posts from Supabase (client-side version)
 * @returns Array of blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClientClient();
  
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
 * Fetches a single blog post by slug (client-side version)
 * @param slug The blog post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createClientClient();
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
  
  return await transformBlogPost(data);
}

/**
 * Transforms a raw blog post from Supabase into the BlogPost type
 * @param post Raw blog post from database
 * @returns Transformed BlogPost
 */
export async function transformBlogPost(post: RawBlogPost): Promise<BlogPost> {
  // GitHub Flavored Markdown（GFM）を有効化
  marked.use(gfmHeadingId());
  marked.use({
    gfm: true,
    breaks: true,
    pedantic: false
  });
  
  // Convert markdown content to HTML
  const contentHtml = await marked(post.content || '');
  
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content || '',
    content_html: contentHtml,
    excerpt: post.excerpt || '',
    featured_image: post.featured_image || '',
    published: post.published,
    created_at: new Date(post.created_at),
    updated_at: post.updated_at ? new Date(post.updated_at) : null
  };
}

/**
 * Generates a slug from a title
 * @param title The title to slugify
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string): string {
  // 日本語を含むタイトルの場合、正しく英数字に変換されるように
  const hasNonLatinChars = /[^\u0000-\u007F]/.test(title);
  
  if (hasNonLatinChars) {
    // 日本語などの非ラテン文字を含む場合
    // タイトルの最初の数文字をベースにしつつ、ランダム文字列を追加
    const timestamp = new Date().getTime().toString(36).slice(-4);
    const randomStr = Math.random().toString(36).substring(2, 6);
    
    // 英数字のみを抽出して先頭に付ける（存在する場合）
    const latinChars = title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    const prefix = latinChars ? `${latinChars}-` : '';
    
    return `${prefix}${timestamp}-${randomStr}`.toLowerCase();
  }
  
  // 英数字のみの場合は従来の処理
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
