import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { SelectOption } from '@shared/components/select/select.model';
import { ContentBlock } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { ServicesTagsService } from '../services/services-tags.service';
import { ProjectsPageService } from './projects-page.service';
import { FooterService } from '@shared/footer/footer.service';

@Component({
  selector: 'r-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {

  public header: ContentBlock;

  public header$: Observable<ContentBlock> = this.projectsPageService.getHeader()
    .pipe(
      tap((block: ContentBlock) => {
        return this.header = block;
      }),
    );

  public data$: Subject<PagedResponse<Project>> = new Subject<PagedResponse<Project>>();

  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  public tags$: Observable<SelectOption[]> = this.servicesTagsService.getPublic()
    .pipe(tap((tags: SelectOption[]) => {
      this.selectedTags = [tags[0]];
    }));

  public selectedTags: SelectOption[] = [];

  public editor: boolean = false;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointService: BreakpointService,
    private toasterService: ToasterService,
    private projectsPageService: ProjectsPageService,
    private servicesTagsService: ServicesTagsService,
    private projectsService: ProjectsService,
    private paginatorService: PaginatorService,
    private footerService: FooterService,
  ) {
  }

  public ngOnInit(): void {
    this.paginatorService.init();

    this.paginatorService.changes.subscribe((req) => {
      this._load(req);
    });

    this.footerService.setBreadcrumbs([
      {
        href: '/projects',
        text: 'Проекты',
      },
    ]);
  }

  public ngOnDestroy(): void {
    this.paginatorService.destroy();
    this.footerService.setBreadcrumbs([]);
  }

  public $applyTags(tags: SelectOption[], allTags: SelectOption[]) {
    const keys = tags.map((option: SelectOption) => {
      return option.value;
    });

    let filters = {};

    if (tags.length > 1) {
      const all = tags.findIndex((item) => item.value === null);
      if (all != -1) {
        tags.splice(all, 1);
      }
    } else {
      if (keys.indexOf(null) !== -1) {
        tags = [];
      }
    }

    if (tags.length) {
      filters = {
        page: 1,
        tags__id__in: keys.join(','),
      };
    } else {
      tags = [allTags[0]];
    }

    this.selectedTags = tags;
    this._load(filters);
  }

  public $tagChanged(tagChange, allTags: SelectOption[]) {
    if (tagChange.item.value === null && tagChange.checked) {
      this.selectedTags = [allTags[0]];
      this._load({page: 1});
      this.changeDetectorRef.detectChanges();
    }
  }

  public $reorder() {
    this.projectsService.get({per_page: 999}).subscribe((projects: Project[]) => {
      this.dialog.open(ListReorderComponent, {
        data: {
          items: projects.map((project: Project) => {
            return {
              image: project.preview_file,
              ...project,
            };
          }),
          onChange: (items) => {
            this._save(items);
          },
        },
      });
    });
  }

  public $save() {
    this.editor = false;
    const req = this.projectsPageService.save(this.header).toPromise();
    this.toasterService.wrapPromise(req, 'Сохранено!', 'Не удалось сохранить!');
  }

  private _save(items: Project[]) {
    items.forEach((item: Project) => {
      this.projectsService.patch({
        id: item.slug,
        position: item.position,
      }).subscribe();
    });

    this.projects$.next(items);
  }

  private _load(req: PagedRequest) {
    req.per_page = 15;
    this.projectsService.getPage<Project>(req).subscribe((page: PagedResponse<Project>) => {
      this.data$.next(page);
      this.projects$.next(page.results);
    });
  }

  /*private _load(filters: StrMap<string> = {}) {
    this.projectsService.get<Project>(filters).subscribe((projects: Project[]) => {
      this.projects$.next(projects);
    });
  }*/

  /*@HostListener('dblclick') _init() {
    this.projectsPageService.post({
      block_type: 'projects-header',
      props: {
        title: 'Создаем яркие самобытные решения',
        subtitle: 'Проекты',
      },
      is_enabled: true,
      position: 0,
      content_elements: [],
    }).subscribe();
  }*/

}
