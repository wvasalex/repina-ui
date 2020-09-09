import { StrMap } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';

export interface ContentListItem {
  id?: number;
  list_type: string;
  position?: number;
  props?: StrMap<any>;
  file?: string;
}

export const ContentListTypes: SelectOption[] = [
  {
    value: 'team',
    label: 'Команда',
  },
  {
    value: 'awards',
    label: 'Награды',
  },
  {
    value: 'feedback',
    label: 'Отзывы',
  },
  {
    value: 'media',
    label: 'СМИ',
  },
  {
    value: 'customers',
    label: 'Клиенты',
  },
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
  feedback: [
    {
      name: 'name',
      label: 'Имя автора',
    },
    {
      name: 'role',
      label: 'Должность',
    },
    {
      name: 'quote',
      label: 'Кратко',
    },
    {
      name: 'text',
      label: 'Полный текст',
    },
  ],
  media: [
    {
      name: 'source',
      label: 'Источник',
    },
    {
      name: 'date',
      label: 'Дата',
    },
    {
      name: 'text',
      label: 'Текст',
    },
  ],
  customers: [
    {
      name: 'title',
      label: 'Название',
    },
  ],
};