import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@/styles/markdown.css';
import { Toaster } from "sonner";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { generateOrganizationSchema } from '@/lib/seo/meta-helpers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | With-you',
    default: 'With-you | 一人ひとりの可能性を伸ばす教育サポート',
  },
  description: "教育事業With-youは、子どもたちの未来を支える教育サービスを提供しています。一人ひとりに合わせた学習プランで、成長をサポートします。",
  keywords: ["教育", "学習支援", "個別指導", "With-you", "塾", "家庭教師", "子育て", "学習計画"],
  authors: [{ name: "With-you" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://with-you.edu'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon.svg' },
    ],
    apple: [
      { url: '/images/favicon.svg' },
    ],
  },
  openGraph: {
    title: 'With-you | 一人ひとりの可能性を伸ばす教育サポート',
    description: '教育事業With-youは、子どもたちの未来を支える教育サービスを提供しています。一人ひとりに合わせた学習プランで、成長をサポートします。',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'With-you'
      }
    ],
    type: 'website',
    locale: 'ja_JP',
    siteName: 'With-you',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'With-you | 一人ひとりの可能性を伸ばす教育サポート',
    description: '教育事業With-youは、子どもたちの未来を支える教育サービスを提供しています。一人ひとりに合わせた学習プランで、成長をサポートします。',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 組織のJSON-LDスキーマを生成
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="ja">
      <head>
        {/* 組織情報のJSON-LDスキーマ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchema }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Toaster position="top-center" richColors />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
