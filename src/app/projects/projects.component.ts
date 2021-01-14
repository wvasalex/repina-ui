import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, pluck, startWith, tap } from 'rxjs/operators';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { SelectOption } from '@shared/components/select/select.model';
import { ContentBlock, StrMap } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { ServicesTagsService } from '../services/services-tags.service';
import { ProjectsPageService } from './projects-page.service';
import { FooterService } from '@shared/footer/footer.service';
import { ActivatedRoute } from '@angular/router';

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

  public tags$: Observable<SelectOption[]> = this.servicesTagsService.getPublic();

  private _keys$: Observable<string[]> = this.activatedRoute.queryParams
    .pipe(pluck('tags__id'));

  public selectedTags$: Observable<SelectOption[]> = combineLatest([this.tags$, this._keys$])
    .pipe(
      map(([tags, keys]) => {
        if (!keys) {
          return [tags[0]];
        }

        return tags.filter((tag: SelectOption) => {
          return keys.indexOf('' + tag.value) !== -1;
        });
      }),
      startWith([]),
    );

  public editor: boolean = false;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
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

  public $tagChanged(tagChange, allTags: SelectOption[]) {
    const filters: StrMap<string> = {page: '1'};

    if (tagChange.checked) {
      if (tagChange.item.value) {
        filters.tags__id = '' + tagChange.item.value;
      }
    }

    this.paginatorService.setFilters(filters);
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
    req.per_page = 3;
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
