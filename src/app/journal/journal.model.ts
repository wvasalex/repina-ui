import { ContentBlock } from '@shared/types';

export interface Article {
  title: string;
  author_name: string;
  article: string;
  description?: string;
  is_enabled?: boolean;
  position?: number;
  blog_tag?: string | BlogTag;
  id?: string;
  slug?: string;
  preview_file?: string;
  author_avatar?: string;
  content_blocks: ContentBlock[];
}

export interface BlogTag {
  id?: number;
  title: string;
  key: string;
}
