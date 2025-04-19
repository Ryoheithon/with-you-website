import { Metadata } from 'next';
import BlogList from '@/components/blog/blog-list';
import { getBlogPosts } from '@/lib/utils/blog-server';
import { Section } from '@/components/ui/section';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ブログ | With-you',
  description: '教育や学習に関する情報、With-youの活動報告、お知らせなどを掲載しています。',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <div className="bg-white">
      {/* Hero section with gradient header band and pattern overlay */}
      <div className="relative bg-gradient-to-r from-[#ED765E] to-[#FEA858] py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/pattern.svg" 
            alt="Background pattern" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            With-youブログ
          </h1>
          <p className="text-lg max-w-3xl mx-auto opacity-90">
            教育や学習に関する情報、With-youの活動報告、お知らせなどを掲載しています。
            最新の教育トレンドや効果的な学習方法についても定期的に発信しています。
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[#6c63ff] to-blue-600 bg-clip-text text-transparent">
              最新の記事
            </h2>
            <BlogList posts={posts} />
          </div>
        </div>
      </section>
    </div>
  );
}
