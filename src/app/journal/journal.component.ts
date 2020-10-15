import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { Article, BlogTag } from './journal.model';
import { JournalTagsService } from './journal-tags.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrMap } from '@shared/types';
import { SelectOption } from '@shared/components/select/select.model';
import { MatDialog } from '@angular/material/dialog';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { Project } from '@shared/projects/projects.model';

@Component({
  selector: 'r-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalComponent implements OnInit {

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

  constructor(
    private dialog: MatDialog,
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

}
