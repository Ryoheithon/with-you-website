import { Suspense } from 'react';
import Breadcrumb from '@/components/ui/breadcrumb';
import SearchResults from './search-results';

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Breadcrumb />
      
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">検索</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="animate-spin h-10 w-10 border-t-2 border-[#ED765E] border-r-2 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">読み込み中...</p>
            </div>
          }>
            <SearchResults />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
