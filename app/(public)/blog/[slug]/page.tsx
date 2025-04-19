import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getStaticBlogPosts } from '@/lib/utils/blog-server';
import { formatDate } from '@/lib/utils/date';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'ブログ記事が見つかりません | With-you',
    };
  }
  
  return {
    title: `${post.title} | With-you ブログ`,
    description: post.excerpt,
    openGraph: post.featured_image
      ? {
          images: [{ url: post.featured_image }],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const posts = await getStaticBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="bg-white">
      {/* Hero section with gradient header band */}
      <div className="relative bg-gradient-to-r from-[#ED765E] to-[#FEA858] py-12 md:py-16">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/pattern.svg" 
            alt="Background pattern" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="text-white/80 mb-2">
            {formatDate(post.created_at)}
          </div>
        </div>
      </div>
      
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#5046cc] hover:text-[#3d35aa] mb-8"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          ブログ一覧に戻る
        </Link>
        
        {post.featured_image && (
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8 shadow-md">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: post.content_html }} className="markdown-body" />
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">With-youについて</h2>
          <p className="text-gray-700 mb-4">
            With-youは、お子様一人ひとりの可能性を最大限に引き出す教育サービスを提供しています。
            個別指導を中心に、お子様の学力向上と自己肯定感の育成をサポートします。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#6c63ff] text-white hover:bg-[#5046cc] px-6 py-2 rounded-md font-medium transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </article>
    </div>
  );
}
