import { StrMap } from '@shared/types';

export interface ContentListItem {
  id?: number;
  list_type: string;
  position?: number;
  props?: StrMap<any>;
  file?: string;
}

export const ContentListTypes = [
  'team',
  'awards',
];