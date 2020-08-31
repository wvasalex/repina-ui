import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-services-tech',
  templateUrl: './services-tech.component.html',
  styleUrls: ['./services-tech.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesTechComponent extends BaseBlock {
  public images = [
    '/assets/icons/services/brand1.svg',
    '/assets/icons/services/brand2.svg',
    '/assets/icons/services/brand3.svg',
  ];

  public elements: ContentElement[] = [
    {
      element_type: 'services-tech-text',
      props: {
        title: 'Brand levels',
        text: 'Технология оценки бренда по 3-м показателям продуктивности: сообщение, системность, уникальность',
      },
    },
    {
      element_type: 'services-tech-text',
      props: {
        title: 'Brand inside',
        text: 'Технология разработки позиционирования и платформы бренда',
      },
    },
    {
      element_type: 'services-tech-text',
      props: {
        title: 'Brand Evolution',
        text: 'Технология, которая позволяет провести эффективный ребрендинг',
      },
    },
  ];

  /*public blocks: string[][] = [
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
  ];*/

  ngOnInit(): void {
  }

}
