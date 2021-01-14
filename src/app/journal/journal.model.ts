import { ContentBlock } from '@shared/types';

export interface Article {
  title: string;
  author_name: string;
  created_at: string;
  article: string;
  description?: string;
  is_enabled?: boolean;
  position?: number;
  blog_tag?: string | BlogTag;
  id?: string;
  slug?: string;
  _slug?: string;
  preview_file?: string;
  author_avatar?: string;
  content_blocks: ContentBlock[];

  next_blog: Article;
}

export interface BlogTag {
  id?: number;
  title: string;
  key: string;
  props?: {
    title: string;
    key: string;
  };
}
