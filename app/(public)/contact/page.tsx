import { Metadata } from 'next';
import ContactFormWrapper from '@/components/contact/contact-form-wrapper';


export const metadata: Metadata = {
  title: 'お問い合わせ | With-you',
  description: 'With-youへのお問い合わせページです。体験授業のお申し込みや料金のご質問など、お気軽にお問い合わせください。',
};

export default function ContactPage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ヘッダーバンド */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ED765E] to-[#FEA858]"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">
            お問い合わせ
          </h1>
          <p className="text-lg text-white/90 text-center max-w-2xl mx-auto">
            お気軽にご相談ください。一人ひとりに合わせたサポートをご提案いたします。
          </p>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
                お問い合わせフォーム
              </h2>
              <ContactFormWrapper />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">お電話でのお問い合わせ</h3>
              <p className="text-gray-700 mb-4">
                お電話でも承っております。
                まずはお気軽にお電話ください。
              </p>
              <div className="flex items-center text-[#ED765E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-medium">000-0000-0000</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                受付時間: 平日9:00〜18:00
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">メールでのお問い合わせ</h3>
              <p className="text-gray-700 mb-4">
                直接メールをお送りいただくこともできます。
              </p>
              <div className="flex items-center text-[#ED765E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-medium">info@with-you.example.com</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">所在地</h3>
              <p className="text-gray-700 mb-4">
                面談をご希望の方は事前にご連絡ください。
              </p>
              <div className="flex items-start text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#ED765E]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="block">〒000-0000</span>
                  <span className="block">千葉県木更津市〇〇町1-2-3</span>
                  <span className="block">〇〇ビル 3F</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-16">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#ED765E] to-[#FEA858] bg-clip-text text-transparent">
            よくある質問
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">料金はどのようになっていますか？</h3>
              <p className="text-gray-700">
                料金は対応内容や時間によって異なります。詳しくは料金ページをご確認いただくか、お気軽にお問い合わせください。個別のご相談に応じたプランをご提案いたします。
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">初回相談は無料ですか？</h3>
              <p className="text-gray-700">
                はい、初回の15分間のご相談は無料で承っております。お子様の状況やご家庭の悩みなどをお聞かせください。
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">どのような支援が受けられますか？</h3>
              <p className="text-gray-700">
                学習支援、発達支援、保護者様へのアドバイス、学校との連携など、お子様の状況に合わせた総合的な支援を提供しています。詳しくはサービス内容ページをご覧ください。
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">対応エリアはどこですか？</h3>
              <p className="text-gray-700">
                千葉県木更津市を中心に、周辺地域にも対応しております。オンラインでの相談も可能ですので、ご希望の方はお問い合わせください。
              </p>
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">学校の先生からの相談も可能ですか？</h3>
              <p className="text-gray-700">
                はい、学校の先生からのご相談も承っております。子どもたちへの適切な対応や保護者との関係構築など、教育現場でのお悩みに対してサポートいたします。
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#ED765E] to-[#FEA858] rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">まずはお気軽にご相談ください</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            With-youでは、お子様や保護者の方、先生方のお悩みに寄り添ったサポートを提供しています。
            どんな小さなことでもお気軽にお問い合わせください。
          </p>
          <div className="text-lg font-medium">000-0000-0000</div>
          <div className="text-sm mt-2 text-white/80">受付時間: 平日9:00〜18:00（土日祝休み）</div>
        </div>
      </div>
    </div>
  );
}
