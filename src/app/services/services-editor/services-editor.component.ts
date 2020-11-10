import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ContentBlock } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ServicesEditorService } from '../services-editor.service';
import { ServicesRenderService } from '../services-render.service';

@Component({
  selector: 'r-services-editor',
  templateUrl: './services-editor.component.html',
  styleUrls: ['./services-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesEditorComponent implements OnInit {

  public render = this.servicesRenderService.render;

  public blocks: ContentBlock[];

  private content_blocks = [
    {
      block_type: 'services-primary',
      props: {},
      content_elements: [],
    },
    {
      block_type: 'services-list',
      props: {},
      content_elements: [
      ],
    },
    {
      block_type: 'services-tech',
      props: {},
      content_elements: [
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
      ],
    },
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private servicesRenderService: ServicesRenderService,
    private servicesEditorService: ServicesEditorService,
  ) {
  }

  ngOnInit(): void {
    this.servicesEditorService.get().subscribe((blocks: ContentBlock[]) => {
      this.blocks = blocks;
      this.changeDetectorRef.detectChanges();
    });
  }

  /*@HostListener('dblclick') onInit() {
    this.content_blocks.forEach((block: ContentBlock, position: number) => {
      block.position = position;
      this.servicesEditorService.post(block).subscribe();
    });
  }*/

  public $save() {
    this._save();
  }

  private _save() {
    const promises = [];

    this.blocks.forEach((block: ContentBlock) => {
      block.is_enabled = true;
      promises.push(this.servicesEditorService.save(block).toPromise());
    });

    this.toasterService.wrapPromise(
      Promise.all(promises), 'Сохранено', 'Не удалось сохранить');
  }

}
