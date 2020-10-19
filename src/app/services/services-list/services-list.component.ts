import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServicesListService } from '../services-list.service';

@Component({
  selector: 'r-service-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent implements OnInit {

  public services$ = this.servicesListService.groupByGroup();

  constructor(
    private servicesListService: ServicesListService,
  ) {
  }

  public ngOnInit(): void {
  }


  /*[
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
];*/
}
