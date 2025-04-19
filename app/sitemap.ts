import { MetadataRoute } from 'next';
import { getStaticBlogPosts } from '@/lib/utils/blog-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://with-you.edu';
  
  // 静的ページのリスト
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/for-parents',
    '/for-teachers',
    '/pricing',
    '/testimonials',
    '/blog',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // ブログ記事の取得
  const posts = await getStaticBlogPosts();
  
  // ブログ記事のURLマッピング
  const blogPages = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated_at || post.created_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...blogPages];
}
