import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/utils/blog-server';
import BlogList from '@/components/blog/blog-list';
import Breadcrumb from '@/components/ui/breadcrumb';
import { generateMetadata } from '@/lib/seo/meta-helpers';

export const metadata: Metadata = generateMetadata({
  title: 'ブログ・お役立ち情報',
  description: 'With-youが提供する子育てや教育に関する情報ブログです。学習方法や子どもの成長に役立つヒントを発信しています。',
  keywords: 'ブログ,教育,学習方法,勉強法,子育て,受験対策,学習習慣',
  url: '/blog',
});

export default async function BlogPage() {
  // ブログ記事を取得
  const posts = await getBlogPosts();
  
  return (
    <div className="min-h-screen">
      <Breadcrumb />
      
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ブログ・お役立ち情報
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            子育てや教育に関する情報を定期的に発信しています。
            学習方法や子どもの成長をサポートするヒントをご覧ください。
          </p>
        </div>
        
        {/* ブログリスト表示 */}
        <div className="max-w-7xl mx-auto">
          <BlogList posts={posts} />
        </div>
      </section>
    </div>
  );
}
