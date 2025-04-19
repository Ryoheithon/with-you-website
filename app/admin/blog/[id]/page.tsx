import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogForm from '@/components/admin/blog-form';
import { getBlogPostById } from '@/lib/utils/blog-admin-server';

export const metadata: Metadata = {
  title: 'ブログ編集 | With-you 管理画面',
  description: 'With-you ブログ記事の編集',
};

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPostById(params.id);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white">ブログ編集</h1>
      </div>
      <BlogForm post={post} />
    </div>
  );
}
