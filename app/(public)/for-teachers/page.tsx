import Link from 'next/link';

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/meta-helpers';

export const metadata: Metadata = generateMetadata({
  title: '学校の先生へ',
  description: 'With-youは学校の先生方の悩みに寄り添い、クラス運営や保護者対応など様々な課題解決をサポートします。子どもたちの成長を共に見守りましょう。',
  keywords: '教師,先生,学校,クラス運営,保護者対応,子ども理解,授業改善,教育相談',
  url: '/for-teachers',
});

export default function ForTeachersPage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ヘッダーバンド */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ED765E] to-[#FEA858]"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">
            学校の先生へ
          </h1>
          <p className="text-lg text-white/90 text-center max-w-2xl mx-auto">
            教育現場の課題解決をサポートし、すべての子どもたちの成長を共に見守ります。
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 導入セクション */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            私は知っています。学校の先生が沢山の苦労と悩みを抱えてしまうことを。子どもたちへの対応、保護者への対応、管理職の先生方にもそれぞれにご苦労があるはずです。
          </p>
          
          <div className="bg-gradient-to-r from-[#ED765E]/10 to-[#FEA858]/10 p-6 rounded-lg mb-6 border-l-4 border-[#ED765E]">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              クラス運営や保護者の皆さんとの関係に自信を失っていたら…
            </h3>
            <p className="text-gray-800 text-lg">
              私と一緒に考えましょう
            </p>
          </div>
        </div>

        {/* 子どもたちとの関わり方セクション */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            子どもたちとの関わり
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            子どもたちは関わり方で変わります。子どもたちと心を通わせ、子どもを理解し、共感することが必要なのは言うまでも無いですが、子どもの未来を一緒に思い描きましょう。クラスの目標は皆で作り、ルールも一緒に考え、問題が起きた時には皆で作った目標と合わせて考えましょう。
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            授業は、子どもたちを自分の授業に「惹きつける」ことが必要です。特に最初の5分が大事で、授業開始から彼らの興味・関心を高めなくてはいけません。自信を持つためにあなたが身に着ける必要のある技術があります。
          </p>
          
          <p className="text-gray-700 leading-relaxed font-medium text-lg">
            子どもたちを変容させるために、一緒に考えていきましょう。
          </p>
        </div>

        {/* 保護者との関係構築セクション */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            保護者の方と明るい未来を思い描こう
          </h2>
          <p className="text-gray-700 mb-6 font-medium text-lg">
            保護者の皆さんとの関係構築に自信を失っていませんか？
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            クレームともとれる要望を受けて気持ちが沈んでいないでしょうか。こじれてしまった…と諦めかけていませんか？保護者の皆さんはクレーマーではありません。保護者の方々のご意見には、耳の痛いこともあります。しかし、聞いていくと、文句を言いに来たのではなく、子どものことで悩み、不安で苦しい気持ちでいっぱいなことがわかります。
          </p>
          
          <p className="text-gray-700 leading-relaxed text-lg">
            保護者のかたの気持ちにどんなふうに寄り添えばいいのか。状況によっては私も先生と一緒に保護者の方とお会いします。そして、先生に相談された保護者の方と共に、明るい未来を描ける、そんな気持ちを持てるよう私はお手伝いします。
          </p>
        </div>

        {/* CTA セクション */}
        <section className="py-12 bg-gradient-to-br from-[#ED765E] to-[#FEA858] text-white rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                教育のプロとして成長するために
              </h2>
              <p className="text-xl mb-10 text-white/90">
                一人で抱え込まず、共に考えていきましょう。With-youがあなたの教育活動をサポートします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-white text-[#ED765E] hover:bg-[#FEA858]/20 hover:text-white transition-colors shadow-lg"
                  aria-label="お問い合わせはこちらから"
                >
                  お問い合わせはこちらから
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
