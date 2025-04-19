import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ページが見つかりません | With-you',
  description: 'お探しのページは見つかりませんでした。With-youウェブサイトのホームページへお戻りください。',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-[#ED765E]">404</h1>
        <h2 className="text-2xl font-semibold mt-6 mb-3">ページが見つかりません</h2>
        <p className="text-gray-600 mb-8">
          お探しのページは移動または削除された可能性があります。
          URLが正しいかご確認いただくか、以下のリンクからホームページにお戻りください。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#ED765E] px-6 py-3 text-white hover:bg-[#FEA858] transition-colors"
          >
            ホームに戻る
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border border-[#ED765E] px-6 py-3 text-[#ED765E] hover:bg-[#ED765E]/5 transition-colors"
          >
            ブログを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
