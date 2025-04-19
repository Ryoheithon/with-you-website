import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/meta-helpers';

export const metadata: Metadata = generateMetadata({
  title: 'With-you料金表',
  description: 'With-youのサービス料金表です。カウンセリング、トレーニング、学習サポートなど、様々なプランをご用意しています。',
  keywords: '料金,料金表,カウンセリング,トレーニング,学習サポート,発達障害,相談,支援',
  url: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero section with gradient header band and pattern overlay */}
      <div className="relative bg-gradient-to-r from-[#ED765E] to-[#FEA858] py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/pattern.svg" 
            alt="Background pattern" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            With-you料金表
          </h1>
          <p className="text-lg max-w-3xl mx-auto opacity-90">
            料金はすべて税込です。毎年12月末に見直しをし、改訂をすることもあります。
            対応可能地域は千葉市を中心としたエリアですがその限りではありませんのでお問合せ下さい。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* お電話でのカウンセリングについての案内 */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10 border border-gray-200">
          <p className="text-gray-700">
            お電話でのカウンセリングも可能ですのでご相談下さい。（1回30分まで2,500円、50分まで4,000円）
          </p>
          <p className="text-gray-700 mt-2">
            お支払い方法はお振込みまたは直接でお願いしています。
          </p>
        </div>

        <Section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            児童・生徒・保護者の方向けメニュー　対象：4歳～18歳
          </h2>

          {/* カウンセリング */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-[#ED765E] border-2 mb-10">
            <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] py-3 px-6">
              <h3 className="text-xl font-bold text-white">カウンセリング　対面：初回60～90分6,000円　2回目以降60分4,500円</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                お子様に関する悩み、お子様との関わり方に関する悩み、学校との関わり方についての悩みなどあらゆる相談に対応します。お話をよく伺い、様々な悩みに合わせて、具体的なアドバイスを行います。また、ご要望に応じて、下記のトレーニングや支援なども行っております。料金は一律です。
              </p>
            </div>
          </div>

          {/* お子様へのトレーニング */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">お子様へのトレーニング</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                月4回程度を基本に、学校生活に上手く適応するために今必要な力を育てるソーシャルスキルトレーニングや「どうせできない」「もう無理」の気持ちを減らし、「折れない心、困難に負けない心」を育てるためのレジリエンストレーニング等を行います。保護者様には必要に応じて電話でお伝えしたり面談でご報告をしています。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#ED765E]">
                <h4 className="font-medium text-gray-800 mb-2">ソーシャルスキルトレーニング、レジリエンストレーニングを受けられる方へ</h4>
                <p className="text-gray-700">
                  お子様の取り巻く環境や抱えている問題の状況を把握し、トレーニングの効果を高めるために、月１回の保護者の面談を別日に設定し、お子様の様子を教えてください。 ただし、面談については、初回以外は電話面談でもお受けいたします。３ヶ月に１回は、対面面談でお願いいたします。
                </p>
              </div>
            </div>
          </div>

          {/* 苦手な学習サポート */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">苦手な学習サポート</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                一人ひとりに合わせた適切な支援（教材作成・力を引き出す指導ステップ）を行い、「できた！」「わかった！」「楽しい！」を実感し少しずつ自信をつけていきます。
              </p>
              <p className="text-gray-700 mb-2">
                ※小学生は全学年全科目可能です。中学生以降はご相談下さい。
              </p>
              <p className="text-gray-700">
                学校へお願いする支援計画なども作成できます。（5,000円～）
              </p>
            </div>
          </div>

          {/* 親子トレーニング */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">親子トレーニング</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                レジリエンストレーニング、ほめほめトレーニング、かかわりトレーニングなどを親子で一緒にやることで、そのまま家でも行うことができ効果的です。抱えている悩みに合わせた個別プログラムを作成して行います。（幼児から高校生まで行っています）
              </p>
            </div>
          </div>

          {/* ママやパパのペアトレーニング */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">ママやパパのペアトレーニング</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                ほめて育てることが良いことはわかっている！しかし、できない…お子様とうまく関われない、お子様の暴言がひどい、思いが伝わらない…などすべてのママやパパに適したトレーニングです。幼児から20才までのお子さんのママやパパが参加し、成果をあげています。
              </p>
            </div>
          </div>

          {/* トータルサポート */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">月契約（6ヶ月単位）でのトータルサポートも可能です。</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                お子さんの状態を把握しながら、適切な時期に適切なアプローチをしながら、成長のサポートをしていきます。もちろん、保護者様の悩みや不安は随時受けつけて、常に一緒に考えていきます。
              </p>
              <p className="text-gray-700 mt-2 font-medium">
                ※トータルサポートの内容により金額が異なります。直接ご相談ください。
              </p>
            </div>
          </div>
        </Section>

        <Section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            学校の先生向けメニュー
          </h2>

          {/* 先生向けカウンセリング */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-[#ED765E] border-2 mb-10">
            <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] py-3 px-6">
              <h3 className="text-xl font-bold text-white">カウンセリング　対面：初回90分6,000円　2回目以降60分4,500円</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                関わる子どもについての悩み、子どもとのとの関わり方に関する悩み、学習指導や生活指導についての悩みなどあらゆる相談に対応します。お話をよく伺い、様々な悩みに合わせて、具体的なアドバイスを行います。また、ご要望に応じて、下記のトレーニングや支援、研修なども行っております。
              </p>
            </div>
          </div>

          {/* 伝え方・生徒指導トレーニング */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">伝え方・生徒指導トレーニング</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                『子ども達の心を惹き付ける話し方は･･･、わかりやすく伝えるには･･･』伝授します。問題行動や特性が強い子ども達には、子どもの抱える問題や性格によって伝える方法は違います。翌日からすぐに実践できるように、テンポや声のトーン、向き合い方をお伝えし、時には一緒に練習します。内容によって、一斉（クラス・学年・全校）に伝えた方がいい場合には、問題に合わせた心に響く授業構想・集会構想をお伝えし、練習します。
              </p>
            </div>
          </div>

          {/* 個別面談練習 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">個別面談練習（個人面談対応）</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                保護者との面談が苦手！と思う先生。保護者に信頼される面談のコツを伝授します。どのように話したらよいか悩むときは「このような子にはこんなことを伝えたらよい」ということもアドバイスします。そして、面談を想定して練習をします。当日は、自信を持って面談に望めます。
              </p>
            </div>
          </div>

          {/* その他ミニ研修 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="bg-gray-100 py-3 px-6">
              <h3 className="text-xl font-bold text-gray-800">その他ミニ研修</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                ※複数名でお申込みの場合、人数割り可能です。別途資料代200円程度いただきます。
              </p>

              <h4 className="font-bold text-gray-800 mb-2">【学習面】</h4>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
                <li>低学年はもちろん、高学年でも、全員がいつのまにか挙手するようになる方法</li>
                <li>落ち着かないクラスでも、授業に集中して取り組ませちゃう技</li>
                <li>楽しく！締まる！意欲的になる学習規律のつけ方</li>
                <li>心をほぐして、表現力を高める方法（高学年でもみんなが全身で生き生き表現）</li>
                <li>毎時間、楽しくなる授業構想</li>
                <li>「読む力」を高める方法</li>
                <li>子どもが楽しみながら「書く力」をぐんぐん高める方法</li>
                <li>苦手な子でも「漢字」が書けるようになる方法（一斉授業の中でできます。）</li>
                <li>「言語の力」をつけるため活動だけでなく、「学び大あり」の国語の学習</li>
                <li>のりのりになる音読、しかも言語の力を大きく高める！</li>
                <li>だれもが学校で楽しくしっかり覚えちゃう！「４７都道府県名」など</li>
                <li>教師の発言４０％以下になる「学び合い」いっぱいの算数学習（他教科も）</li>
                <li>国語・算数・社会・理科の指導のコツ</li>
                <li>図工の題材構想や指導の仕方</li>
                <li>子どもたちに力をつけるプレゼンのさせ方</li>
              </ul>

              <h4 className="font-bold text-gray-800 mb-2">【生活・特別活動】</h4>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
                <li>子ども達が、自分たちで目標をつくり続ける１０項目</li>
                <li>無言清掃なのに、子どもたちはチョー生き生き！</li>
                <li>朝の健康観察で、楽しみながらたくさんの力をつけよう</li>
                <li>あいさつは、こうやってできるようにする！</li>
                <li>どんな活動でも「やる気」にさせる方法</li>
                <li>「愛」は、こうやって伝えよう</li>
                <li>生活規律のしつけの仕方</li>
                <li>学級目標の立て方・個別目標の立て方</li>
                <li>日々子どもと一緒に楽しめる技</li>
                <li>長期休み前にやるべきこと（一般的なことではないですよ）</li>
                <li>自信を持てる子にする方法</li>
                <li>自治意識を高め、みんなが生き生きする特別活動</li>
                <li>自治の目的や範囲をはっきりした生き生き学級集会のつくり方</li>
                <li>自治意識を高め、「創」がいっぱいの児童会活動の進め方</li>
                <li>子どもの発想を豊かにする委員会活動の進め方</li>
                <li>全員の先生方が活躍する卒業式練習</li>
                <li>いじめの発見の仕方</li>
                <li>物かくし、落書きなどが、１時間の学活でなくなる方法</li>
              </ul>

              <h4 className="font-bold text-gray-800 mb-2">【保護者対応・学年経営・その他】</h4>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
                <li>どんな保護者でも喜び合える関係になる方法</li>
                <li>保護者と喜びあえる学習参観や懇談会</li>
                <li>保護者と分かり合える、支え合える関係づくり</li>
                <li>保護者の信頼を得る個人面談の仕方（これが子ども達のためになる）</li>
                <li>信頼を得て、一緒に喜べる保護者対応</li>
                <li>チーム力を高める学年経営</li>
                <li>一人ひとり先生の力を伸ばす学年経営</li>
                <li>学校で子どもを育てる・伸ばすヒントは・・・？</li>
                <li>学年集会が、子ども達を変える！</li>
              </ul>

              <p className="text-gray-700 font-medium">
                その他ご希望に応じてアレンジ可能です。お問合せください。
              </p>
            </div>
          </div>
        </Section>

        {/* CTA セクション */}
        <section className="py-12 bg-gradient-to-br from-[#ED765E] to-[#FEA858] text-white rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                まずはお気軽にご相談ください
              </h2>
              <p className="text-xl mb-10 text-white/90">
                With-youでは、お子様や保護者の方、先生方のさまざまな悩みに寄り添います。
                一緒に解決策を見つけていきましょう。
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
