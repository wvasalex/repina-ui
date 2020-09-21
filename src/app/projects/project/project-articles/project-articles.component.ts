import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContentListItem } from '../../../lists/lists.model';
import { ListsService } from '../../../lists/lists.service';
import { SelectOption } from '@shared/components/select/select.model';
import { BaseBlock } from '@shared/blocks/block.component';
import { JournalService } from '../../../journal/journal.service';
import { Article } from '../../../journal/journal.model';

@Component({
  selector: 'r-project-articles',
  templateUrl: './project-articles.component.html',
  styleUrls: ['./project-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectArticlesComponent extends BaseBlock {

  @HostBinding('class.p-l') @HostBinding('class.p-r') _padding = true;

  public articles$ = this.listsService.resolve('awards')
    .pipe(map((articles: ContentListItem[]) => {
      return articles.map((article: ContentListItem) => {
        return {
          value: article.props.title,
          label: article.props.title + ';' + article.props.type,
        };
      });
    }));

  constructor(private listsService: ListsService) {
    super();
  }

  public $href(href: string): string {
    return href;
  }

  public $title(title: string): string {
    return title.split(';')[0];
  }

  public $description(title: string): string {
    return title.split(';')[1];
  }

  public $valueChanged(articles: SelectOption[]) {
    this.props.articles = JSON.stringify(articles);
  }

  public $parseValue(json: string): SelectOption[] {
    return json ?
      JSON.parse(json) :
      [];
  }

}
