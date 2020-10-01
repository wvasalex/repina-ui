import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-article-subscribe',
  templateUrl: './article-subscribe.component.html',
  styleUrls: ['./article-subscribe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSubscribeComponent extends BaseBlock {

}
