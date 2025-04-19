import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getStaticBlogPosts, getBlogPosts } from '@/lib/utils/blog-server';
import { formatDate } from '@/lib/utils/date';
import Breadcrumb from '@/components/ui/breadcrumb';
import RelatedPosts from '@/components/blog/related-posts';
import { generateBlogMetadata } from '@/lib/seo/meta-helpers';

// 静的パラメータの生成（ビルド時に静的ページを生成）
export async function generateStaticParams() {
  const posts = await getStaticBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 動的メタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
      description: 'お探しの記事は見つかりませんでした。',
    };
  }
  
  // ブログ記事用のメタデータを生成
  return generateBlogMetadata({
    title: post.title,
    description: post.excerpt || `${post.title}に関する情報をご紹介します。`,
    slug: post.slug,
    publishedAt: post.created_at,
    updatedAt: post.updated_at,
    featuredImage: post.featured_image,
    // タグ情報がある場合は追加（実際のデータ構造に合わせて調整）
    tags: ['教育', '学習', 'With-you'],
  });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // 関連記事を取得
  const allPosts = await getBlogPosts();
  
  return (
    <div className="min-h-screen">
      <Breadcrumb />
      
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <time dateTime={post.created_at.toISOString()}>
                {formatDate(post.created_at)}
              </time>
              {post.updated_at && post.updated_at > post.created_at && (
                <span className="ml-4">
                  （更新日: {formatDate(post.updated_at)}）
                </span>
              )}
            </div>
            
            {post.featured_image && (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            {post.excerpt && (
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700 italic">{post.excerpt}</p>
              </div>
            )}
          </header>
          
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content_html }} 
              className="markdown-body"
            />
          </div>
          
          {/* ソーシャルシェアボタン */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">この記事をシェアする</h2>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                aria-label="Twitterでシェア"
              >
                Twitter
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#4267B2] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                aria-label="Facebookでシェア"
              >
                Facebook
              </a>
              <a 
                href={`https://line.me/R/msg/text/?${encodeURIComponent(post.title)}%0D%0A${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#00B900] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                aria-label="LINEでシェア"
              >
                LINE
              </a>
            </div>
          </div>
          
          {/* 関連記事 */}
          <RelatedPosts posts={allPosts} currentPostId={post.id} />
        </div>
      </article>
    </div>
  );
}
