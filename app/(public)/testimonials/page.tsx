import Link from 'next/link';

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/meta-helpers';

export const metadata: Metadata = generateMetadata({
  title: '利用者の方の声',
  description: 'With-youをご利用いただいた保護者の方や学校の先生からの声をご紹介します。子どもたちの成長を一緒に喜び合える教育サポートサービスです。',
  keywords: '口コミ,体験談,評判,教育サポート,子育て,保護者,教師,発達障害,不登校',
  url: '/testimonials',
});

export default function TestimonialsPage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ヘッダーバンド */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ED765E] to-[#FEA858]"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">
            利用者の方の声
          </h1>
          <p className="text-lg text-white/90 text-center max-w-2xl mx-auto">
            With-youのサービスをご利用いただいた方々からの声をご紹介します。
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* 保護者の方からの声セクション */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] p-4 rounded-t-xl">
            <h2 className="text-2xl font-semibold text-white">
              保護者の方からの声
            </h2>
          </div>
          <div className="bg-white rounded-b-xl shadow-md p-8 border-x border-b border-gray-100">
            <div className="space-y-8">
              {/* 木更津市Mさんの声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  鳥飼先生！ありがとうございました。娘との仲もおちつきました。楽しく話ができるようになりました！先生が、娘に私の気持ちをうまく話してくれたおかげです。「うざい」「きえろ」「死ね」「出て行け」などひどい言葉を言い合っていたので、どうしていいかまったくわからなかったです。先生が心をつないでくれたこと感謝です。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    M
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">Mさん</div>
                    <div className="text-sm text-gray-500">木更津市</div>
                  </div>
                </div>
              </div>

              {/* 千葉市Mさんの声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  鳥飼先生がアドバイスをしてくれたように担任の先生に相談したら、担任の先生も気にしてくれていました。学校に話に行くのはどきどきしましたが、鳥飼先生に話し方も教えてもらい安心して話せました。背中を押してもらってよかったです。担任の先生も本当にいい先生だとわかりました。子どもも友達と楽しそうにすごせるようになりました。ありがとうございました。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    M
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">Mさん</div>
                    <div className="text-sm text-gray-500">千葉市</div>
                  </div>
                </div>
              </div>

              {/* 袖ヶ浦市Hさんの声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  鳥飼先生 ありがとうございました。先生にお話を聞いていただき、気持ちが大きくなれ、元気になれました。自分の息子を信じようと思えました。大学生になっても心配しすぎていることは、自分でもわかっているようでもなかなか認められなかったのです。でも、先生が、私を否定せず、その気持ちわかるよと言ってもらってほっとできました。たくさん泣いてしまいましたが、スッキリしました。そして、息子が私のことをわかってくれていることも先生に気づかせてもらいました。また涙がでてきます。先生がよく言うように、でーんとしていきます。笑います。またヘコむと思いますので、よろしくお願いします。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    H
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">Hさん</div>
                    <div className="text-sm text-gray-500">袖ヶ浦市</div>
                  </div>
                </div>
              </div>

              {/* 千葉市Aさんの声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  息子は自閉症とＡＤＨＤの発達障害です。３才から療育をしてきました。小学一年生の時、息子は何をするにも自信がなくチャレンジすることから逃げてしまう子になっていました。学校では、授業中先生の言っていることが理解できないから、聞かない・やらないが当たり前になっていました。自宅では、暴言暴力、何でも否定・・・・宿題は私が教えながら、プリント１枚やらせるのに３時間かかります。毎日付きあえません。そんな時、縁があって鳥飼先生に出会いました。鳥飼先生と私の面談。今までの事、不安に思っている事、いろんな話を聞いて頂きました。鳥飼先生は、ハードルを下げてあげればいいと言いました。ハードルを下げる ＝ 課題を下げる のではなく、ハードルを下げる ＝ 何度も経験をし、自然にできるようにするということでした。
                </p>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  息子にそんなやり方が合うのか？ チャレンジしない息子をどう動かすのか？ どんな方法をするのか？そして、鳥飼先生は息子の好きそうな虫の出てくる詩をやってみると言っていました。私には？でしたが、鳥飼先生の指導で詩を覚えました。ビックリです。まず、指示が入るってことにビックリしました。詩を覚えさせたことにも驚きました。それも、手振り身振りまで付けて表情も明るくて！私は物凄く感動しました。明るい未来が少し見えた気がしました。鳥飼先生の指導で私が一番嬉しく思った事は、前向きにやる力をつけた事です。頑張れる子になっています！頑張っている息子に明るい未来があると希望がもてました。成長が楽しみです。鳥飼先生とこれからも関わっていきたいと強く思います。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    A
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">Aさん</div>
                    <div className="text-sm text-gray-500">千葉市</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 先生方からの声セクション */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] p-4 rounded-t-xl">
            <h2 className="text-2xl font-semibold text-white">
              学校の先生からの声
            </h2>
          </div>
          <div className="bg-white rounded-b-xl shadow-md p-8 border-x border-b border-gray-100">
            <div className="space-y-8">
              {/* 木更津市K先生の声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  こんにちは^o^昨日はありがとうございました。先生に教えてもらったゲームを授業の始まる前にやってみました。Mくんは、始めはやる気になっていなかったのですが教えてもらったような視線の向け方をして、みんなに楽しい雰囲気をつくりました。すると不思議なことにすぐに食いついてきました。そして、さらっと声かけをして入れることができました。みんなで楽しくできました(^-^)vその後は授業にも参加をしてくれました。すごく嬉しかったです。明日も頑張ってみます。なんか私もできそうです。Mくんの居場所づくりも頑張ります。また、報告します。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    K
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">K先生</div>
                    <div className="text-sm text-gray-500">木更津市</div>
                  </div>
                </div>
              </div>

              {/* 木更津市T先生の声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  先日はお世話になりました。あの時はイライラして熱くなっていて、時間をたくさんとって話を聞いてもらいありがとうございました。あのお母さんがそんなに苦しい気持ちでいたかもしれないなどと考えていませんでした。文句ばかり言ってくるので、ひどいクレーマーのようにしか思っていませんでした。鳥飼先生の話を聞いていたら、お母さんの立場になることができました。反省しました。火曜日にお母さんと話をしました。「お母さんはこんな気持ちなの？分かっていなくてごめんね。」と話すとお母さんも泣いて苦しい気持ちを話してくれました。私も泣いてしまいました。やはり、先生の予想通り、つっぱっていなくては自分がつぶれちゃうみたいでした。一緒に頑張ろうと話しました。先生がよく言う「お家の人と一緒に喜び合う」ってこんなことなのかなと少し分かった気がしました。今度は、このお母さんを元気にさせる方法を教えてください。お忙しいと思いますが、空いている日を教えてください。よろしくお願いします。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    T
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">T先生</div>
                    <div className="text-sm text-gray-500">木更津市</div>
                  </div>
                </div>
              </div>

              {/* 千葉市I先生の声 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  やっぱり教師って仕事、いいですね。発達障害だから…できない?とかよりも、その子のできることを増やしてあげたい?と思うことが大事ですね。先生に出会わなければ、できないことに目がいってしまっていました。やっぱり、愛ですね。
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-[#ED765E]/10 rounded-full flex items-center justify-center text-[#ED765E] font-bold text-xl" aria-hidden="true">
                    I
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">I先生</div>
                    <div className="text-sm text-gray-500">千葉市</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 研修参加者の声セクション */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] p-4 rounded-t-xl">
            <h2 className="text-2xl font-semibold text-white">
              校内研修・仲間研究・学習会　参加者の声
            </h2>
          </div>
          <div className="bg-white rounded-b-xl shadow-md p-8 border-x border-b border-gray-100">
            <div className="space-y-6">
              {/* 参加者の声1 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  鳥飼先生の貴重な体験談を含め、とても勉強になるご講話でした。私自身、教員生活を重ね学級経営や子ども達への指導に自信があったのですが、先生の大胆かつきめ細やかな指導法を聞き、自分の未熟さを痛感しました。子ども達が幸せになるためにはどのようにしていけばよいのか深く考えさせられました。また、１０項目の評価についても具体的な手だてを教えてくださいました。子ども達を幸せのため、今回学んだことを早速生かしたいと思いました。本当にありがとうございました。
                </p>
              </div>

              {/* 参加者の声2 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  本日は、御講話いただきありがとうございました。「自分はなぜ教員をめざしたのか。」ということを思い返していました。「子どもの将来に役立つように心も体も頭も育てたい」と思って志望していたんだなぁと思い出していました。先生のお話を聞いて、その思いをもって子どもたちにむきあえているのかということも考えました。私なりに愛をもって接していると思っていたこともまだまだ中途半端だなぁとおもうことばかりでした。愛をもって育てられるよう夢をもって成長していきたいです。
                </p>
              </div>

              {/* 参加者の声3 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  教師の仕事が、こんなにもすばらしいものかと実感しました。教師の意識ひとつで子どもの人生も左右してしまうことも多いことも分かり、責任の重さも感じました。しかし、子どもたちの幸せを考えて向かえば、鳥飼先生のようにたくさんの感動を子どもたちや保護者の方々と一緒にたくさん味わえると思いました。子どもたちのためにたくさん頑張ろうと思いました。燃えてきました。
                </p>
              </div>

              {/* 参加者の声4 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  講師として担任はしていません。でも教師のすばらしさを感じ、初めて担任をやりたいと思いました。
                </p>
              </div>

              {/* 参加者の声5 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  とっても気持ちが前向きになりました。教師の仕事の素晴らしさ、教師にしかできないことがたくさんあることに気がつきました。子どもたちの幸せな未来を描き、教師だからできることを考えなから愛をもって指導に当たりたいと思いました。本当に元気になるご講話をありがとうございました。
                </p>
              </div>

              {/* 参加者の声6 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  楽しくてためになるお話をありがとうございました。あいさつや返事は、して当たり前という気持ちで指導していたことに気づきましたあいさつと返事の指導もこんなポイントがあることに気づきました。明日の朝の会で早速、実践します。健康観察の際の「いいよ」と「ファイト」の合図もすぐ取り入れます。会話をつなぐ練習も大人は自然にしているようなことでも子どもにとってはとても難しいことなので、給食の時なども活用していきたいです。子ども達の心をほぐして鍛えられるように、まずは自分の意識を高めていきたいです。
                </p>
              </div>

              {/* 参加者の声7 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  子どもが出会ってからのあいさつのタイミングについては、自分もどう指導して良いのか正直わかっていなかったので、実際に先生の実践方法を見せて頂き、とてもスッキリしました。あいさつについてこんな方法をとれば、自然にできるようになりそうです。「慣れて、楽しんで」ということについても、様々な実践例を紹介していただき、私自身も楽しみながら勉強することができました。早速活用させて頂きます。ありがとうございました。
                </p>
              </div>

              {/* 参加者の声8 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  よく「できないんですよね～。」と子どものせいにしている先生がいる。それは、教師が手だてをとれず指導をあきらめてしまい、子どものせいにしているのではないかという話を聞いて、どきっとしました。「できないんですよね～。」使っていました。できないなら次の手だてを考えなければならないのに、自分が「手だてをとっていない」ことを自分で言っていたのだなぁと恥ずかしくなりました。子どもができないときはあきらめずに、次の手、次の手と考えて、根気よく取り組むことが必要だと思いました。もう、子どものせいにしません。ありがとうございました。
                </p>
              </div>

              {/* 参加者の声9 */}
              <div className="relative p-6 bg-white rounded-lg shadow-md mb-6">
                <div className="text-[#ED765E] text-5xl absolute -top-4 -left-2" aria-hidden="true">&quot;</div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  いつも、資料費程度でなかま研修をやって頂き、ありがとうございます。先生の話を聞くとみんなで頑張ろう！という気持ちになります。だから、学年のメンバーで話を聞きたくなってしまいます。今日は、学年経営のポイントがよくわかりました。今年のチームでみんなで話がきけたので、どこでどんな声をかけ合うのかわかりました。本当に必要なことだなと思いました。学年経営のポイントを「つなぎ合う」にして、最高の学年にします。また、学年全体がお腹から声をだす先生の返事のさせ方や高学年でも全員が張り切って行う先生の音読のさせ方を学びたいので時間をとってください。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA セクション */}
        <section className="py-12 bg-gradient-to-br from-[#ED765E] to-[#FEA858] text-white rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                あなたも始めてみませんか？
              </h2>
              <p className="text-xl mb-10 text-white/90">
                With-youでは、一人ひとりに合わせたサポートをご提供しています。
                まずはお気軽にご相談ください。
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
