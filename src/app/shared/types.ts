export interface StrMap<T> {
  [key: string]: T;
}

export interface NumMap<T> {
  [key: string]: T;
}

export interface ContentBlock {
  block_type: string;
  props: StrMap<string>;
  content_elements: ContentElement[];
  id?: number;
  blog?: number;
  position?: number;
  _destroy?: boolean;
}

export interface ContentElement {
  element_type: string;
  props: StrMap<string>;
  content_block?: number;
  id?: number;
  content_file?: string;
  position?: number;
  _destroy?: boolean;
}
