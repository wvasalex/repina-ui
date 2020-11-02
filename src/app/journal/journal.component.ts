import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { Article, BlogTag } from './journal.model';
import { JournalTagsService } from './journal-tags.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentBlock, StrMap } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';
import { MatDialog } from '@angular/material/dialog';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { Project } from '@shared/projects/projects.model';
import { JournalPageService } from './journal-page.service';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalComponent implements OnInit {

  public header: ContentBlock;

  public header$: Observable<ContentBlock> = this.journalPageService.get({ per_page: 200 })
    .pipe(
      map((blocks: ContentBlock[]) => {
        return this.header = blocks.find((block) => {
          return block.block_type === 'journal-header';
        });
      }),
    );

  public articles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public tags$: Observable<SelectOption[]> = this.journalTagsService.get()
    .pipe(map((tags: BlogTag[]) => {
      return tags.map((tag: BlogTag) => {
        return {
          value: tag.key,
          label: tag.title,
        };
      });
    }));

  public groups$: Observable<any> = this.articles$
    .pipe(map((articles) => {
      if (articles.length >= 6) {
        articles.splice(6, 0, {
          type: 'subscribe',
        });
      }

      return this.journalService.groupArticles(articles);
    }));

  public editor: boolean = false;

  constructor(
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private journalPageService: JournalPageService,
    private journalService: JournalService,
    private journalTagsService: JournalTagsService,
  ) {
  }

  ngOnInit(): void {
    this._load();
  }

  public $applyTags(tags: SelectOption[]) {
    const keys = tags.map((option: SelectOption) => {
      return option.value;
    });

    this._load({
      blog_tag__key__in: keys.join(','),
    });
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

  private _load(filters: StrMap<string> = {}) {
    this.journalService.get<Article>(filters).subscribe((articles: Article[]) => {
      this.articles$.next(articles);
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
