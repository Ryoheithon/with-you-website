import { Metadata, ResolvedMetadata } from 'next';

// デフォルト設定
const DEFAULT_TITLE = 'With-you | 子どもの成長をサポートする学習プラットフォーム';
const DEFAULT_DESCRIPTION = 'With-youは、子どもたちの学びをサポートする総合的な教育プラットフォームです。個別指導と充実したコンテンツで、お子様の可能性を最大限に引き出します。';
const DEFAULT_KEYWORDS = '教育,学習,子ども,サポート,プラットフォーム,個別指導';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://with-you.edu';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

// 基本的なメタデータを生成する関数
export function generateMetadata({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  url?: string;
  noIndex?: boolean;
}): Metadata {
  // タイトルの設定（指定がなければデフォルト値）
  const metaTitle = title ? `${title} | With-you` : DEFAULT_TITLE;
  
  // メタディスクリプションの設定
  const metaDescription = description || DEFAULT_DESCRIPTION;
  
  // キーワードの設定
  const metaKeywords = keywords 
    ? `${keywords},${DEFAULT_KEYWORDS}` 
    : DEFAULT_KEYWORDS;
    
  // OG画像の設定
  const metaOgImage = ogImage || DEFAULT_OG_IMAGE;
  
  // カノニカルURLの設定
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    // OGP設定
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'With-you',
      locale: 'ja_JP',
      type: ogType,
      images: [
        {
          url: metaOgImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    // Twitter Card設定
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaOgImage],
    },
    // インデックス設定
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}

// ブログ記事用のメタデータを生成する関数
export function generateBlogMetadata({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  featuredImage,
  author = 'With-you編集部',
  tags = [],
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  updatedAt?: Date | null;
  featuredImage?: string;
  author?: string;
  tags?: string[];
}): Metadata {
  const url = `/blog/${slug}`;
  const ogImage = featuredImage || DEFAULT_OG_IMAGE;
  const keywords = tags.join(',');
  
  // 基本メタデータを取得
  const baseMetadata = generateMetadata({
    title,
    description,
    keywords,
    ogImage,
    ogType: 'article',
    url,
  });
  
  // 記事特有のスキーマデータを作成
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: featuredImage ? [featuredImage] : [DEFAULT_OG_IMAGE],
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'With-you',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt ? updatedAt.toISOString() : publishedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
    keywords: tags.join(', '),
  };
  
  return {
    ...baseMetadata,
    // JSON-LDを設定
    other: {
      ...baseMetadata.other,
      'script:ld+json': JSON.stringify(articleSchema),
    },
  };
}

// 組織のスキーマデータを生成
export function generateOrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'With-you',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      'https://twitter.com/withyou_edu',
      'https://www.facebook.com/withyou.edu',
      'https://www.instagram.com/withyou_edu/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-XX-XXXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Japanese'],
    },
  };
  
  return JSON.stringify(organizationSchema);
}

// パンくずリスト用のスキーマを生成
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
  
  return JSON.stringify(breadcrumbSchema);
}
