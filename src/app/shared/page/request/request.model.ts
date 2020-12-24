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
  /*{
    value: 'hr',
    label: 'HR-бренда',
  },*/
];

export const serviceRelations = {
  company: [
    {
      value: 'platform',
      label: 'Позиционирование',
      meta: {},
    },
    {
      value: 'naming',
      label: 'Нейминг',
      meta: {},
    },
    {
      value: 'identity',
      label: 'Фирменный стиль',
      meta: {
        deps: ['webpage', 'landing'],
      },
    },
    {
      value: 'webpage',
      label: 'Сайт',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
    {
      value: 'landing',
      label: 'Сайт-визитка',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
  ],
  product: [
    {
      value: 'platform',
      label: 'Позиционирование',
      meta: {
        deps: ['quant_res'],
      },
    },
    {
      value: 'naming',
      label: 'Нейминг',
      meta: {},
    },
    {
      value: 'package',
      label: 'Упаковка',
      meta: {
        deps: ['focus'],
      },
    },
    {
      value: 'quant_res',
      label: 'Количественные исследования',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы не проводим исследования без разработки позиционирования',
      },
    },
    {
      value: 'focus',
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
