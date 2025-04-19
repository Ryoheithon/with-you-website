'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientClient } from '@/lib/supabase/client';
import LogoutButton from '@/components/admin/logout-button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClientClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();
  }, [supabase.auth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6c63ff]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  const navItems = [
    { name: 'ダッシュボード', href: '/admin', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ) },
    { name: 'ブログ管理', href: '/admin/blog', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
      </svg>
    ) },
    { name: 'お問い合わせ', href: '/admin/contacts', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ) },
  ];

  // ダッシュボードのパスが他のパスのプレフィックスになっているため、特別な処理が必要
  const isActive = (path: string) => {
    // ダッシュボードの場合は完全一致のみ
    if (path === '/admin') {
      return pathname === '/admin';
    }
    // それ以外のパスは、パスが前方一致する場合にアクティブとする
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-[#6c63ff] to-blue-600 shadow text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">With-you 管理画面</h1>
          <LogoutButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <nav className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-[#6c63ff] to-blue-600 text-white">
                <h2 className="font-medium text-sm">管理メニュー</h2>
              </div>
              <ul className="p-2">
                {navItems.map((item) => (
                  <li key={item.href} className="mb-1 last:mb-0">
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? 'bg-purple-50 text-[#6c63ff]'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#6c63ff]'
                      } transition-colors`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="md:col-span-3">
            <div className="bg-white shadow-md rounded-lg p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
