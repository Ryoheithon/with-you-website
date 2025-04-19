import { Metadata } from 'next';
import BlogForm from '@/components/admin/blog-form';

export const metadata: Metadata = {
  title: '新規ブログ作成 | With-you 管理画面',
  description: 'With-you 新規ブログ記事の作成',
};

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white">新規ブログ作成</h1>
      </div>
      <BlogForm />
    </div>
  );
}
