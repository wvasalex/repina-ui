import { ContentBlock } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';

export const SERVICE_TYPES: SelectOption[] = [
  {
    value: 'single',
    label: 'Простая',
  },
  {
    value: 'complex',
    label: 'Направление',
  },
  {
    value: 'brand_wiki',
    label: 'Brand-wiki',
  },
];

export interface Service {
  id?: number;
  title: string;
  description?: string;
  is_enabled: boolean;
  service_type: string;
  content_blocks: ContentBlock[];
  position?: number;
  tags?: (number | ServiceTag)[];
  activity_scope?: number | ServiceScope;
  tag_group?: number | ServiceTagGroup;
  slug?: string;
  preview_file?: string;
  parent?: number | {
    id: number;
    title: string;
    slug?: string;
  };
}

export interface ServiceTag {
  id: number;
  title: string;
}

export interface ServiceTagGroup {
  id: number;
  title: string;
}

export interface ServiceScope {
  id: number;
  title: string;
}
