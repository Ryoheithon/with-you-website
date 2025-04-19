import { BlogPost } from '@/types/blog';
import BlogCard from './blog-card';

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList = ({ posts }: BlogListProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm p-8 animate-fade-in">
        <h3 className="text-xl font-medium text-gray-700">
          現在、ブログ記事はありません。
        </h3>
        <p className="text-gray-500 mt-2">
          また後ほどお越しください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {posts.map((post, index) => (
        <div key={post.id} className={`animation-delay-${index * 100}`}>
          <BlogCard blog={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
