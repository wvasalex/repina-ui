import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public nav: string[][] = [
    [
      'Услуги',
    ],
    [
      'Корпоративный брендинг',
      'Исследования и аудит бренда',
      'Платформа бренда',
      'Нейминг и слоган',
      'Фирменный стиль',
      'Брендбук',
    ],
    [
      'Продуктовый брендинг',
      'Потребительские исследования',
      'Нейминг торговой марки',
      'Дизайн упаковки',
      'Развитие линейки продуктов',
    ],
    [
      'Ритейл брендинг',
      'Позиционирование ритейл-бренда',
      'Нейминг розничной сети',
      'Дизайн интерьера',
      'Элементы навигаци',
      'Дизайн экстерьера',
    ],
    [
      'HR брендинг',
      'Позиционирование работодателя',
      'Разработка ценностей компании',
      'Ключевое сообщение hr-бренда',
      'Дизайн офисных помещений',
      'Дизайн продукции с символикой',
    ],
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
