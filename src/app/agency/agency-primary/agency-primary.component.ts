import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-agency-primary',
  templateUrl: './agency-primary.component.html',
  styleUrls: ['./agency-primary.component.scss'],
})
export class AgencyPrimaryComponent implements OnInit {
  public blocks: string[][] = [
    ['Бренд-технологии'],
    [
      'Brand levels',
      'Технология оценки бренда по 3-м показателям продуктивности: сообщение, системность, уникальность',
    ],
    [
      'Brand inside',
      'Технология разработки позиционирования и платформы бренда',
    ],
    [
      'Brand Evolution',
      'Технология, которая позволяет провести эффективный ребрендинг',
    ],
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
