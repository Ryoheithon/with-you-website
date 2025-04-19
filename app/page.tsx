import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import { generateMetadata } from '@/lib/seo/meta-helpers';

// メタデータ拡張
export const metadata: Metadata = generateMetadata({
  title: '一人ひとりの可能性を伸ばす教育サポート',
  description: 'With-youは、子どもたち一人ひとりの可能性を最大限に引き出す教育サポートを提供しています。学びの楽しさを通じて、未来を切り拓く力を育みます。',
  keywords: '教育,学習支援,個別指導,With-you,塾,家庭教師,学習プラットフォーム,子育て',
  ogImage: '/images/home-og-image.jpg',
  url: '/',
});

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ページのJSON-LDスキーマ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'With-you | 一人ひとりの可能性を伸ばす教育サポート',
            description: 'With-youは、子どもたち一人ひとりの可能性を最大限に引き出す教育サポートを提供しています。学びの楽しさを通じて、未来を切り拓く力を育みます。',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://with-you.edu',
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', 'h2', '.speakable']
            },
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-[#ED765E] to-[#FEA858]">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/pattern.svg" 
            alt="背景パターン" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 flex flex-col items-center text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            一人ひとりに合わせた<br className="hidden md:block" />
            <span className="text-[#FEA858]">学びの喜び</span>を提供します
          </h1>
          <p className="text-xl max-w-3xl mb-10 text-white/90 speakable">
            With-youでは、子どもたち一人ひとりの可能性を最大限に引き出す教育サポートを提供しています。
            学びの楽しさを通じて、未来を切り拓く力を育みます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-white text-[#ED765E] hover:bg-[#FEA858]/20 hover:text-[#ED765E] transition-colors shadow-lg"
              aria-label="無料体験授業に申し込む"
            >
              無料体験授業に申し込む
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors"
              aria-label="With-youについて詳しく"
            >
              With-youについて詳しく
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-[#ED765E]/10 text-[#ED765E] font-medium text-sm mb-4">WITH-YOUの特徴</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
              一人ひとりに合わせた教育プログラム
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg speakable">
              With-youでは、お子様の学習スタイルや目標に合わせた個別のアプローチで、
              効果的かつ楽しい学習体験を提供しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-[#ED765E]/30 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED765E] to-[#FEA858] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#ED765E] transition-colors">個別指導</h3>
              <p className="text-gray-600">
                一人ひとりの学習スタイルや進度に合わせた、きめ細かな指導を行います。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-[#ED765E]/30 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED765E] to-[#FEA858] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#ED765E] transition-colors">楽しく学習</h3>
              <p className="text-gray-600">
                学ぶ楽しさを感じられるよう、創造的で魅力的な教材やアクティビティを提供します。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-[#ED765E]/30 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED765E] to-[#FEA858] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#ED765E] transition-colors">保護者との連携</h3>
              <p className="text-gray-600">
                保護者の方と密に連携し、お子様の成長を共に見守り、サポートします。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all hover:border-[#ED765E]/30 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED765E] to-[#FEA858] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-[#ED765E] transition-colors">総合的な教育</h3>
              <p className="text-gray-600">
                学力だけでなく、社会性や自己肯定感など、子どもの総合的な成長を促します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-[#ED765E]/10 text-[#ED765E] font-medium text-sm mb-4">生徒・保護者の声</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
              With-youで成長する子どもたち
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg speakable">
              With-youで学ぶ生徒たちと保護者の方々からいただいた声をご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative">
              <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
              <p className="text-gray-700 mb-6 pt-4">
                With-youに通い始めてから、子どもの学習に対する姿勢が変わりました。以前は勉強が嫌いでしたが、今では自分から進んで勉強するようになりました。
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold mr-4" aria-hidden="true">
                  佐
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">佐藤さん</h4>
                  <p className="text-sm text-gray-500">中学3年生の保護者</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative">
              <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
              <p className="text-gray-700 mb-6 pt-4">
                算数が苦手だった娘が、With-youの個別指導で基礎からしっかり学び直すことができました。テストの点数も上がり、「算数が楽しい」と言うようになりました。
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold mr-4" aria-hidden="true">
                  田
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">田中さん</h4>
                  <p className="text-sm text-gray-500">小学5年生の保護者</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative">
              <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
              <p className="text-gray-700 mb-6 pt-4">
                先生方の熱心な指導のおかげで、苦手だった英語が得意科目になりました。With-youは単に勉強を教えるだけでなく、学ぶ意欲も高めてくれます。
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold mr-4" aria-hidden="true">
                  山
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">山本くん</h4>
                  <p className="text-sm text-gray-500">高校2年生</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials" className="inline-flex items-center text-[#ED765E] font-medium hover:text-[#FEA858] transition-colors">
              すべての体験談を見る
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#ED765E] to-[#FEA858] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              お子様の可能性を最大限に引き出します
            </h2>
            <p className="text-xl mb-10 text-white/90 speakable">
              まずは無料体験授業で、With-youの教育環境をご体験ください。
              お子様の学習状況や目標に合わせたプランをご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-white text-[#ED765E] hover:bg-[#FEA858]/20 transition-colors shadow-lg"
                aria-label="無料体験授業に申し込む"
              >
                無料体験授業に申し込む
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors"
                aria-label="料金プランを見る"
              >
                料金プランを見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
