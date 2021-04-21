import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContentBlock } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { ToasterService } from '@shared/toaster/toaster.service';
import { PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { FooterService } from '@shared/footer/footer.service';
import { SeoService } from '@shared/seo/seo.service';
import { JournalPageService } from './journal-page.service';
import { JournalService } from './journal.service';
import { Article } from './journal.model';
import { JournalTagsService } from './journal-tags.service';

@Component({
  selector: 'r-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalComponent implements OnInit, OnDestroy {

  public header: ContentBlock;
  public header$: Observable<ContentBlock> = this.journalPageService.getHeader()
    .pipe(
      tap((block: ContentBlock) => {
        return this.header = block;
      }),
    );
  public data$: BehaviorSubject<PagedResponse<Article>> = new BehaviorSubject<PagedResponse<Article>>({
    page: 1,
    per_page: 10,
    results: [],
    total_count: 10,
  });
  public articles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public tags$: Observable<SelectOption[]> = this.journalTagsService.getPublic();
  public groups$: Observable<any> = this.articles$
    .pipe(map((articles) => {
        return this.journalService.groupArticles(
          articles,
          this.data$.value.page === 1,
        );
      }),
    );
  public editor: boolean = false;

  private _sub: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private toasterService: ToasterService,
    private journalPageService: JournalPageService,
    private journalService: JournalService,
    private journalTagsService: JournalTagsService,
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
        req.blog_tag__key__in = params.url;
      }

      this._load(req);
    });

    this.footerService.setBreadcrumbs([
      {
        href: '/blog',
        text: 'Журнал',
      },
    ]);
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
    this.paginatorService.destroy();
    this.footerService.setBreadcrumbs([]);
  }

  public $reorder() {
    this.journalService.get({per_page: 999}).subscribe((articles: Article[]) => {
      this.dialog.open(ListReorderComponent, {
        data: {
          items: articles.map((article: Article) => {
            return {
              image: article.preview_file,
              ...article,
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
    const req = this.journalPageService.save(this.header).toPromise();
    this.toasterService.wrapPromise(req, 'Сохранено!', 'Не удалось сохранить!');
  }

  private _save(items: Article[]) {
    items.forEach((item: Article) => {
      this.journalService.patch({
        slug: item.slug,
        position: item.position,
      }).subscribe();
    });

    this.articles$.next(items);
  }

  private _load(req: PagedRequest) {
    this.journalService.getPage<Article>(req)
      .subscribe((page: PagedResponse<Article>) => {
      this.data$.next(page);
      this.articles$.next(page.results);
    }, (error) => {
      if (error?.status === 400) {
        this.router.navigate(['/404']);
      }
    });
  }

  /*@HostListener('dblclick') _init() {
    this.journalPageService.post({
      block_type: 'journal-header',
      props: {
        title: 'Создаем яркие самобытные решения',
        subtitle: 'бложик',
      },
      is_enabled: true,
      position: 0,
      content_elements: [],
    }).subscribe();
  }*/

}
