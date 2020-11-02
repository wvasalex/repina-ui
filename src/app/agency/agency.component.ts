import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContentBlock } from '@shared/types';
import { AgencyService } from './agency.service';
import { AgencyRenderService } from './agency-render.service';

@Component({
  selector: 'r-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyComponent implements OnInit {

  public render = this.agencyRenderService.render;

  public blocks$: Observable<ContentBlock[]> = this.agencyService.get()
    .pipe(tap((blocks: ContentBlock[]) => {
      this._blocks = blocks;
    }));

  private _blocks: ContentBlock[];

  private content_blocks = [
    {
      block_type: 'agency-primary',
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
    },
    {
      block_type: 'agency-achievements',
      position: 1,
      props: {},
      content_elements: [
        {
          element_type: 'agency-achievement',
          props: {
            title: '7 место',
            text: 'В рейтинге лучших брендинговых агентств России по версии АКАР',
          },
        },
        {
          element_type: 'agency-achievement',
          props: {
            title: '8 премий',
            text: 'Самые престижные мировые и российские премии в области брендинга',
          },
        },
        {
          element_type: 'agency-achievement',
          props: {
            title: '215 проектов',
            text: 'FMCG, ритейл, медицина, технологии, финансы, e-commerce, промышленность, девелопмент',
          },
        },
      ],
    },
    {
      block_type: 'agency-repina',
      props: {
        title: 'Валерия Репина',
        text: 'Валерия Репина',
        buttonText: 'Колонка Валерии Репиной',
      },
      content_elements: [],
    },
    {
      block_type: 'agency-team',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-awards',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-feedback',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-gallery',
      props: {
        type: 'small-big',
      },
      content_elements: [
        {
          element_type: 'agency-image',
        },
        {
          element_type: 'agency-image',
        },
        {
          element_type: 'agency-image',
        },
      ],
    },
    {
      block_type: 'agency-gallery',
      props: {
        type: 'small',
      },
      content_elements: [
        {
          element_type: 'agency-image',
        },
        {
          element_type: 'agency-image',
        },
        {
          element_type: 'agency-image',
        },
      ],
    },
    {
      block_type: 'agency-customers',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'agency-media',
      props: {},
      content_elements: [],
    },
  ];

  constructor(
    private agencyService: AgencyService,
    private agencyRenderService: AgencyRenderService,
  ) {
  }

  public ngOnInit() {
  }

  @HostListener('dblclick') _init() {
    /*this._blocks.forEach((block, position: number) => {
      block.position = position == 0 ? 1 : position == 1 ? 0 : position;
      block.is_enabled = true;
      this.agencyService.save({
        id: block.id,
        position: block.position,
      }).subscribe();
    });*/
  }

}
