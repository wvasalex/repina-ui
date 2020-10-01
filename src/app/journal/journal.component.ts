import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { Article, BlogTag } from './journal.model';
import { JournalTagsService } from './journal-tags.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalComponent implements OnInit {

  public articles$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public tags$: Observable<string[]> = this.journalTagsService.get()
    .pipe(map((tags: BlogTag[]) => {
      return tags.map((tag: BlogTag) => {
        return tag.title;
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

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private journalService: JournalService,
              private journalTagsService: JournalTagsService) {
  }

  ngOnInit(): void {
    this._load();
  }

  public $applyTags(tags: string[]) {
    this._load({
      blog_tag__title: tags.join(','),
    });
  }

  private _load(filters: StrMap<string> = {}) {
    this.journalService.get<Article>(filters).subscribe((articles: Article[]) => {
      this.articles$.next(articles);
    });
  }

}
