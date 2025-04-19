'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import BlogList from '@/components/blog/blog-list';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (response.ok) {
          setResults(data.results || []);
        } else {
          setError(data.error || '検索中にエラーが発生しました');
          setResults([]);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('検索中に予期せぬエラーが発生しました');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSearchResults();
  }, [query]);
  
  // ページのタイトルを動的に更新
  useEffect(() => {
    document.title = query 
      ? `「${query}」の検索結果 | With-you` 
      : '検索 | With-you';
  }, [query]);
  
  return (
    <>
      {query && (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            「{query}」の検索結果
          </h2>
          <p className="text-gray-600">
            検索結果: {results.length}件見つかりました
          </p>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-10 w-10 border-t-2 border-[#ED765E] border-r-2 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">検索中...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      ) : results.length > 0 ? (
        <BlogList posts={results} />
      ) : query ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            検索結果がありません
          </h3>
          <p className="text-gray-600">
            別のキーワードを試すか、より一般的な用語で検索してください。
          </p>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            検索キーワードを入力してください
          </p>
        </div>
      )}
    </>
  );
}