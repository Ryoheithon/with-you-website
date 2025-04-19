'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils/date';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // 現在の記事を除外して、最大3件まで表示
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-16 pt-8 border-t border-gray-100">
      <h2 className="text-2xl font-semibold mb-6">関連記事</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.id}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
              {post.featured_image && (
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-[#ED765E] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  {formatDate(post.created_at)}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
