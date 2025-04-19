'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema, BlogFormValues } from '@/lib/validators/blog';
import { BlogPost } from '@/types/blog';

interface BlogEditorProps {
  blog?: BlogPost;
  onSubmit: (data: BlogFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const BlogEditor = ({ blog, onSubmit, isSubmitting }: BlogEditorProps) => {
  const [previewMode, setPreviewMode] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog
      ? {
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt || '',
          featured_image: blog.featured_image || '',
          published: blog.published,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
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
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.excerpt && (
          <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
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
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.featured_image && (
          <p className="mt-1 text-sm text-red-600">{errors.featured_image.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            本文（マークダウン形式）
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                !previewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              編集
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                previewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              プレビュー
            </button>
          </div>
        </div>

        {!previewMode ? (
          <textarea
            id="content"
            rows={15}
            {...register('content')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
          />
        ) : (
          <div className="prose prose-blue max-w-none border rounded-md p-4 min-h-[300px] bg-white">
            {/* This would be replaced with a proper markdown renderer */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="published"
          type="checkbox"
          {...register('published')}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
          公開する
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '保存中...' : blog ? '更新する' : '作成する'}
        </button>
      </div>
    </form>
  );
};

export default BlogEditor;
