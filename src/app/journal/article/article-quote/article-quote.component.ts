import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-article-quote',
  templateUrl: './article-quote.component.html',
  styleUrls: ['./article-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleQuoteComponent extends BaseBlock {
}
