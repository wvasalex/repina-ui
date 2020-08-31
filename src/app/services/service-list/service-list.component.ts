import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent extends BaseBlock {
  public services: StrMap<string>[][] = [
    [
      {
        text: 'Услуги',
        href: '/services',
      },
    ],
    [
      {
        text: 'Исследования',
        href: '/services',
      },
      {
        text: 'Аудит бренда',
        href: '/services',
      },
      {
        text: 'Потребительские исследования',
        href: '/services',
      },
      {
        text: 'Качественные исследования',
        href: '/services',
      },
      {
        text: 'Количественные исследования',
        href: '/services',
      },
    ],
    [
      {
        text: 'Стратегия',
        href: '/services',
      },
      {
        text: 'Позиционирование',
        href: '/services',
      },
      {
        text: 'Платформа бренда',
        href: '/services',
      },
      {
        text: 'Коммуникационная стратегия',
        href: '/services',
      },
      {
        text: 'Разработка брендбука',
        href: '/services',
      },
    ],
    [
      {
        text: 'Нейминг и tone of voice',
        href: '/services',
      },
      {
        text: 'Разработка названия',
        href: '/services',
      },
      {
        text: 'Разработка слогана',
        href: '/services',
      },
      {
        text: 'Создание голоса бренда',
        href: '/services',
      },
    ],
    /*
    [
      'Сопровождение бренда',
      'Дизайн упаковки',
      'Digital-дизайн',
      'Дизайн пространств',
      'Разработка гайдлайна',
    ],
    [
      'Дизайн',
      'Разработка фирменного стиля',
      'Digital-дизайн',
      'Дизайн пространств',
      'Разработка гайдлайна',
    ],*/
  ];
}
