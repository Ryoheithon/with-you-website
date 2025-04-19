'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema, BlogFormValues } from '@/lib/validators/blog';
import { BlogPost } from '@/types/blog';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { createBlogPost, updateBlogPost } from '@/lib/utils/blog-admin-client';
import { generateSlug } from '@/lib/utils/blog-client';


interface BlogFormProps {
  post?: BlogPost;
}

const BlogForm = ({ post }: BlogFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: post
      ? {
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          featured_image: post.featured_image || '',
          published: post.published,
        }
      : {
          title: '',
          content: '',
          excerpt: '',
          featured_image: '',
          published: false,
        },
  });

  const content = watch('content');
  const [parsedContent, setParsedContent] = useState('');

  const parseMarkdown = () => {
    if (content) {
      try {
        // GitHub Flavored Markdown（GFM）を有効化
        marked.use(gfmHeadingId());
        marked.use({
          gfm: true,
          breaks: true,
          headerIds: true,
          pedantic: false
        });
        
        const html = marked.parse(content);
        setParsedContent(html);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setParsedContent('<p>プレビューの生成中にエラーが発生しました</p>');
      }
    } else {
      setParsedContent('');
    }
  };

  const togglePreview = (preview: boolean) => {
    if (preview) {
      parseMarkdown();
    }
    setPreviewMode(preview);
  };

  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const slug = generateSlug(data.title);
      
      const blogData = {
        ...data,
        slug,
      };
      
      if (post) {
        await updateBlogPost(post.id, blogData);
      } else {
        await createBlogPost(blogData);
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      console.error('Blog submission error:', err);
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6c63ff] focus:ring-[#6c63ff] sm:text-sm text-black"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title?.message?.toString()}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
            抜粋（任意）
          </label>
          <textarea
            id="excerpt"
            rows={2}
            {...register('excerpt')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6c63ff] focus:ring-[#6c63ff] sm:text-sm text-black"
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-600">{errors.excerpt?.message?.toString()}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">
            アイキャッチ画像URL（任意）
          </label>
          <input
            id="featured_image"
            type="text"
            {...register('featured_image')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6c63ff] focus:ring-[#6c63ff] sm:text-sm text-black"
          />
          {errors.featured_image && (
            <p className="mt-1 text-sm text-red-600">{errors.featured_image?.message?.toString()}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              本文（マークダウン形式） <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => togglePreview(false)}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  !previewMode
                    ? 'bg-[#6c63ff] text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                編集
              </button>
              <button
                type="button"
                onClick={() => togglePreview(true)}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  previewMode
                    ? 'bg-[#6c63ff] text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                プレビュー
              </button>
            </div>
          </div>
          
          {previewMode ? (
            <div className="prose prose-sm mt-4 p-4 border rounded-md min-h-[300px] max-w-none overflow-auto">
              {parsedContent ? (
                <div dangerouslySetInnerHTML={{ __html: parsedContent }} className="markdown-body" />
              ) : (
                <p className="text-gray-400">プレビューする内容がありません</p>
              )}
            </div>
          ) : (
            <>
              <textarea
                id="content"
                rows={12}
                {...register('content')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6c63ff] focus:ring-[#6c63ff] sm:text-sm font-mono text-black"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content?.message?.toString()}</p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            {...register('published')}
            className="h-4 w-4 rounded border-gray-300 text-[#6c63ff] focus:ring-[#6c63ff]"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            公開する
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6c63ff] hover:bg-[#5a52e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6c63ff] disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? '保存中...' : post ? '更新する' : '作成する'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
