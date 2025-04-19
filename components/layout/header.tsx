'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import SearchBar from '@/components/ui/search-bar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'トップページ', href: '/' },
    { name: 'ご挨拶', href: '/about' },
    { name: '保護者の方へ', href: '/for-parents' },
    { name: '学校の先生へ', href: '/for-teachers' },
    { name: '利用者の方の声', href: '/testimonials' },
    { name: '料金表', href: '/pricing' },
    { name: 'ブログ', href: '/blog' },
    { name: 'お問い合わせ', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              {/* Replace with your actual logo */}
              <div className="text-xl font-bold text-[#ED765E]">
                With-you
              </div>
            </div>
          </Link>

          {/* Desktop search button */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <SearchBar />
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-[#ED765E]',
                    isActive(item.href)
                      ? 'text-[#ED765E]'
                      : 'text-gray-600'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Mobile search toggle */}
            <button
              className="focus:outline-none"
              onClick={toggleSearch}
              aria-label="検索"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニュー"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 pb-2">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-white border-t border-gray-200">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#ED765E] px-2 py-1',
                  isActive(item.href)
                    ? 'text-[#ED765E] bg-gray-50'
                    : 'text-gray-600'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
