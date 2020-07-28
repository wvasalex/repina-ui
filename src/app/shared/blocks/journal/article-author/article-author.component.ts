import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.class';

@Component({
  selector: 'r-article-author',
  templateUrl: './article-author.component.html',
  styleUrls: ['./article-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleAuthorComponent extends BaseBlock {
}


