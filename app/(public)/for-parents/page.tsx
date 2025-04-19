import Link from 'next/link';

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/meta-helpers';

export const metadata: Metadata = generateMetadata({
  title: '保護者の方へ',
  description: 'With-youは保護者の皆様のお悩みに寄り添い、子どもたちの健やかな成長をサポートします。子育てや教育に関するさまざまな課題を一緒に解決していきましょう。',
  keywords: '子育て,保護者,悩み,発達障害,不登校,学校適応,いじめ,カウンセリング',
  url: '/for-parents',
});

export default function ForParentsPage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ヘッダーバンド */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ED765E] to-[#FEA858]"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">
            保護者の方へ
          </h1>
          <p className="text-lg text-white/90 text-center max-w-2xl mx-auto">
            お子様の成長をともに支え、明るい未来を一緒に築いていきましょう。
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 悩みセクション */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            このようなことでお悩みではありませんか？
          </h2>
          <ul className="space-y-3 text-gray-700 mb-8">
            <li className="flex items-start">
              <div className="text-[#ED765E] mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>友だちと上手く関われず、トラブルが多い</span>
            </li>
            <li className="flex items-start">
              <div className="text-[#ED765E] mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>学校で落ち着かず、離籍をしてしまう</span>
            </li>
            <li className="flex items-start">
              <div className="text-[#ED765E] mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>周りの人の気持ちが読み取れない</span>
            </li>
            <li className="flex items-start">
              <div className="text-[#ED765E] mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>先生方からよく怒られる、注意を受ける</span>
            </li>
            <li className="flex items-start">
              <div className="text-[#ED765E] mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>やってはいけないことを教えても、伝わらない</span>
            </li>
          </ul>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            子どもたちの苦しみを理解したうえで適切な支援を行っていくと少しずつ変容していくことができます。適切な支援は、子どもたちの成功体験を生みます。すると、少しずつ自信が生まれ、大変なハードルを乗り越える力が生まれてきます。生活の中でうまくいかないことに悩んでいた子どもたち。味わった小さな自信が前に進むための人生の大きな一歩です。
          </p>
        </div>

        {/* 子どもと保護者の心をつなぐセクション */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            子どもと保護者の心をつなぐ
          </h2>
          <p className="text-gray-700 mb-6 font-medium">
            保護者の方々も多くの悩みを抱えています。
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            保護者の中には、子どもを愛せないで苦しんでいる方もいました。お子さんが小さい時は、お母さん自身がいっぱいいっぱいになっていました。そんな時は、お母さんの得意なことや好きなことを聞き、できることは私もチャレンジし、お母さんを私が頼るような形にして自信をつけてもらいました。それと平行して、子どもにお母さんのステキなことを聞き、お母さんの心をつなぐようにしました。
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            また、高学年以上の場合は、お母さんの愛せないという悲鳴の時には、子どもが母親に対して反抗的になっていることが多かったです。そこで、まずはお母さんからの聞き取りの中で、子どもの頑張っていることや良さを聞き取り、次の面談で子どもにお母さんの思いを伝え、そしてお母さんへ思いを返す言葉を何気なく聞き出し、心をつなぎました。それと同時に思春期の意味や程よい距離感のつくりかたを具体的に話しました。
          </p>
        </div>

        {/* 一緒に未来を描くセクション */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            一緒に未来を描く
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            不登校の中学生や高校生、学校の先生に言われたことでどうしてよいかわからなくなった保護者の方、いじめに悩む小学生や中学生、子どもとの関係がうまく築けない、子どもが言うことをきかない、学校へうまく適応できないなど、支援をしてほしいが学校にどこまで求めたらよいかなど、苦しい気持ちに寄り添いながら一緒に解決策を考えます。
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            どんな場合でも、保護者の方の思いに寄り添い、先生方の思いも受け止め、子どもの立場にたって児童理解をし、思いを共感し、未来を一緒に描いたうえで、支援の仕方を考えたり、子ども・保護者・先生たちを支えていったりすることで、みんなの未来が明るいものになることが多いと思います。
          </p>
        </div>

        {/* CTA セクション */}
        <section className="py-12 bg-gradient-to-br from-[#ED765E] to-[#FEA858] text-white rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                お子様の明るい未来のために
              </h2>
              <p className="text-xl mb-10 text-white/90">
                まずはお気軽にご相談ください。一人で悩まず、一緒に解決策を見つけていきましょう。
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
