import { StrMap } from '@shared/types';

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
  content_blocks: ArticleContentBlock[];
}

export interface ArticleContentBlock {
  block_type?: string;
  element_type?: string;
  props: StrMap<string>;
  content_elements: ArticleContentElement[];
  id?: number;
  blog?: number;
  position?: number;
  is_enabled?: boolean;
  _destroy?: boolean;
}

export interface ArticleContentElement {
  element_type: string;
  props?: StrMap<string>;
  content_block?: number;
  id?: number;
  content_file?: string;
  position?: number;
  _destroy?: boolean;
}
