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
    value: 'retail',
    label: 'Ритейла',
  },
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
        exclude: ['landing'],
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
    {
      value: 'landing',
      label: 'Сайт-визитка',
      meta: {
        exclude: ['webpage'],
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
  retail: [
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
      value: 'identity',
      label: 'Фирменный стиль',
      meta: {
        deps: ['interior', 'webpage', 'landing'],
      },
    },
    {
      value: 'interior',
      label: 'Интерьер',
      meta: {
        deps: ['retail-book'],
        disabled: true,
        disabledTooltip: 'Мы разрабатываем интерьер только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
    {
      value: 'retail-book',
      label: 'Ритейл-бук',
      meta: {
        disabled: true,
        disabledTooltip: 'Мы разрабатываем ритейл-бук только в рамках комлексной услуги. Выберите фирменный стиль и интерьер',
      },
    },
    {
      value: 'webpage',
      label: 'Сайт',
      meta: {
        exclude: ['landing'],
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
    {
      value: 'landing',
      label: 'Сайт-визитка',
      meta: {
        exclude: ['webpage'],
        disabled: true,
        disabledTooltip: 'Мы разрабатываем сайты только в рамках комплексной услуги. Выберите фирменный стиль.',
      },
    },
  ],
};
