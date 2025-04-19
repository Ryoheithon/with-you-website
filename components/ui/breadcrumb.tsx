'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { generateBreadcrumbSchema } from '@/lib/seo/meta-helpers';

interface BreadcrumbItem {
  name: string;
  url: string;
}

// パス別の表示名マッピング
const pathNameMap: Record<string, string> = {
  blog: 'ブログ',
  about: '私たちについて',
  contact: 'お問い合わせ',
  'for-parents': '保護者の方へ',
  'for-teachers': '教育関係者の方へ',
  pricing: '料金プラン',
  testimonials: 'お客様の声',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [schema, setSchema] = useState<string>('');
  
  useEffect(() => {
    if (!pathname) return;
    
    // パスの分解
    const pathArray = pathname.split('/').filter(Boolean);
    
    // ホームを最初に追加
    const items: BreadcrumbItem[] = [{ name: 'ホーム', url: '/' }];
    
    // 各パスセグメントに対応する項目を追加
    let currentPath = '';
    pathArray.forEach((path) => {
      currentPath += `/${path}`;
      
      // パスから表示名を決定
      let name = pathNameMap[path] || path;
      
      // スラッグの場合は動的に表示名を取得（ここではシンプルに実装）
      if (path.startsWith('[') && path.endsWith(']')) {
        // 実際の実装では、ここでルートパラメータから適切な名前を取得する
        name = '詳細ページ';
      }
      
      items.push({
        name,
        url: currentPath,
      });
    });
    
    setBreadcrumbs(items);
    
    // JSON-LDスキーマを生成
    setSchema(generateBreadcrumbSchema(items));
  }, [pathname]);
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <>
      {/* スキーマデータの挿入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      
      {/* パンくずリストUI */}
      <nav aria-label="パンくずリスト" className="bg-gray-50 py-2 mb-6">
        <div className="container mx-auto px-4">
          <ol className="flex flex-wrap text-sm text-gray-600">
            {breadcrumbs.map((breadcrumb, i) => (
              <Fragment key={i}>
                <li className="flex items-center">
                  {i < breadcrumbs.length - 1 ? (
                    <Link 
                      href={breadcrumb.url} 
                      className="hover:text-[#ED765E] transition-colors"
                    >
                      {breadcrumb.name}
                    </Link>
                  ) : (
                    <span className="text-gray-800 font-medium" aria-current="page">
                      {breadcrumb.name}
                    </span>
                  )}
                </li>
                {i < breadcrumbs.length - 1 && (
                  <li className="mx-2">
                    <span aria-hidden="true">/</span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
