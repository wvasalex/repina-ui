import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-services-tech',
  templateUrl: './services-tech.component.html',
  styleUrls: ['./services-tech.component.scss']
})
export class ServicesTechComponent implements OnInit {
  public blocks: string[][] = [
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

  constructor() { }

  ngOnInit(): void {
  }

}
