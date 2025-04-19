'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBlogPost } from '@/lib/utils/blog-admin-client';
import { formatDate } from '@/lib/utils/date';
import { BlogPost } from '@/types/blog';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの記事を削除しますか？この操作は元に戻せません。')) {
      return;
    }

    setIsDeleting(id);
    setError(null);

    try {
      const success = await deleteBlogPost(id);
      if (success) {
        router.refresh();
      } else {
        setError('記事の削除中にエラーが発生しました');
      }
    } catch (err) {
      console.error('Blog deletion error:', err);
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-700">合計 {posts.length} 件の記事</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-[#ED765E] text-white px-5 py-2.5 rounded-md hover:bg-[#FEA858] transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          新規作成
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  タイトル
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  ステータス
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  作成日
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  更新日
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">アクション</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-700">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? '公開中' : '下書き'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(post.updated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-[#ED765E] hover:text-[#FEA858] mr-4"
                      >
                        編集
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-gray-700 hover:text-gray-900 mr-4"
                      >
                        表示
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={isDeleting === post.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {isDeleting === post.id ? '削除中...' : '削除'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-700">
                    ブログ記事がありません。新しく作成してください。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
