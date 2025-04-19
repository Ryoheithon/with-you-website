import { marked } from 'marked';
import matter from 'gray-matter';

export const markdownToHtml = async (markdown: string): Promise<string> => {
  return await marked.parse(markdown);
};

export const getExcerpt = (content: string, maxLength = 150): string => {
  // Remove markdown formatting
  const plainText = content
    .replace(/#+\s+(.*)/g, '$1') // Headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/`([^`]+)`/g, '$1') // Code
    .replace(/~~([^~]+)~~/g, '$1') // Strikethrough
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Images
    .replace(/\n/g, ' ') // New lines
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength) + '...';
};

export const parseMarkdownWithFrontMatter = (content: string) => {
  const { data, content: markdownContent } = matter(content);
  return {
    frontMatter: data,
    content: markdownContent,
  };
};
