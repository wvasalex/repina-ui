import { ContentBlock } from '../types';
import { ServiceScope, ServiceTag } from '../../services/services.model';

export interface Project {
  title: string;
  status: 'setup' | 'active' | 'archived';
  is_enabled: boolean;
  position: number;
  description?: string;
  tag?: number | ServiceTag;
  activity_scope?: number | ServiceScope;
  slug?: string;
  preview_file?: string;
  content_blocks: ContentBlock[];
  next_project?: Project;
}
