import { ContentBlock } from '@shared/types';

export interface Service {
  id?: number;
  title: string;
  description?: string;
  is_enabled: boolean;
  service_type: 'complex' | 'single';
  tag?: any;
  slug?: string;
  preview_file?: string;
  parent?: {
    id: number;
    slug?: string;

  };
  content_blocks: ContentBlock[];
}
