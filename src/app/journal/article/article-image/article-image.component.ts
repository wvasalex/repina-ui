import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleImageComponent extends BaseBlock {

  @Input() itemprop: string;

}
