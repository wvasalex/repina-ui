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

export const PropsDef = {
  team: [
    {
      name: 'name',
      label: 'Имя',
    },
    {
      name: 'role',
      label: 'Должность',
    },
  ],
  awards: [
    {
      name: 'year',
      label: 'Год',
    },
    {
      name: 'title',
      label: 'Награда',
    },
    {
      name: 'position',
      label: 'Место',
    },
    {
      name: 'type',
      label: 'Номинация',
    },
  ],
};