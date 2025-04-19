export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  content_html: string;
  excerpt: string;
  featured_image: string;
  published: boolean;
  created_at: Date;
  updated_at: Date | null;
}

export interface BlogInput {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published: boolean;
}
