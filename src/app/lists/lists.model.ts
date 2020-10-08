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
    value: 'services',
    label: 'Услуги',
  },
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
  {
    value: 'blog-tags',
    label: 'Рубрики блога',
  },
  {
    value: 'services-tags',
    label: 'Теги услуг',
  },
  {
    value: 'services-groups',
    label: 'Группы услуг',
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
    {
      name: 'href',
      label: 'Ссылка',
    },
  ],
  customers: [
    {
      name: 'title',
      label: 'Название',
    },
  ],
  'blog-tags': [
    {
      name: 'title',
      label: 'Название',
    },
    {
      name: 'key',
      label: 'Значение',
    },
  ],
  'services-tags': [
    {
      name: 'title',
      label: 'Название',
    }
  ],
  'services-groups': [
    {
      name: 'title',
      label: 'Название',
    }
  ]
};
