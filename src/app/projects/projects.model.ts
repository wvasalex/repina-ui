import { ContentBlock } from '@shared/types';

export interface Project {
  title: string;
  status: 'setup' | 'active' | 'archived';
  is_enabled: boolean;
  description?: string;
  tags?: [];
  slug?: string;
  preview_file?: string;
  content_blocks: ContentBlock[];
  next_project?: Project;
}
