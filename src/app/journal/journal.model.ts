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
}

export interface ArticleContentBlock {
  block_type: string;
  props: StrMap<string>;
  content_elements: ActicleContentElement[];
  id?: number;
  blog?: number;
  position?: number;
}

export interface ActicleContentElement {
  element_type: string;
  props: StrMap<string>;
  content_block?: number;
  id?: number;
  content_file?: string;
}
