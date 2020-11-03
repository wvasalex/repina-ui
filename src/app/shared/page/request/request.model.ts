import { SelectOption } from '../../components/select/select.model';

export const requestServices: SelectOption[] = [
  {
    value: 'company',
    label: 'Компании',
  },
  {
    value: 'product',
    label: 'Продукта',
  },
  {
    value: 'hr',
    label: 'HR-бренда',
  },
];

export const serviceRelations = {
  company: [
    {
      value: '1',
      label: 'Позиционирование',
      meta: {},
    },
    {
      value: '2',
      label: 'Нейминг',
      meta: {},
    },
    {
      value: '3',
      label: 'Фирменный стиль',
      meta: {
        deps: ['4', '5'],
      },
    },
    {
      value: '4',
      label: 'Сайт',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.'
      },
    },
    {
      value: '5',
      label: 'Сайт-визитка',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
  ],
  product: [
    {
      value: '8',
      label: 'Позиционирование',
      meta: {
        deps: ['6']
      },
    },
    {
      value: '9',
      label: 'Нейминг',
      meta: {},
    },
    {
      value: '10',
      label: 'Упаковка',
      meta: {
        deps: ['7']
      },
    },
    {
      value: '6',
      label: 'Количественные исследования',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы не проводим исследования без разработки позиционирования',
      },
    },
    {
      value: '7',
      label: 'Фокус-группы',
      meta: {
        disabled: true,
        disabledTooltip: 'Невозможно провести фокус-группы, если не разработана упаковка',
      },
    },
  ],
  hr: [
    {
      value: '1',
      label: 'Для HR',
      meta: {},
    },
  ],
};
