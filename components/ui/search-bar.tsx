'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils/date';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // 検索実行
  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      const data = await response.json();
      
      if (response.ok) {
        setResults(data.results || []);
        setIsOpen(true);
      } else {
        console.error('Search error:', data.error);
        setResults([]);
      }
    } catch (error) {
      console.error('Search fetch error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 入力変更ハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  // フォーム送信ハンドラー
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };
  
  // キーボードイベントハンドラー
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // 検索結果の外側をクリックしたらドロップダウンを閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 結果をクリアする
  const clearResults = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };
  
  // 結果リンクをクリックした時の処理
  const handleResultClick = (slug: string) => {
    router.push(`/blog/${slug}`);
    clearResults();
  };
  
  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="ブログを検索..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED765E] focus:border-transparent text-gray-800 placeholder-gray-600"
          aria-label="検索"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-[#ED765E]"
          aria-label="検索実行"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </form>
      
      {/* 検索結果ドロップダウン */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-700">
              <div className="animate-spin h-5 w-5 border-t-2 border-[#ED765E] border-r-2 rounded-full mx-auto mb-2"></div>
              検索中...
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="p-2 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    {results.length}件の検索結果
                  </span>
                  <button
                    onClick={clearResults}
                    className="text-xs text-gray-700 hover:text-[#ED765E]"
                  >
                    閉じる
                  </button>
                </div>
              </div>
              <ul className="py-2">
                {results.map((result) => (
                  <li key={result.id} className="hover:bg-gray-50">
                    <button
                      onClick={() => handleResultClick(result.slug)}
                      className="px-4 py-2 w-full text-left block"
                    >
                      <div className="font-medium text-[#ED765E] line-clamp-1">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {formatDate(result.created_at)}
                      </div>
                      {result.excerpt && (
                        <div className="text-sm text-gray-700 mt-1 line-clamp-1">
                          {result.excerpt}
                        </div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-2 border-t border-gray-200 bg-gray-50">
                <Link 
                  href="/blog" 
                  className="text-sm text-[#ED765E] hover:underline"
                  onClick={clearResults}
                >
                  すべての記事を見る
                </Link>
              </div>
            </div>
          ) : query.trim() !== '' ? (
            <div className="p-4 text-center text-gray-700">
              検索結果がありません。別のキーワードをお試しください。
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
