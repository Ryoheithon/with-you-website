'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // エラーをロギング
  useEffect(() => {
    console.error('エラーが発生しました:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-3">問題が発生しました</h1>
        <p className="text-gray-600 mb-8">
          申し訳ありませんが、予期せぬエラーが発生しました。
          再度試すか、以下のリンクからホームページにお戻りください。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-[#ED765E] px-6 py-3 text-white hover:bg-[#FEA858] transition-colors"
          >
            再試行する
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-[#ED765E] px-6 py-3 text-[#ED765E] hover:bg-[#ED765E]/5 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
