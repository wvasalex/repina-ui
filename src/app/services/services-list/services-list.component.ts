import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {
  public blocks: string[][] = [
    [
      'Исследования',
      'Аудит бренда',
      'Потребительские исследования',
      'Качественные исследования',
      'Количественные исследования',
    ],
    [
      'Стратегия',
      'Позиционирование',
      'Платформа бренда',
      'Коммуникационная стратегия',
      'Разработка брендбука',
    ],
    [
      'Нейминг и tone of voice',
      'Разработка названия',
      'Разработка слогана',
      'Создание голоса бренда',
    ],
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
    ],
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
