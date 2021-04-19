import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointService } from '@shared/breakpoint.service';
import { ProjectsService } from '@shared/projects/projects.service';
import { Project } from '@shared/projects/projects.model';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { SelectOption } from '@shared/components/select/select.model';
import { ContentBlock } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { FooterService } from '@shared/footer/footer.service';
import { ServicesTagsService } from '../services/services-tags.service';
import { ProjectsPageService } from './projects-page.service';

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
  public editor: boolean = false;

  private _sub: Subscription;

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

    this._sub = combineLatest([
      this.paginatorService.changes,
      this.activatedRoute.params,
    ]).subscribe(([req, params]) => {
      if (params?.url) {
        req.tags__id__in = this.servicesTagsService.getTagByUrl(params.url) as any;
      }

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
    this._sub.unsubscribe();
    this.paginatorService.destroy();
    this.footerService.setBreadcrumbs([]);
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
