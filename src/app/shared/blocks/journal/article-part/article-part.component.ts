import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.class';

@Component({
  selector: 'r-article-part',
  templateUrl: './article-part.component.html',
  styleUrls: ['./article-part.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePartComponent extends BaseBlock {
}
