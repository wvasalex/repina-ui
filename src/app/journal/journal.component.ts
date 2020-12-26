import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ContentBlock, StrMap } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';
import { MatDialog } from '@angular/material/dialog';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { ToasterService } from '@shared/toaster/toaster.service';
import { PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { JournalPageService } from './journal-page.service';
import { JournalService } from './journal.service';
import { Article, BlogTag } from './journal.model';
import { JournalTagsService } from './journal-tags.service';
import { PaginatorService } from '@shared/paginator/paginator.service';
import { FooterService } from '@shared/footer/footer.service';
import { ActivatedRoute } from '@angular/router';

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
      /*if (articles.length >= 6) {
        articles.splice(6, 0, {
          type: 'subscribe',
        });
      }*/

      return this.journalService.groupArticles(
        articles,
        this.data$.value.page === 1,
      );
    }));

  private _keys$: Observable<string[]> = this.activatedRoute.queryParams
    .pipe(map((params) => {
      return (params.blog_tag__key__in || '').split(',');
    }));

  public selectedTags$: Observable<SelectOption[]> = combineLatest([this.tags$, this._keys$])
    .pipe(
      map(([tags, keys]) => {
        if (keys.length === 1 && keys[0] === '') {
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
    this.paginatorService.changes.subscribe((req) => {
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
    this.paginatorService.destroy();
    this.footerService.setBreadcrumbs([]);
  }

  public $applyTags(tags: SelectOption[], allTags: SelectOption[]) {
    let keys = tags.map((option: SelectOption) => {
      return option.value;
    });

    if (tags.length > 1) {
      const all = tags.findIndex((item) => item.value === null);
      if (all != -1) {
        tags.splice(all, 1);
      }
    } else {
      if (keys.indexOf(null) !== -1) {
        keys = [];
      }
    }

    this.paginatorService.setFilters({
      page: '1',
      blog_tag__key__in: keys.join(','),
    });
  }

  public $tagChanged(tagChange) {
    if (tagChange.item.value === null && tagChange.checked) {
      this.paginatorService.setFilters({
        page: '1',
      });
    }
  }

  public $reorder() {
    this.dialog.open(ListReorderComponent, {
      data: {
        items: this.articles$.value.map((article: Article) => {
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
    req.per_page = req.page == 1 ? 11 : 12;
    this.journalService.getPage<Article>(req).subscribe((page: PagedResponse<Article>) => {
      this.data$.next(page);
      this.articles$.next(page.results);
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
