import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectOption } from '@shared/components/select/select.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { ServicesService } from '../services.service';
import { Service, ServiceTag, SERVICE_TYPES, ServiceScope, ServiceTagGroup } from '../services.model';
import { ServicesTagsService } from '../services-tags.service';
import { Observable } from 'rxjs';
import { ServicesScopesService } from '../services-scopes.service';
import { ServicesGroupsService } from '../services-groups.service';

@Component({
  selector: 'r-service-editor',
  templateUrl: './service-editor.component.html',
  styleUrls: ['./service-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceEditorComponent implements OnInit {

  public service: Service;

  public serviceTags$: Observable<ServiceTag[]> = this.servicesTagsService.get();
  public serviceGroups$: Observable<ServiceTagGroup[]> = this.servicesGroupsService.get();
  public serviceScopes$: Observable<ServiceScope[]> = this.servicesScopesService.get();

  public types: SelectOption[] = SERVICE_TYPES;

  public render = this.servicesService.render;

  public availableBlocks: SelectOption[]; /* = [
    { value: 'project-block', label: 'Блок' },
    { value: 'project-gallery', label: 'Галерея' },
  ];*/

  public availableElements: SelectOption[] = [
    {value: 'service-title', label: 'Заголовок'},
    {value: 'service-text', label: 'Текст'},
    {value: 'service-image', label: 'Изображение'},
    {value: 'service-quote', label: 'Цитата'},
    {value: 'service-video', label: 'Видео'},
    {value: 'service-request', label: 'Запрос стоимости'},
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private servicesService: ServicesService,
    private servicesTagsService: ServicesTagsService,
    private servicesGroupsService: ServicesGroupsService,
    private servicesScopesService: ServicesScopesService,
  ) {
  }

  public ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this._normalize(this.service = snapshot.data.service || {});

    if (!this.service.content_blocks?.length) {
      this.service.content_blocks = [
        {
          block_type: 'service-header',
          props: {},
          content_elements: [
            {
              element_type: 'service-image',
              props: {},
            },
          ],
        },
        {
          block_type: 'service-block',
          props: {},
          content_elements: [
            {
              element_type: 'service-text',
              props: {},
            },
            {
              element_type: 'service-blank',
              props: {},
            },
          ],
        },
      ];
    }
  }

  public $addBlock(e: StrMap<any>) {
    const {target, offset, blockType} = e;
    const index = this.service.content_blocks.indexOf(target) + offset;

    const element = (type: string = 'blank') => {
      return {
        element_type: type,
        props: {},
      };
    };

    const elements = [element('service-text'), element()];

    this.service.content_blocks.splice(index, 0, {
      block_type: 'service-block',
      props: {
        title: '',
        subtitle: '',
      },
      content_elements: elements,
    });
  }

  public $save() {
    this._save();
  }

  private _save() {
    /*const root = this.service.content_blocks[0];
    if (root.content_elements[0]?.content_file) {
      this.service.preview_file = root.content_elements[0].content_file;
    }*/

    if (!this.service.title) {
      alert('Название услуги обязательно!');
      return;
    }

    this.service.content_blocks.forEach((block: ContentBlock, index: number) => {
      block.position = index;

      block.content_elements.forEach((element: ContentElement, elementIndex: number) => {
        element.position = elementIndex;

        if (element.hasOwnProperty('content_file')) {
          delete element.content_file;
        }
      });
    });

    delete this.service.parent;

    const req = this.servicesService.save(this.service).toPromise().then((a: Service) => {
      if (a.slug != this.service.slug) {
        this.router.navigate(['/services', a.slug, 'edit']);
      } else {
        this._normalize(this.service = a);
        this.changeDetectorRef.detectChanges();
      }
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }

  public $toOption(tag: ServiceTag) {
    return {
      value: tag.id,
      label: tag.title,
    };
  }

  private _normalize(service: Service) {
    const normalize = (key: string) => {
      if (service[key]) {
        service[key] = service[key].id;
      }
      return normalize;
    };
    normalize('tag')('tag_group')('activity_scope');
    return service;
  }

}
