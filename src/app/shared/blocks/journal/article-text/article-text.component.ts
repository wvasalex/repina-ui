import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-article-text',
  templateUrl: './article-text.component.html',
  styleUrls: ['./article-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleTextComponent extends BaseBlock {

}
