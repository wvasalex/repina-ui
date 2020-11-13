import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { Article } from '../../journal.model';

@Component({
  selector: 'r-article-next',
  templateUrl: './article-next.component.html',
  styleUrls: ['./article-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleNextComponent extends BaseBlock {

  @Input() article: Article;

}
