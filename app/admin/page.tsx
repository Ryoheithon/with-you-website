import { Metadata } from 'next';
import Link from 'next/link';
import { getUnreadContacts } from '@/lib/utils/contact';
import { getAllBlogPostsForAdmin } from '@/lib/utils/blog-server';
import { formatDate } from '@/lib/utils/date';

export const metadata: Metadata = {
  title: '管理画面 | With-you',
  description: 'With-you 管理画面',
};

export default async function AdminDashboardPage() {
  const unreadContacts = await getUnreadContacts();
  const recentPosts = await getAllBlogPostsForAdmin();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] text-transparent bg-clip-text">ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-[#ED765E] to-[#FEA858] text-transparent bg-clip-text">未読のお問い合わせ</h2>
            <Link
              href="/admin/contacts"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              すべて表示
            </Link>
          </div>
          
          {unreadContacts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {unreadContacts.slice(0, 5).map((contact) => (
                <li key={contact.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{contact.name}</p>
                      <p className="text-xs text-gray-700">{contact.email}</p>
                    </div>
                    <p className="text-xs text-gray-700">
                      {formatDate(contact.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-center py-4">
              未読のお問い合わせはありません
            </p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-[#ED765E] to-[#FEA858] text-transparent bg-clip-text">最近のブログ記事</h2>
            <Link
              href="/admin/blog"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              すべて表示
            </Link>
          </div>
          
          {recentPosts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentPosts.slice(0, 5).map((post) => (
                <li key={post.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{post.title}</p>
                      <p className="text-xs text-gray-700">
                        {post.published ? '公開中' : '下書き'}
                      </p>
                    </div>
                    <p className="text-xs text-gray-700">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-center py-4">
              ブログ記事がありません
            </p>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#ED765E] to-[#FEA858] text-transparent bg-clip-text">クイックアクション</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/admin/blog/new"
            className="flex items-center p-4 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg
              className="h-6 w-6 text-blue-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-gray-800">新規ブログ作成</span>
          </Link>
          
          <Link
            href="/admin/contacts"
            className="flex items-center p-4 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg
              className="h-6 w-6 text-blue-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="text-gray-800">お問い合わせ管理</span>
          </Link>
          
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center p-4 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg
              className="h-6 w-6 text-blue-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="text-gray-800">サイトを表示</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
