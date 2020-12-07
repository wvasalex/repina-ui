import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { SelectOption } from '@shared/components/select/select.model';
import { ContentBlock, StrMap } from '@shared/types';
import { ServicesTagsService } from '../services/services-tags.service';
import { ServiceTag } from '../services/services.model';
import { ProjectsPageService } from './projects-page.service';
import { ToasterService } from '@shared/toaster/toaster.service';
import { PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { Article } from '../journal/journal.model';

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

  private projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  public tags$: Observable<SelectOption[]> = this.servicesTagsService.get()
    .pipe(map((tags: ServiceTag[]) => {
      return tags
        .filter((tag: ServiceTag) => {
          return tag.show_in_projects;
        })
        .map((tag: ServiceTag) => {
          return {
            value: tag.id,
            label: tag.title,
          };
        });
    }));

  private rows$: Observable<number> = this.breakpointService.change$
    .pipe(map((result: BreakpointState) => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const breakpoints = [1920, 1366, 1024, 768, 320];
      let cn = breakpoints.find((breakpoint) => w > breakpoint) || 320;

      if (cn >= 1024) {
        return 3;
      }
      if (cn == 320) {
        return 1;
      }
      return 2;
    }));

  public groups$: Observable<Project[][]> = combineLatest([this.projects$, this.rows$])
    .pipe(map(([projects, rows]) => {
      return this.projectsService.groupProjectss(projects, rows);
    }));

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
  ) {
  }

  public ngOnInit(): void {
    /*this.projectsService.get<Project>()
      .subscribe((projects: Project[]) => {
        this.projects$.next(projects);
      });*/

    this.paginatorService.init();

    this.paginatorService.changes.subscribe((req) => {
      this._load(req);
    });
  }

  public ngOnDestroy(): void {
    this.paginatorService.destroy();
  }

  public $applyTags(tags: SelectOption[]) {
    const keys = tags.map((option: SelectOption) => {
      return option.value;
    });

    let filters = {};
    if (tags.length) {
      filters = {
        page: 1,
        tags__id__in: keys.join(','),
      };
    }
    this._load(filters);
  }

  public $reorder() {
    this.dialog.open(ListReorderComponent, {
      data: {
        items: this.projects$.value.map((project: Project) => {
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
