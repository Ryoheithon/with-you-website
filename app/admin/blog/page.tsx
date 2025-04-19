import { Metadata } from 'next';
import { getAllBlogPostsForAdmin } from '@/lib/utils/blog-server';
import BlogList from '@/components/admin/blog-list';

export const metadata: Metadata = {
  title: 'ブログ管理 | With-you 管理画面',
  description: 'With-you ブログ記事の管理',
};

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsForAdmin();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-white">ブログ管理</h1>
        <p className="text-white/80 mt-1">記事の作成・編集・削除を行えます</p>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
