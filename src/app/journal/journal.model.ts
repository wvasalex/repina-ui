export interface Article {
  title: string;
  author_name: string;
  article: string;
  description?: string;
  is_enabled?: boolean;
  position?: number;
  blog_tag?: string;
  id?: string;
  slug?: string;
  preview_file?: string;
  author_avatar?: string;
}
