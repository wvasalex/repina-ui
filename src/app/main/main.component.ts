import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { MainService } from './main.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContentBlock, ContentElement } from '@shared/types';
import { MainRenderService } from './main-render.service';
import { JournalService } from '../journal/journal.service';
import { ToasterService } from '@shared/toaster/toaster.service';
import { element } from 'protractor';

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
          props: {
            project: 'deft',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'palmolive',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'macro-clinic',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'deft',
          },
        },
        {
          element_type: 'main-promo',
          props: {
            type: '1',
            title: "Новость года! Мы получили 8 наград в области бренд-дизайна",
            source: 'forbes',
          },
          content_file: "/assets/icons/main/promo_1.svg",
        },
        {
          element_type: 'main-project',
          props: {
            project: 'macro-clinic',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'deft',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'palmolive',
          },
        },
        {
          element_type: 'main-project',
          props: {
            type: '2',
            title: "Новость года! Мы получили 8 наград в области бренд-дизайна",
            source: 'forbes',
          },
          content_file: "/assets/icons/main/promo_2.svg",
        },
        {
          element_type: 'main-project',
          props: {
            project: 'deft',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'palmolive',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'macro-clinic',
          },
        },
        {
          element_type: 'main-project',
          props: {
            type: '3',
            title: "Новость года! Мы получили 8 наград в области бренд-дизайна",
            source: 'forbes',
          },
          content_file: "/assets/icons/main/promo_3.svg",
        },
        {
          element_type: 'main-project',
          props: {
            project: 'palmolive',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'macro-clinic',
          },
        },
        {
          element_type: 'main-project',
          props: {
            project: 'deft',
          },
        },
      ],
    },
    {
      block_type: 'main-articles',
      position: 0,
      props: {},
      content_elements: [
        {
          element_type: 'main-article',
          props: {
            article: '8-nagrad',
          },
        },
        {
          element_type: 'main-article',
          props: {
            article: '8-nagrad',
          },
        },
        {
          element_type: 'main-article',
          props: {
            article: '8-nagrad',
          },
        },
      ],
    },
    {
      block_type: 'main-about',
      position: 0,
      props: {},
      content_elements: [
        {
          element_type: 'main-about-text',
          props: {
            title: 'Входим в ТОП 10',
            text: 'Répina Branding занимает 7 место среди лучших брендинговых агентств России в рейтинге креативности АКАР. Мы воплощаем идеи бизнеса в формы, наполненные смыслом и высокой эстетикой, создаем первоклассный дизайн, который ценится во всем мире.',
          },
        },
        {
          element_type: 'main-about-text',
          props: {
            title: 'Фокусируем бизнес',
            text: 'Мы разрабатываем бренд-стратегии и визуальные системы с пониманием реальных потребностей бизнеса. Глубокие исследования в каждом проекте позволяют нам создавать высокоточные решения, помогающие брендам сфокусироваться на главном и совершить скачок в своем развитии.',
          },
        },
        {
          element_type: 'main-about-text',
          props: {
            title: 'Создаем тренды',
            text: 'Répina Branding удостоено самых престижных премий мира: «The Dieline», «Pentawards», «Red Dot», «Ad Black Sea», «ADCR» «Белый квадрат», «Среда», «Большая рыба» и др. Мы создаем тренды не только в брендинге и мировом дизайне, но и во всей креативной индустрии, используя новаторские технологии в коммуникации и управлении проектами.',
          },
        },
        {
          element_type: 'main-about-text',
          props: {
            title: 'Строим отношения',
            text: 'Мы любим слушать и любим говорить. Мы убеждены в том, что успех проекта напрямую зависит от четкого и комфортного взаимодействия между участниками. Мы стремимся быть авторами эффективных и вдохновляющих решений, которыми вы сможете гордиться.',
          },
        },
      ],
    },
  ];

  public blocks$: BehaviorSubject<ContentBlock[]> = new BehaviorSubject<ContentBlock[]>([]);

  constructor(
    private toasterService: ToasterService,
    private mainRenderService: MainRenderService,
    private mainService: MainService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.mainService.get().subscribe((blocks: ContentBlock[]) => {
      this.blocks$.next(blocks);
    });
  }

  public $save() {
    this.editor = false;
    this._save();
  }

  private _save() {
    const promises = [];
    const blocks = this.blocks$.value;

    blocks.forEach((block: ContentBlock) => {
      block.is_enabled = true;
      delete block.content_file;
      block.content_elements.forEach((element: ContentElement, index: number) => {
        delete element.content_file;
        element.position = index;
      });
      promises.push(this.mainService.save(block).toPromise());
    });

    this.toasterService.wrapPromise(
      Promise.all(promises), 'Сохранено', 'Не удалось сохранить');
  }

  /*@HostListener('dblclick') _init() {
    this.content_blocks.forEach((block, position: number) => {
      block.position = position;
      this.mainService.post(block).subscribe();
    });
  }*/

}
