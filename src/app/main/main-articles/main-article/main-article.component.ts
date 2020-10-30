import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';
import { JournalService } from '../../../journal/journal.service';
import { Article } from '../../../journal/journal.model';

@Component({
  selector: 'r-main-article',
  templateUrl: './main-article.component.html',
  styleUrls: ['./main-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainArticleComponent extends BaseBlock {

  public published$: Subject<Article[]> = this.journalService.published$;

  public article$: Observable<Article>;

  constructor(private journalService: JournalService) {
    super();
  }

  public ngOnInit(): void {
    this._resolve();
  }

  public $articleChanged() {
    this._resolve();
  }

  public $toOption(article: Article): SelectOption {
    return {
      value: article.slug,
      label: article.title,
    };
  }

  private _resolve() {
    this.article$ = this.journalService.get({
      slug: this.props.article,
    }).pipe(map((articles: Article[]) => {
      return articles[0];
    }));
  }

}
