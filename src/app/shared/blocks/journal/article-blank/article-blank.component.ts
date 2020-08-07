import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-article-blank',
  templateUrl: './article-blank.component.html',
  styleUrls: ['./article-blank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBlankComponent extends BaseBlock{

}
