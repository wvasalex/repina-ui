import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SelectOption } from '@shared/components/select/select.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { ServicesService } from '../services.service';
import { Service, ServiceTag, SERVICE_TYPES, ServiceScope, ServiceTagGroup } from '../services.model';
import { ServicesTagsService } from '../services-tags.service';
import { ServicesScopesService } from '../services-scopes.service';
import { ServicesGroupsService } from '../services-groups.service';
import { ServicesRenderService } from '../services-render.service';
import { map, pluck } from 'rxjs/operators';

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
  public complexServices$: Observable<Service[]> = this.servicesService.get({
    service_type: 'complex',
  });

  public types: SelectOption[] = SERVICE_TYPES;

  public render = this.servicesRenderService.render;

  public availableElements: SelectOption[] = [
    {value: 'service-text', label: 'Текст'},
    {value: 'service-image', label: 'Изображение'},
    {value: 'service-quote', label: 'Цитата'},
    {value: 'service-video', label: 'Видео'},
    {value: 'service-request', label: 'Запрос стоимости'},
    {value: 'service-related-wiki', label: 'Статьи по теме'},
  ];

  private _sub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private servicesService: ServicesService,
    private servicesRenderService: ServicesRenderService,
    private servicesTagsService: ServicesTagsService,
    private servicesGroupsService: ServicesGroupsService,
    private servicesScopesService: ServicesScopesService,
  ) {
  }

  public ngOnInit(): void {
    this._sub = this.activatedRoute.data.pipe(
      pluck('service'),
    ).subscribe(() => {
      this._init();
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
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
      is_enabled: true,
      props: {
        title: '',
        subtitle: '',
      },
      content_elements: elements,
    });
  }

  public $save(tags: ServiceTag[]) {
    if (this.service.tags) {
      this.service.tags = this.service.tags.map((tagId: number) => {
        return tags.find((tag: ServiceTag) => {
          return tag.id === tagId;
        });
      });
    }

    this._save();
  }

  private _save() {
    if (!this.service.title) {
      return this.toasterService.error('Название обязательно!');
    }

    this.service.preview_file = this.service.content_blocks[0]?.props?.animation;

    this.service.content_blocks
      .forEach((block: ContentBlock, index: number) => {
        if (block.id && block.block_type === 'service-projects') {
          block._destroy = true;
        }

        block.position = index;

        block.content_elements.forEach((element: ContentElement, elementIndex: number) => {
          element.position = elementIndex;

          if (element.hasOwnProperty('content_file')) {
            delete element.content_file;
          }
        });
      });

    // Slug update
    if (this.service._slug) {
      const {slug, _slug} = this.service;
      this.service._slug = slug;
      this.service.slug = _slug;
    }

    const req = this.servicesService.save(this.service).toPromise().then((a: Service) => {
      if (this.service.slug != this.service._slug) {
        this.router.navigate(['/services', a.slug, 'edit']);
      } else {
        this._normalize(this.service = a);
        this.changeDetectorRef.detectChanges();
      }
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }

  public $toOption(tag: ServiceTag): SelectOption {
    return {
      value: tag.id,
      label: tag.title,
    };
  }

  private _normalize(service: Service): Service {
    const normalize = (key: string) => {
      if (service[key]) {
        service[key] = service[key].id;
      }
      return normalize;
    };
    normalize('parent')('tag_group')('activity_scope');

    if (service.tags) {
      service.tags = service.tags.map((tag: ServiceTag) => tag.id);
    }

    if (service.slug) {
      service._slug = service.slug;
    }

    return service;
  }

  private _init(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.service = this._normalize(snapshot.data.service || {_new: true});

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

    this.changeDetectorRef.detectChanges();
  }

}
