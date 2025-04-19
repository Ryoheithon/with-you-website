import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(1, '記事タイトルを入力してください').max(100, 'タイトルは100文字以内で入力してください'),
  content: z.string().min(1, '記事内容を入力してください'),
  excerpt: z.string().max(200, '抜粋は200文字以内で入力してください').optional(),
  featured_image: z.string().url('有効なURLを入力してください').optional().or(z.literal('')),
  published: z.boolean().default(false),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
