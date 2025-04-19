import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/meta-helpers';

export const metadata: Metadata = generateMetadata({
  title: '私たちについて',
  description: 'With-youの企業理念やミッション、代表挨拶をご紹介します。子どもたちの未来を支える教育事業として、一人ひとりの可能性を最大限に引き出す指導を行っています。',
  keywords: '教育,ご挨拶,With-you,企業理念,ミッション,子育て,学習サポート',
  url: '/about',
});

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ED765E] to-[#FEA858]"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white animate-fade-in">
            ご挨拶
          </h1>
          <p className="text-lg text-white/90 text-center max-w-2xl mx-auto animate-fade-in animation-delay-100">
            With-youは、子どもたち一人ひとりの可能性を最大限に引き出し、未来を切り拓く力を育むことを使命としています。
          </p>
        </div>
      </section>

      <Section variant="default" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="md:w-1/3 relative h-64 w-full md:h-auto">
                <div className="w-full h-full bg-gradient-to-br from-[#ED765E]/10 to-[#FEA858]/10 rounded-lg flex items-center justify-center overflow-hidden border-2 border-[#FEA858]/20">
                  <span className="text-[#ED765E] font-medium text-lg">鳥飼あつです</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
                  子どもたちの未来を支える教育を
                </h2>
                <p className="text-gray-800 mb-4 text-lg">
                  With youで小中高校生の子ども達や保護者の方、先生方への相談業務を行っています。千葉県の公立学校の教員として31年間勤務し、退職後、フリーの立場で相談業務を開始しました。
                </p>
                <p className="text-gray-800 text-lg">
                  どうして私はフリーの立場になったのでしょう？私のキャリアのほとんどは千葉県内数カ所の公立小学校での学級担任です。学級崩壊の立て直し、不登校やいじめの問題に携わることが多かったのが特徴です。
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-800 text-lg leading-relaxed">
                子どもたちだけでなく、保護者の皆さんや教員の相談を沢山受けてきました。有り難いことに校長先生から「先生にお願いすると不登校の子もみんな来られるようになってしまうので不思議です。」と言われたこともありました。ですが、一緒に寄り添って話を聞く中で保護者や子ども達の苦しみを知り、対応の仕方に悩む姿をみると、私はもっと自由な立場からのカウンセラー&アドバイザーの必要性を強く感じたのです。
              </p>

              <p className="text-gray-800 text-lg leading-relaxed">
                また、自分の学年でないとなかなか関われないということもあります。今のタイミングで話せれば子どもは反対の方向に行かずに済むのにと思ったことが多かったのです。
              </p>

              <p className="text-gray-800 text-lg leading-relaxed">
                退職してからはカウンセラーの専門的な知識を学びながら、ボランティアで相談活動を重ねてきました。子どもたち、保護者だけでなく、休職中の教員の復帰のサポートも行って参りました。「相談室With-You」を立ち上げたのはそのような経緯があります。
              </p>

              <p className="text-gray-800 text-lg leading-relaxed">
                私の原点は教員になって最初に赴任した県立校での3年間、特別支援教育に従事したことにあります。その中で、自分の思いをストレートに出してくる子ども達と出逢ったのです。
              </p>

              <p className="text-gray-800 text-lg leading-relaxed">
                『勉強したくない！今、外で遊びたい！など自分の思いや要求は誰にでもあります。教師は、やらせたいことがあってもまずはその気持ちを受け取り、共感していくことが大切だ。』ということに気づかされました。このことが私の児童を理解したり、指導したりしていく上の大きな柱となっています。
              </p>

              <p className="text-gray-800 text-lg leading-relaxed">
                私と一緒に悩みましょう。私と一緒に考えませんか？
              </p>

              <p className="text-gray-800 text-lg leading-relaxed">
                ぜひ一度ご連絡ください。
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in animation-delay-300">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
              私が推薦します
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#ED765E]/10 to-[#FEA858]/10 rounded-lg p-6 border-l-8 border-[#ED765E]">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
                  新津田沼メンタルクリニック　副院長　株式会社ライデック代表
                </h3>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
                  千葉大学子どものこころの発達教育研究センター　松澤大輔
                </h4>
                <p className="text-gray-800 text-lg mb-4">
                  私はクリニックで主に成人の発達障害専門外来を受け持っている精神科医です｡発達障害の診断を行い､患者さんたちの抱える心理的問題について医療的な関わりや社会的支援者との仲介をしています。
                </p>
                <p className="text-gray-800 text-lg mb-4">
                  そんな私が､苦しんでいる子どもたち､学校に適応できない我が子に悩む親御さん、そして子どもたちへの指導に自信を持ちたい先生が相談する相手として､自信を持ってお勧めしたいのが鳥飼先生です。
                </p>
                <p className="text-gray-800 text-lg mb-4">
                  発達障害の特性がある子たちにとって難しいのは､学校生活の困難さが必ずしも目に見える形では出ておらず､周囲の大人に十分には気づいてもらえていないことです｡大人の発達障害を診ていると､それぞれの特性に応じて大人になる前に、とりわけ小学生の時に様々な傷つき体験を持っていることの多さに驚きます。早く気づいてもらえていたらどれだけ良かっただろうと｡
                </p>
                <p className="text-gray-800 text-lg mb-4">
                  鳥飼先生はそういった特性を持つ子どもたちにとって､気付き、のエキスパートです。様々な場面に子どもがどうすれば上手く適応できるか､どうすればその子の長所をクラスの中で発揮できるか､素早く的確に察知することができます｡
                </p>
                <p className="text-gray-800 text-lg mb-4">
                  心配の多い親御さんにとっては､学校とどう繋がるか､悩みが多いものです｡鳥飼先生は架け橋になってくれるはずです。
                </p>
                <p className="text-gray-800 text-lg">
                  さらに、私が鳥飼先生に感銘を受けるのは、小学校の先生方にも技術を伝達してくださることです。鳥飼先生は、子どもたち、親御さんたちだけの存在ではありません。学校の先生は､目の前の子どもの困りごとを知ることはできても、何をしたらいいのか､には悩んでいます｡学校の先生も是非鳥飼先生に相談して下さい。きっと具体的な対応の仕方や子どもたちの特性をクラスの中で輝かせる｢仕掛け｣を伝授してくれるでしょう｡
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTAセクション */}
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
                className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-white text-[#ED765E] hover:bg-[#FEA858]/20 hover:text-white transition-colors shadow-lg"
                aria-label="無料相談に申し込む"
              >
                無料相談に申し込む
              </Link>
              <Link
                href="/testimonials"
                className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors"
                aria-label="お客様の声を見る"
              >
                お客様の声を見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
