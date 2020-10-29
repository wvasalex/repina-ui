import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { MainService } from './main.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContentBlock } from '@shared/types';
import { MainRenderService } from './main-render.service';

@Component({
  selector: 'r-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent extends BaseBlock implements OnInit {

  public render = this.mainRenderService.render;

  private content_blocks = [
    {
      block_type: 'main-projects',
      position: 0,
      props: {},
      content_elements: [
        {
          element_type: 'main-project',
          props: {},
        },
        {
          element_type: 'main-project',
          props: {},
        },
        {
          element_type: 'main-project',
          props: {},
        },
      ],
    },
    /* {
       block_type: 'main-projects',
       position: 0,
       props: {},
       content_elements: [
         {
           element_type: 'agency-primary-text',
           props: {
             title: 'Энергия',
             text: 'Энергия — это то, что двигает ваш бизнес вперед. Та же энергия переполняет нас. Мы приумножим вашу энергию и поможем найти фокус.',
           },
         },
         {
           element_type: 'agency-primary-text',
           props: {
             title: 'Страсть',
             text: 'Бизнес — это страсть предпринимателя, которую он транслирует миру. Наш бизнес — это брендинг. Мы выступаем проводниками вашей страсти через свою, мы создаем воплощение вашего бизнеса в смысловых и визуальных формах.',
           },
         },
         {
           element_type: 'agency-primary-text',
           props: {
             title: 'Новаторство',
             text: 'Наш бизнес — это смочь сказать что-то новое там, где все уже сказано. Это вызов, который мы принимаем в каждом новом проекте. Мы стремимся быть авторами эффективных и вдохновляющих решений, которыми вы сможете гордиться.',
           },
         },
       ],
     },*/
  ];

  public blocks$: BehaviorSubject<ContentBlock[]> = new BehaviorSubject<ContentBlock[]>(this.content_blocks);

  constructor(
    private mainRenderService: MainRenderService,
    private mainService: MainService,
  ) {
    super();
  }

  public ngOnInit(): void {
  }

}
