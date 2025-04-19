import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/date';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blog/${blog.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-[#FEA858]">
        {blog.featured_image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={blog.featured_image}
              alt={`${blog.title}のアイキャッチ画像`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              fetchPriority="auto"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-[#ED765E] transition-colors text-gray-800">
            {blog.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            <time dateTime={blog.created_at.toISOString()}>
              {formatDate(blog.created_at)}
            </time>
          </p>
          {blog.excerpt && (
            <p className="text-gray-700 mb-4 line-clamp-3">{blog.excerpt}</p>
          )}
          <span className="text-[#ED765E] text-sm font-medium group-hover:text-[#FEA858] transition-colors inline-flex items-center">
            続きを読む 
            <svg 
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
