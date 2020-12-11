import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { getOption, SelectOption } from '@shared/components/select/select.model';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ServicesTagsService } from '../../services/services-tags.service';
import { ServicesScopesService } from '../../services/services-scopes.service';
import { ServiceScope, ServiceTag } from '../../services/services.model';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'r-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEditorComponent implements OnInit, OnDestroy {

  public project: Project;

  public serviceTags$: Observable<ServiceTag[]> = this.servicesTagsService.get();
  public serviceScopes$: Observable<ServiceScope[]> = this.servicesScopesService.get();

  public render = this.projectsService.render;

  public availableBlocks: SelectOption[] = [
    {value: 'project-block', label: 'Блок'},
    {value: 'project-gallery', label: 'Галерея'},
    {value: 'project-roles', label: 'Участники'},
    {value: 'project-feedback', label: 'Отзыв'},
    {value: 'project-articles', label: 'Статьи и награды'},
  ];

  public availableElements: SelectOption[] = [
    //{ value: 'blank', label: 'Пустой' },
    {value: 'project-text', label: 'Текст'},
    {value: 'project-image', label: 'Изображение'},
    {value: 'project-quote', label: 'Цитата'},
    {value: 'project-video', label: 'Видео'},
  ];

  private _sub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private projectsService: ProjectsService,
    private toasterService: ToasterService,
    private servicesTagsService: ServicesTagsService,
    private servicesScopesService: ServicesScopesService,
  ) {
  }

  public ngOnInit(): void {
    this._sub = this.activatedRoute.data.pipe(
      pluck('project')
    ).subscribe(() => {
      this._init();
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public $addBlock(e: StrMap<any>) {
    const {target, offset, blockType} = e;
    const index = this.project.content_blocks.indexOf(target) + offset;

    const element = (type: string = 'blank') => {
      return {
        element_type: 'blank',
        props: {},
      };
    };

    const elements = [element(), element()];

    if (blockType === 'project-gallery') {
      elements.push(element());
    }

    this.project.content_blocks.splice(index, 0, {
      block_type: blockType,
      props: {
        title: '',
        subtitle: '',
      },
      content_elements: elements,
      is_enabled: true,
    });
  }

  public $save(tags: ServiceTag[]) {
    if (this.project.tags) {
      this.project.tags = this.project.tags.map((tagId: number) => {
        return tags.find((tag: ServiceTag) => {
          return tag.id === tagId;
        });
      });
    }

    this._save();
  }

  public $toOption(tag: ServiceTag) {
    return {
      value: tag.id,
      label: tag.title,
    };
  }

  private _save() {
    const root = this.project.content_blocks[0];
    if (root.content_elements[0]?.content_file) {
      this.project.preview_file = root.content_elements[0].content_file;
    }

    if (!this.project.title) {
      return this.toasterService.error('Название обязательно!');
    }

    this.project.content_blocks.forEach((block: ContentBlock, index: number) => {
      block.position = index;

      block.content_elements.forEach((element: ContentElement, elementIndex: number) => {
        element.position = elementIndex;

        if (element.hasOwnProperty('content_file')) {
          delete element.content_file;
        }
      });
    });

    // Slug update
    if (this.project._slug) {
      const {slug, _slug} = this.project;
      this.project._slug = slug;
      this.project.slug = _slug;
    }

    const req = this.projectsService.save(this.project).toPromise().then((a: Project) => {
      if (this.project.slug != this.project._slug) {
        this.router.navigate(['/projects', a.slug, 'edit']);
      } else {
        this.project = this._normalize(a);
        this.changeDetectorRef.detectChanges();
      }
    });

    this.toasterService.wrapPromise(req, 'Сохранено', 'Не удалось сохранить');
  }

  private _normalize(project: Project) {
    const normalize = (key: string) => {
      if (project[key]) {
        project[key] = project[key].id;
      }
      return normalize;
    };
    normalize('activity_scope');

    if (project.tags) {
      project.tags = project.tags.map((tag: ServiceTag) => tag.id);
    }

    if (project.slug) {
      project._slug = project.slug;
    }

    return project;
  }

  private _init() {
    const snapshot = this.activatedRoute.snapshot;
    this.project = this._normalize(snapshot.data.project || { _new: true });

    if (!this.project.content_blocks?.length) {
      this.project.content_blocks = [
        {
          block_type: 'project-root',
          props: {},
          content_elements: [
            {
              element_type: 'project-image',
              props: {},
            },
            {
              element_type: 'project-image',
              props: {},
            },
          ],
        },
        {
          block_type: 'project-feedback',
          props: {},
          content_elements: [],
        },
        {
          block_type: 'project-roles',
          props: {},
          content_elements: [],
        },
        {
          block_type: 'project-articles',
          props: {},
          content_elements: [],
        },
      ];
    } else {
      const root = this.project.content_blocks[0];
      if (root.content_elements?.length == 1) {
        this.project.content_blocks[0].content_elements.push({
          element_type: 'project-image',
          props: {},
        });
      }
    }

    this.changeDetectorRef.detectChanges();
  }

}
